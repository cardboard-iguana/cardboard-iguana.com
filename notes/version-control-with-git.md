# Version Control with Git

**author**:: Nathan Acks  
**date**:: 2018-08-01

* [Coursera: Version Control with Git](https://www.coursera.org/learn/version-control-with-git/)
* [git: Reference](https://git-scm.com/docs/)

## DevOps and Git in a Nutshell

DevOps is considered to be an implementation of the continuous development philosophy, as opposed to waterfall development. Lots of little version, each with only a few features or bug fixes.

A "branch" is a single line of development; there's always a `MASTER` branch. Branches are good for developing new features; in general, development should occur on branches and then be merged back into `MASTER` when complete.

A "pull request" is a request to merge one branch into another (for example, a feature branch into `MASTER`). Pull requests can have required code reviews or tests attached to them (they're not automatic, and in fact not a native feature of Git... GitHub, Bitbucket, and Gitlab all implement this as an additional layer).

## Git Overview

Git is best for managing plain text files, which can include source code, automated tests, server configuration, documentation, books, and websites.

Every user has a complete copy of the project history (at least up until their last pull from the remote).

If you can do it at the command line, you can automate it. DevOps is built on the principle of "automate all the things!"

Of course, GUIs are better at visual tasks (such as comparisons) and merges.

### Installation and Getting Started

It's best to keep all of your repos in a single folder (glad I already do this!).

As I'm running a Chromebook (with Linux apps), Sourcetree isn't available. However, I've re-upped my subscription to GitKraken (and have installed it), as the application seems pretty similar.

Git's online help can also be accessed via git help $COMMAND. Use the -h flag for a concise version of the help file (generally a single line).

### Git Locations

The "working tree" is the directory/file structure of a single commit (and any uncommitted changes you've made).

The "staging area" is the list of files to be included in the next `commit (git add $FILES`).

The "local repository" is the "database" of all commits that have been made to the project (modulo the most recent `git pull`).

Commonly, the "project directory" is a single directory that contains the working tree, staging area, and local repository. The staging area and local repository live in `.git`. If you delete `.git`, then you'll just have a normal directory corresponding to the commit of the current working tree.

The "remote repository" contains all of the commits for the project, and is generally your "source of truth".

### Create a Local Repository

A.K.A. `mkdir $REPO && cd $REPO && git init`.

### Commit to a Local Repository

These notes are all for the command line client, as the Sourcetree track was pretty straight-forward.

* View file status: `git status`
* Stage content: `git add $FILE_OR_DIRECTORY` or `git add -A -v` or `git add .`

(Note that the staging area is not a literal place on disk, but rather a temporary entry in Git's database.)

Note that it's best practice to add things per-file or per-directory, rather than updating everything at once (like I tend to do). If you modify a file after adding, you'll need to add it again.

* Commit content: `git commit -m "$COMMIT_MESSSAGE"`

Leave off the `-m` flag if you need to create a long, detailed message, or if you need to use multiple lines.

* View the commit history: `git log`

Use `git log --oneline` to get a compact, line-by-line view. Add `-#` (where `#` is a number) to see only the most recent `#` commits.

### Create a Remote Repository

Generally a remote repository is just a "bare" repo, which is just the contents of the `.git` directory. By convention, the names of bare repos end in `.git` (`foo.git`, etc.), though this isn't actually necessary.

### Push to a Remote Repository

A "clone" is a local copy of a remote repository. This is created using the "clone" command. The remote repository of a clone is referred to as the "origin" by default.

If the remote is new, then you probably want to *track* it so that you will be notified when the local and remote become out-of-sync.

* Clone a remote repository: `git clone $REMOTE_REPO_URL`

You can also use `git clone $REMOTE_URL $LOCAL_REPO` to create a local repository with a different name than the remote repository (less the common `.git` "extension").

You can get remote information using `git remote --verbose`. Note that fetches *and* pushes can go to different remotes, though this is uncommon.

* Add a remote repository to a local repository: `git remote add $REMOTE_NAME $REMOTE_URL`

The `$REMOTE_NAME` is the alias we use to refer to the remote. Typically this is just origin.

* Push commits to a remote repository: `git push`

Push synchronizes the *remote* with the *local* repository. The first time you push, use the `--set-upstream` (`-u`) to track the remote (Git will then tell you if you're out-of-sync when you run `git status`). So, `git push -u $REMOTE_NAME $BRANCH_TO_PUSH`; by default `$BRANCH_TO_PUSH` is whatever branch you're currently on, so generally this doesn't need to be specified.

## Git's Graph Model

Graph theory! Nodes! Edges! Direction!

Git models the commit history of a project with a directed acyclic graphs (DAG), which is just what it sounds like.

One thing that might seem a little weird in Git is that each node (commit) points to its *parents*, not its children. Which makes perfect sense when written, but looks weird when drawn out.

A *branch* occurs when a commit has more than one *child*. A *merge* occurs when a commit has more than one *parent*.

Using `git log --oneline --graph` will display the repository's commit tree at the command line (graphical clients are definitely prettier though).

### Git IDs

Git objects are *commits* (a text file describing the commit), *annotated tags* (references to specific commits), *trees* (the actual file system structure of the project at a point in time), and *blobs* (file contents). Typically you only interact with *commits* and *tags*, but all of these live in the *object store*.

A Git ID is a SHA-1 hash that "names" a Git object. It is statistically *very* unlikely that two different pieces of content will have the same SHA-1 hash. Small changes lead to *big* SHA-1 changes.

Git uses `git hash-object $FILE` to generate a SHA-1 hash of a file. This is a low-level "plumbing command" that is generally *not* used directly.

Most Git clients only shows only the first 4 - 10 characters of the SHA-1 hash, as 40 character pseudo-random strings are a bit rough on the human brain.

Full Git IDs are displayed by `git log`, but `git log --oneline` only shows the first 7 characters of the hash.

Git IDs can be referenced by any of the first 4 or more ID characters; in the event that there is a collision, Git will abort and warn you.

You can use `git show $OBJECT_ID` to show information about any object Git is currently tracking.

### Git References

"References" can be used wherever we might use SHA-1 hashes, or part of a SHA-1 hash.

Commits can be associated with reference, which point either to a SHA-1 hash or another reference (in which case it's called a "symbolic" reference). "Branch labels" are just references that "name" a given branch; they always point to the most recent commit on that branch (the "tip").

`HEAD` is a symbolic reference that points to the current commit of the current branch. There is only one head per repo, but it may be different in different clones, depending on when the last time was that everything got synced.

By default, the main (default) branch in a repo is called "master". Git stores references in `.git/refs`; `.git/refs/heads` lists all branches, with each file containing a single line which is the SHA-1 hash indicating the tip of that branch.

Basically, you can think of `HEAD` as pointing to the branch label of the current branch. You can see the full symbolic reference in `.git/HEAD`.

You can reference prior commits using `~` and `^`.

Appending a `~` to a commit (ID, label, or tag) will reference the parent of the current commit. You can back up multiple commits by also appending a number, such that `HEAD~3` is `HEAD`'s parent's parent's parent. You can also just append multiple `~`; `HEAD~` is the same as `HEAD~1`, and `HEAD~3` is the same as `HEAD~~~`.

Appending `^` refers to a *specific* parent in a merge operation (with `^` once again being equivalent to `^1`). Commits with single parents thus only have `^1`, and if you want to back up multiple parents you'll need to use `^^`, etc. `~` and `^` can be combined in any order to reference any commit within a repository *relative* to another reference.

A "tag" is just a reference attached to a specific commit. They're often (though not always) used for specifying versions. (It's also possible to move tags to different commits; every tag must have a unique name.)

Tags can be *lightweight*, which only reference a single commit, or *annotated*, which can include metadata. In general, you should use annotated tags.

Use `git tag` to view all tags in a repo. Since tags are references, they can be used wherever we might normally use an ID.

To create a *lightweight tag*, use `git tag $TAG_NAME $COMMIT_ID` (`$COMMIT_ID` can be left off, in which case `HEAD` will be used).

To create an *annotated tag*, use `git tag -a $TAG_NAME $COMMIT_ID` (again, `$COMMIT_ID` is optional). Annotated tags *must* have a message associated with them, which can either be specified directly (`-m`), using the contents of a file (`-F`), or via an editor (if no additional flags are specified). In this way, annotated tags work similarly to commits.

Tags are not pushed to remotes by default (!!!), though once they are pushed they will be distributed to all synced clones.

To push tags, use `git push $REMOTE_NAME $TAG_NAME` for a single tag, or `git push $REMOTE_NAME --tags` to push all tags (which may or may not be a good idea, depending on how you use tags).

You can delete a tag using `git tag -d $TAG_NAME`. Again, note that tag deletions will *not* automatically be pushed to the origin.

## Branches

By default, commits all belong to master. All branches trace themselves back to the first commit in the repo.

Sometimes versions are branches. This is common if you need to support a given version, rather than only the latest version.

"Topic" branches are generally short-lived branches that are merged into a long-lived branch like "master" or a version branch.

* View all branches (in the current repository): `git branch`

Note that this doesn't include branches that are in origin or another remote that you haven't yet checked out. To see these, use `git branch -a`.

* View all branches "graphically": `git log --oneline --graph --all`

Normally `git log` only shows you commits *related* to the current branch.

Branches live in both local and remote repositories.

Note that merging one branch into another will not set both branch references to the same commit; rather, the merged branch reference will simply be a parent for the next commit on the branch it was merged in to.

* Create a branch: `git branch $NEW_BRANCH_NAME`

A new branch is created by simply creating a new branch label. Typically, a new branch will point to `HEAD` initially, and then diverge as commits are added.

* Checkout a branch: `git checkout $BRANCH_LABEL`

You can combine checkout and branch creation using `git checkout -b $NEW_BRANCH_NAME`. This only works for new branches.

Checkout does two things:

* It switches `HEAD` to a new branch label.
* It updates the working tree to match the current commit.

(New commits are always made to `HEAD`, so if you don't do a checkout after creating a new branch, all of your commits will be on the old branch.)

Checking out a branch without either stashing or committing your results *will* cause any uncommitted changes to be lost!

You can also checkout a specific commit (via SHA-1 or reference), but if that checkout doesn't correspond to a branch label you will wind up in a "detached `HEAD`" state. You should *only* be in a detached head to *view* a previous commit or create a new branch from an older commit. *Never work in a detached HEAD, or wackiness will ensue!*

Deleting a branch just deletes that branch's label. If commits exist in a branch, then these will commits will become "dangling commits". These generally won't be removed right away, but Git *will* periodically delete any such commits!

* Deleting a branch label: `git branch -d $BRANCH_LABEL`

Branches are typically only deleted after a "topic" branch is merged. Or not at all.

The Git command line tool will happily let you delete branches *once they've been merged*.

* To delete an unmerged branch: `git branch -D $BRANCH_LABEL`

Let's say you *accidentally* delete a branch label. Then you can use `git reflog` to find the dangling head of the just-deleted commit. Then use `git checkout -b $BRANCH_LABEL $COMMIT_ID` to re-create the branch label. (Note that when you delete a branch, the current commit ID of the branch label will also be shown. So if you *immediately* recognize your mistake, you can just use this ID rather than hunting through `git reflog`.)

This *only* works on local repos!

## Merging

"Merges" combine branches, normally a short-lived "topic" branch and a longer-lived "base" branch. After a merge, the commits on the merged branch are considered to be part of *both* the "base" *and* "topic" branches. Because merges are a common Git activity, it's quite normal for commits to be members of multiple branches.

A "fast-forward merge" just moves the branch label of the "base" branch to the end of the of the topic branch. After a fast-forward merge, the "topic" and "base" branches contain the same commits. Fast-forward merges are only possible is *no* additional commits have been added to the base branch since the creation of the topic branch.

A fast-forward merge typically deletes the topic branch label to keep things tidy. Even though the branch label is deleted, many people will still memorialize the merged topic branch in a commit message, or using a tag.

```bash
# ...If you're not already on the base branch.
#
git checkout $BASE_BRANCH_LABEL

# The actual merge; fast-forward by default.
#
git merge $TOPIC_BRANCH_LABEL

# Optional.
#
git branch -d $TOPIC_BRANCH_LABEL
```

A "merge commit" combines the topic and base branches. A merge commit thus always has multiple parents.

Merge commits happen automatically when a fast-forward is impossible. Note that in this case, Git will automatically open up your editor and prompt you for a commit message for the merge (this is because an actual commit is happening in the background).

If you want to *force* a commit merge, use `git merge --no-ff $TOPIC_BRANCH_LABEL`.

Sometimes merge conflicts result, if the same information has been changed in both branches. In this case, you will need to manually resolve this conflict.

Git automatically attempts a merge commit if the merge is not fast-forwardable.

As with fast-forward merges, the topic branch label is frequently deleted after the merge is completed.

You can *force* the creation of a merge commit as well, even in situations where a fast-forward is possible. This is sometimes desirable because it ensures that the fact that a branch occurred is preserved. Most clients have some capability for forcing merge commits instead of fast-forwards. (In this case, the merged commit will have identical files, but different history, than the tip of the just-merged topic branch.)

One typical development pattern is to create "master" and "development" branches, and then periodically merge "development" into "master" using a merge commit for releases.

## Tracking Branches

A "tracking branch" is a local branch that represents a corresponding remote branch. These branches are always named `$REMOTE_NAME/$BRANCH_NAME`. By default, cloning a remote repository will automatically create a `origin/master` (or whatever your remote is named + whatever the default remote branch is called) tracking branch, while at the same time creating a "master" local branch that corresponds to it.

Tracking branches are decoupled from both the remote and local branches, and are only updated on network operations (`clone`, `fetch`, `push`, `pull`, etc.). Basically, a tracking branch represents the state of a remote branch the last time the local repository checked in with it.

Another way of thinking about tracking branches is that they represent the "last known state" of the remote's branches.

By default, `git branch` only shows local branches; use `git branch --all` to see both local and tracking branches.

When you clone a repo, you're really checking out `origin/HEAD`.

As it turns out, `origin/HEAD` represents the *default* tracking branch of origin, which is just *initially* set to the default branch of our remote. Specifying "origin" in a Git command will always resolve to `origin/HEAD`, but *won't* always resolve to the default branch of our remote. In particular, `git remote set-head $REMOTE_NAME $BRANCH_NAME` will change the default tracking branch of the remote, and thus the context of git commands that *solely* reference the remote's name.

In Bitbucket, the default branch is called the "main" branch.

The `git status` command returns the state of both local and tracking branches. The `git log --all` similarly returns the combined log of all local and tracking branches.

## Fetch, Pull, and Push

Most Git commands only function on the local repository, but four - clone, fetch, pull, and push - interact with the remote repo.

### clone

Copies the remote repository and sets up a corresponding local repository (only used during initial setup).

### fetch

Retrieves commits from the remote repository and updates tracking branches.

* Basically: `git fetch $REPOSITORY_NAME`

You can leave off `$REPOSITORY_NAME` if you're just fetching from the default remote.

Basically, `fetch` allows you to download and view new information from the remote repository without having to deal with a merge. During this process, it will update all tracking branches.

Most Git clients will automatically fetch new data from the relevant remotes automatically.

Local branch labels are *not* updated by a `fetch`; however, the local repository will now contain all of the commits found in the remote.

### pull

Fetch + merge remote commits into the current branch to bring the corresponding tracking branch up-to-date with the local `HEAD` (obviously, this only replies to local branches that are also tracked remotely).

* Basically: `git pull $REPO_NAME $BRANCH_NAME`

If you leave `$REPO_NAME` or `$BRANCH_NAME` off, then the default remote and current local branch will be used. The `git pull` command just runs a `git fetch` followed by a `git merge FETCH_HEAD` (`FETCH_HEAD` is an internal alias that points to the tip of the tracking branch that corresponds to the current local branch); obviously, if you specify `$REPO_NAME` or `$BRANCH_NAME`, then the actual execution details will vary somewhat.

Some useful options:

* `--ff` The default, which uses a fast-forward to merge when possible.
* `--no-ff` Create a merge commit for every pull (why would you ever want to do this?).
* `--ff-only` Turns the pull into a fetch if it's not possible to fast-forward.
* `--rebase` and `--preserve-merges` Throw away your local changes.

Git will abort the merge if there are local changes that would be over-written.

We can think of the merge performed by a `pull` request as treating the current tracking branch as the topic branch. By default `pull` will fast-forward if possible (it's difficult to see why you *wouldn't* do this...).

Because a `pull` involves a merge, it's possible (if a fast forward is not possible) that the tracking branch will lag after the merge.

### push

Sends local commits to the remote (requires the local and remote repositories to already be in sync, as the remote obviously can't deal with merge conflicts).

* Basically: `git push $REPO_NAME $BRANCH_NAME`

If you use `--set-upstream`/`-u`, the push will also tie `$BRANCH_NAME` to the current local branch. Once this is done, you don't need to specify `$REPO_NAME` and `$BRANCH_NAME` anymore (this tracking is set up automatically for the default remote branch during a `clone`).

Because remotes can't resolve conflicts, you can't `push` if the remote is ahead of your local branch. It's therefore considered a best practice to do a `fetch` or a `pull` before doing a `push` (a `fetch` will be faster because there's no merge, but if changes *are* retrieved, you'll need to do a `pull` anyway).

## Merge Conflicts

Merge conflicts only occur if there are conflicting changes in the *same part* of the *same file*.

Small, frequent merges help to both avoid merge conflicts, and when such conflicts do occur they are easier to resolve in this case. Modularizing code also (obviously) helps here, since it isolates work on one module from work on other parts of the program. (The prevalence and severity of merge conflicts is a strong indication of how modular a project's code is.)

### Resolving a Merge Conflict

Basically...

* Checkout the base branch (let's say `MASTER`).
* Attempt to merge in the feature branch. Git will inform you of the conflict and write out the conflicting file(s) in a manner that makes the two competing changes clear.
* Resolve the changes.
* Stage the changes.
* Commit the merge.
* Optional: Delete the merged feature branch.

The key here is that Git will modify files that you will need to resolve manually as part of the merge.

Conflicted file(s) look like the following:

```gitmerge
Unconflicted
<<<<<< Base branch name (almost always HEAD)
Base branch changes
=======
Feature branch changes
>>>>>> Feature branch name
```

Git will also automatically create a merge conflict commit message; note that the commented ("`#`") lines describing the conflicting files will *not* be included in the final message unless you uncomment them.

* See what files are conflicted: `git status` (this should also be reported during the initial merge attempt)

Resolving a merge conflict simply involves editing the conflicted files, and then staging and committing them again as you would with any other change.

* Abort the merge: `git merge --abort`

You can abort a merge conflict by resetting to the base branch, abandoning any changes if prompted.

## Rebasing

Note that rebasing rewrites the commit history. It is generally considered *extremely* bad form to rewrite commit history that has been shared with others...

A rebase changes the parent of a commit. Because the ancestor chain is different, the rebased commits IDs change.

Basically, a rebase calculates the diffs between relevant commits, and then attempts to (re)apply them to generate equivalent commits starting from a different parent. This is basically a merge (just applied to historic commits), and thus you can run into conflicts that need to be resolved here as well.

PROS:

* You can can make sure you're your working from the most recent version of the parent branch.
* You can make your commit history cleaner/easier to follow after the eventual merge.

CONS:

* You can really screw up collaborators if you're rebasing commits that have already been shared.
* Your commit history might be cleaner, but it's no longer "historically true".

Remember, each commit includes the *entire* project (Git is just smart enough to use internal pointers, rather than literally re-including entire files).

To executing a rebase:

* Check out the feature branch, then
* Rebase on to the parent branch.

More specifically, at the command line there are two ways to do a rebase:

* Check out the branch you wish to rebase using `git checkout $BRANCH_NAME` and then rebase onto the "upstream" parent using `git rebase $UPSTREAM_NAME`.
* Use the equivalent command `git rebase $UPSTREAM_NAME $BRANCH_NAME`, which combines the above two operations.

The `rebase` command attempts to move `$BRANCH_NAME` from its current base commit (where it joins `$UPSTREAM_NAME`) to the tip of `$UPSTREAM_NAME`.

In general, it's better to use the `git checkout $BRANCH_NAME` + `git rebase $UPSTREAM_NAME` form of rebasing, as this makes it more obvious what's happening when a merge conflict occurs.

Because a rebase can affect multiple commits, the conflict process is a little different; instead of just fixing the conflict, staging the changes, and then committing, you'll need to fix, stage, and then *explicitly* continue the rebase. So this is a bit of a "rolling process".

During conflict resolution, after you `add` the fixed conflicted file(s), you will need to continue using `git rebase --continue`. When a rebase runs into a conflict, Git will flag the conflicting file(s) for you, though you can always use `git status` during the rebase process to also see where you are. Note that if there are multiple commits in the branch that you're rebasing, it's possible that you'll run into additional conflicts as the rebase continues (i.e., after running `git rebase --continue`). Again, rebasing is essentially a *rolling* process. If this all gets to be too much, you can always abort the rebase (which will revert all changes). Use `git rebase --abort` to do this.

(You can also apparently skip patches/diffs during a rebase, though it's not clear to me what this does. Perhaps it throws away the changes made in that patch?)

## Rewriting History

You can change the commit message, or even the project files, of the most recent commit. Note that doing this *will* change the commit ID.

* To update a commit message: `git commit --amend -m "$NEW_MESSAGE"`

Because this changes history, you should *not* do this if you've already shared your commits!

Changing a single file works similarly (for some reason, this seems more wild to me than changing the commit message, though I suspect that under the hood there's really no difference...).

To update a file, just stage the changes and execute `git commit --amend`; append `--no-edit` to re-use the previous commit message. (I presume that leaving off the `-m` above would interactively prompt you for a new commit message...)

Interactive rebasing allows you to modify multiple commits.

When doing an interactive rebase, you will choose a base commit on a branch, and then edit all subsequent commits. You will have the following options:

* Use the commit as-is,
* Edit the commit message,
* Edit the commit files (this requires temporarily stopping the rebase),
* Delete the commit entirely,
* Combine the commit with its parent ("squashing" the commit), or
* Move the commit to a different location in the commit sequence.

You'll need to do an interactive rebase to change a commit before the most recent one.

* Interactive rebase: `git rebase -i $COMMIT_ID`

The `$COMMIT_ID` will be the base; its children will be the commits you edit. The interactive bit is handled by opening up a text editor listing all of `$COMMIT_ID's` children, and providing instructions about how to specify the handling of each child. In addition to the options mentioned above, there's a special `fixup` operation that just runs a `squash` *without* merging the commit messages (the message for the squashed commit will be discarded) and an `exec` option that allows you to run any shell command between the adjustment of arbitrary commits. Reordering commits is accomplished by re-arranging them in the text file; removing a commit entirely is equivalent to specifying `drop`.

When editing commits, you can move on to the next commit by running `git commit --amend`. Running `git status` will show you where in the rebase operation you currently are.

(Note that commits are listed oldest-to-newest, top-to-bottom, in the editor, rather than the newest-to-oldest view typical in Git clients.)

During an interactive rebase, you'll be in a detached `HEAD` state while editing individual commits.

(It's not entirely clear to me how an interactive rebase shares enough in common with a "regular" rebase to warrant such a similar name...)

"Squashing" a commit merges not only the changes in the current commit with its parent, but also (by default) combines their commit messages (though you can touch this up later).

Note that deleting a commit entirely generally greatly increases the chance of a merge conflict further down the rebase chain.

A "squash merge" basically squashes a branch down to a single commit and then rebases that commit to the tip of the base branch. Note that a squash merge does *not* automatically commit these changes, but will add them to the staging area.

To perform a squash merge, check out the base branch and then run `git merge --squash $BRANCH_TO_MERGE`. Remember, you still need to run a `git commit` to commit these changes!

If possible, Git will fast-forward a squash merge.

Typically `$BRANCH_TO_MERGE` is deleted after a squash merge.

## Pull Requests, Forks, and Merges

"Pull requests" are a feature of Git hosting sites, not Git itself, and are used as a form of code review. Pull requests can either be within a single repo (in which case they're simply a request to merge a branch), or between repos (in which case they're a request to merge a branch from the forked repo into the upstream repo). The fork approach is generally used when the submitter doesn't have direct write access to the repo being forked.

Depending on the team workflow and Git hosting site, a pull request could be opened up at any time after (or during) the branch's creation.

At least in Bitbucket, declining a pull request is not irrevocable. Once a pull request has been merged, Bitbucket will automatically close it.

To simultaneously check out and create a branch, use `git checkout -b $BRANCH_NAME`.

When pushing to a new branch from the command line, Bitbucket will helpfully provide you with a URL that can be used to open a corresponding pull request as a server message. Bitbucket will also automatically add commits on a branch corresponding to a pull request to that request.

Forking is another Git hosting feature. Kinda like a clone, except that it's remote, and strongly linked to the upstream repo.

"Merges" can be accomplished either within the Git host's web interface, or by adding the fork as a remote and then merging from there (and pushing upstream).

## Git Workflows

A "centralized workflow" uses a single branch (generally "master"). More-or-less how I work alone.

In a "feature branch workflow", work is done on feature/topic branches which are then merged into a single main branch.

A "forking workflow" involves multiple forks of the repository, and then use pull requests to merge code back in. This is the typical workflow in open source projects.

Finally, in "gitflow" work is done on a long-running "develop" branch, with releases generally merged into "master". Short-lived feature/topic branches are used for developing individual features/modules.

When the "develop" branch is feature-complete w.r.t. a new version, it is forked into a "release" branch. Additional fixes may be added to that branch, which will then eventually be merged into "master" (if fixes are made, these should also merged back into "develop" at some point).

Hotfixes are generally branched off of "master", and then merged into both "develop" and "master". Since there's a lot of branching going on, "gitflow" workflows generally also involve deleting old branches one they're merged in.

Some common rules:

* Only use merge commits on "master".
* Commits to "master" only come from release or hotfix branches (this helps with quality control).
* If you commit to "master", also merge into "develop" (this prevents bugs from re-appearing in later releases).
