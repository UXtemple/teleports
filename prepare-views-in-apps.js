export default viewsPerApp => (
  viewsPerApp.map(data => (
    data.views.map(view => ({
      ...view, // TODO run through edge cases to see if it's alright to mutate v instead
      // context: 
      key: `${data.app}-${data.mountedAt}-${view.path}`
    }))
  )).reduce((a, b) => a.concat(b), [])
)
