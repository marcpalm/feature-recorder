const sleepReject = () => new Promise((resolve, reject) => {
  setTimeout(
    reject, 1000
  )
})

export const error = () => {
  return {
    isLoggedIn: sleepReject,
    auth: sleepReject,
    logout: sleepReject,   
    getOrgs: sleepReject,
    getRepos: sleepReject,
    getBranches: sleepReject,
    getContent: sleepReject
  }
}
