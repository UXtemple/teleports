import load from './import.js'

export default ({ mounted, schema }) => (
  Promise.all(
    mounted.map(({ app, path }, mountedAt) => (
      load(app)
        .then(bundle => (
          bundle.get({ path })
            .then(views => ({
              app,
              path,
              mountedAt,
              Runtime: bundle.Runtime,
              views,
            }))
          )
        )
    ))
  ).then(viewsPerApp => {
    // get the focus app's runtime
    const focusApp = viewsPerApp[viewsPerApp.length - 1]

    let context = schema
    const views = viewsPerApp.map(data => {
      const base = `${context}${data.app}`
      context = `${base}${data.path}`

      return data.views.map(view => ({
        ...view, // TODO run through edge cases to see if it's alright to mutate v instead
        context: `${base}${view.path}`,
        key: `${data.app}-${data.mountedAt}-${view.path}`
      }))
    }).reduce((a, b) => a.concat(b), [])

    return {
      Runtime: focusApp && focusApp.Runtime,
      views,
    }
  })
)
