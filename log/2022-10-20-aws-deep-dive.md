# AWS Deep Dive

* **author**:: Nathan Acks  
* **date**:: 2022-10-20

## Amazon API Gateway

Continued notes about the Amazon API Gateway.

* [Amazon API Gateway: Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html)

### Working with REST APIs

* [Amazon API Gateway: Working with REST APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html)

#### Invoking a REST API in Amazon API Gateway

While testing an API from the API Gateway console actually invokes the API (as would be expected), it does *not* generate CloudWatch logs (though the API Gateway will helpfully/unhelpfully show you the logs that *would* have been sent if the request had been invoked normally).

VPC endpoints defined in API Gateway can only access *either* the applicable public *or* private APIs - it's not possible to access *both* versions of the API through the same endpoint. Despite this limitation, private APIs *can* be accessed using both public *and* private DNS names.

* [Invoking a REST API in Amazon API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-call-api.html)
