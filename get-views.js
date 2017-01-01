import prepareViewsInApps from './prepare-views-in-apps.js'
import System from './import.js'

export default mounted => (
  Promise.all(
    mounted.map(({ app, path }, mountedAt) => (
      System.import(app)
        .then(bundle => (
          bundle.get({ path })
            .then(views => ({
              app,
              mountedAt,
              Runtime: bundle.Runtime,
              views,
            }))
          )
        )
    ))
  ).then(viewsPerApp => {
    let Runtime
    // get the focus app's runtime
    const focusApp = viewsPerApp[viewsPerApp.length - 1]

    return {
      Runtime: focusApp && focusApp.Runtime,
      views: prepareViewsInApps(viewsPerApp),
    }
  })
)
