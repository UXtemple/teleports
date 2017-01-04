let apps = {}

export const _set = next => {
  apps = next
}

export default app => (
  new Promise((resolve, reject) => {
    if (apps[app]) {
      resolve(apps[app])
    }

    load(app, bundle => {
      apps[app] = bundle
      resolve(bundle)
    })
  })
)
