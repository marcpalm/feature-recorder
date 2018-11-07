const sleep = () => new Promise((resolve, reject) => {
  setTimeout(
    resolve, 1000
  )
})

export const mock = () => {
  let loggedIn = false

  return {
    isLoggedIn: () => sleep().then(_ => loggedIn),
    auth: async (user, password) => {
      await sleep()

      loggedIn = true

      switch (user) {
        case 'org': return
        case 'nonorg': return
        default: {
          loggedIn = false
          return Promise.reject('Wrong credentials')
        }
      }
    },
    logout: async () => {
      await sleep()
      loggedIn = false
    },
    getOrgs: async (user) => {
      switch (user) {
        case 'org': return [
          'org',
          'org1',
          'org2',
          'org3'
        ]
        case 'nonorg': return [
          'nonorg'
        ]
        default: return Promise.reject('No such user')
      }
    },
    getRepos: async (org) => {
      await sleep()

      return [
        'Repo1',
        'Repo2',
        'Repo3',
        'Repo4'
      ]
    },
    getBranches: async (org, repo) => {
      await sleep()

      return [
        'Branch1',
        'Branch2',
        'Branch3',
        'Branch4'
      ]
    },
    getContent: async (org, repo, branch, path) => {
      await sleep()

      if (path.length > 1) {
        return `<html><head /><body></body></html>`
      } else {
        return [
          'Feature1',
          'Feature2',
          'Feature3'
        ]
      }
    }
  }
}