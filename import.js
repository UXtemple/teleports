let apps = {}

export const _set = next => {
  apps = next
}

const load = app => {
  return {
    get: () => []
  }
}

export default app => (
  new Promise((resolve, reject) => {
    if (apps[app]) {
      return resolve(apps[app])
    }

    load(app, bundle => {
      apps[app] = bundle
      resolve(bundle)
    })
  })
)
