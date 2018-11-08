const Octokit = require('@octokit/rest')

export const github = () => {
  const usernameKey = 'testless.username'
  const passwordKey = 'testless.password'
  let octokit = new Octokit()

  const username = localStorage.getItem(usernameKey)
  const password = localStorage.getItem(passwordKey)

  let loggedIn = false

  if (username && password) {
    octokit.authenticate({
      type: 'basic',
      username,
      password
    })

    loggedIn = true
  }

  const getCurrentSha = ({
    owner,
    repo,
    path,
    branch
  }) => octokit.repos.getContent({
    owner,
    repo,
    path,
    ref: branch
  }).then(response => response.data.sha)

  return {
    isLoggedIn: async () => loggedIn,
    auth: async ({
      username,
      password,
      type = 'basic'
    }) => {
      octokit.authenticate({
        type,
        username,
        password
      })

      localStorage.setItem(usernameKey, username)
      localStorage.setItem(passwordKey, password)

      loggedIn = true
    },
    logout: async () => {
      loggedIn = false
      octokit = new Octokit()

      localStorage.removeItem(usernameKey)
      localStorage.removeItem(passwordKey)
    },
    getOrgs: async ({ username, per_page, page }) =>  {
      const orgs = await octokit.users.getOrgs({per_page, page})

      console.log(orgs)

      return [ localStorage.getItem(usernameKey), orgs.data.map(_ => _.login)]
    },
    getRepos: async ({owner, type, per_page, page }) => {
      const userrepos = await octokit.repos.getForUser({username: owner, type, sort: 'updated', per_page, page})

      const repos = userrepos.data.map(_ => _.name)

      if (repos.length === 0) {
        return Promise.reject(`No repos available. Please login https://github.com/${owner}?tab=repositories.`)
      }

      return repos
    },
    getBranches: async ({ owner, repo, per_page, page }) => {
      const repobranches = await octokit.repos.getBranches({owner, repo, protected: false, per_page, page})

      console.log(`getBranches`, repobranches)

      const branches = repobranches.data.map(_ => _.name)

      if (branches.length === 0) {
        return Promise.reject(`Repository not setup yet. Please follow https://github.com/${owner}/${repo}.`)
      }

      return branches
    },
    readFileOrDir: async ({ owner, repo, branch, path }) => {
      const contents = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref: branch
      })

      console.log(contents)

      const data = contents.data

      return Array.isArray(data) ? data.map(_ => _.name) : Buffer.from(data.content, 'base64')
    },
    updateFile: async ({
      owner,
      repo,
      path,
      branch,
      content
    }) => {
      const sha = await getCurrentSha({
        owner,
        repo,
        path,
        branch,
        content
      })

      return octokit.repos.updateFile({
        owner,
        repo,
        path: path.startsWith('/') ? path.substring(1) : path,
        message: 'Update via app',
        branch,
        sha,
        content: Buffer.from(content).toString('base64') // base64-encoded "bleep bloop"
      })
    },
    createFile: async ({
      owner,
      repo,
      path,
      branch,
      content
    }) => {
      octokit.repos.createFile({
        owner,
        repo,
        path,
        message: 'Create via app',
        branch,
        content: Buffer.from(content).toString('base64') // base64-encoded "bleep bloop"
      })
    },
    deleteFile: async ({
      owner,
      repo,
      path,
      branch
    }) => {
      const sha = await getCurrentSha({
        owner,
        repo,
        path,
        branch
      })

      return octokit.repos.deleteFile({
        owner,
        repo,
        path: path.startsWith('/') ? path.substring(1) : path,
        message: 'Delete via app',
        branch,
        sha,
      })
    }
  }
}
