const sleep = () => new Promise((resolve, reject) => {
  setTimeout(
    resolve, 1000
  )
})

export const mock = () => {
  let loggedIn = false

  return {
    isLoggedIn: () => sleep().then(_ => loggedIn),
    auth: async ({
      username
    }) => {
      await sleep()

      loggedIn = true

      switch (username) {
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
    getOrgs: async ({
      username
    }) => {
      switch (username) {
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
    getRepos: async ({
      owner
    }) => {
      await sleep()

      return [
        'Repo1',
        'Repo2',
        'Repo3',
        'Repo4'
      ]
    },
    getBranches: async ({
      owner,
      repo
    }) => {
      await sleep()

      return [
        'Branch1',
        'Branch2',
        'Branch3',
        'Branch4'
      ]
    },
    readFileOrDir: async ({ owner, repo, branch, path }) => {
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