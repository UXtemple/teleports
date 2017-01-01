let apps = {}

export const _set = next => {
  apps = next
}

// TODO fetch apps
// https://github.com/UXtemple/panels/blob/master/app/get.js
// Review if System.import is now in a better place than it was when we started Panels.
// or if we can leverage the new import API
const System = {
  import: app => Promise.resolve(apps[app]),
}
export default System
