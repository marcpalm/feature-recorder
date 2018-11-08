const sleepReject = (message) => new Promise((resolve, reject) => {
  setTimeout(
    () => reject(message), 1000
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
    readFileOrDir: sleepReject,
    updateFile: sleepReject,
    createFile: sleepReject,
    deleteFile: sleepReject
  }
}
