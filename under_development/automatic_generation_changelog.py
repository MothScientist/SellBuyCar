from github import Github

# Use a token for authentication or leave the field blank to access only public repositories
TOKEN = ""
OWNER = ""
REPOSITORY = ""

g = Github(TOKEN)

repo = g.get_repo(f"{OWNER}/{REPOSITORY}")  # Specify the name of the owner and repository
commits = repo.get_commits()

with open('CHANGELOG.md', 'w') as f:
    f.write('# Change Log\n')
    f.write('All notable changes to this project will be documented in this file.\n\n')

    for commit in commits:
        f.write(f'## [{commit.sha[:7]}] - {commit.commit.author.date}\n')  # Commit hash output and date
        f.write(f'{commit.commit.message}\n\n')  # Commit message output
