const Octokit = require('@octokit/rest')

export const github = () => {
  const usernameKey = 'testless.username'
  const passwordKey = 'testless.password'
  const octokit = new Octokit()

  const username = localStorage.getItem(usernameKey)
  const password = localStorage.getItem(passwordKey)

  if (username) {
    octokit.authenticate({
      type: 'basic',
      username,
      password
    })
  }

  return {
    auth: async (username, password) => {
      octokit.authenticate({
        type: 'basic',
        username,
        password
      })

      localStorage.setItem(usernameKey, username)
      localStorage.setItem(passwordKey, password)
    },
    getOrgs: async (username, per_page, page) =>  {
      const orgs = await octokit.users.getOrgs({per_page, page})

      console.log(orgs)

      return [ localStorage.getItem(usernameKey), orgs.data.map(_ => _.login)]
    },
    getRepos: async (org, type, per_page, page) => {
      const userrepos = await octokit.repos.getForUser({username: org, type, sort: 'updated', per_page, page})

      const repos = userrepos.data.map(_ => _.name)

      if (repos.length === 0) {
        return Promise.reject(`No repos available. Please login https://github.com/${org}?tab=repositories.`)
      }

      return repos
    },
    getBranches: async (owner, repo, protectedField, per_page, page) => {
      const repobranches = await octokit.repos.getBranches({owner, repo, protected: false, per_page, page})

      console.log(`getBranches`, repobranches)

      const branches = repobranches.data.map(_ => _.name)

      if (branches.length === 0) {
        return Promise.reject(`Repository not setup yet. Please follow https://github.com/${owner}/${repo}.`)
      }

      return branches
    },
    getContent: async (owner, repo, branch, path) => {
      const contents = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref: branch
      })

      console.log(contents)

      const data = contents.data

      return Array.isArray(data) ? data.map(_ => _.name) : Buffer.from(data.content, 'base64')
    }
  }
}
