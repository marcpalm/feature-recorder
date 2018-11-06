const sleepReject = () => new Promise((resolve, reject) => {
  setTimeout(
    reject, 1000
  )
})

export const error = {
  auth: sleepReject,
  getOrgs: sleepReject,
  getRepos: sleepReject,
  getBranches: sleepReject,
  getFeatures: sleepReject,
  getSelectedFeature: sleepReject
}
