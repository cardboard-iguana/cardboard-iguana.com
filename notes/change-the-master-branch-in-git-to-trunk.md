# Change the "master" Branch in Git to "trunk"

* **author**:: Nathan Acks

```bash
git checkout -b trunk master # Create and switch to the
                             # trunk branch
git push -u origin trunk     # Push the trunk branch to
                             # the remote and track it
git branch -d master         # Delete local master
#
# Log into Bitbucket, go to the "Repository settings",
# and change the "Main branch" from "master" to "trunk".
#
git push --delete origin master # Delete remote master
git remote prune origin         # Delete the remote
                                # tracking branch
```

PERSONAL OPINION: GitHub deciding to switch "master" to "main" makes no sense to me. We talk about git "branches" and working "trees". Shouldn't the central branch in a git tree be the "trunk"?
