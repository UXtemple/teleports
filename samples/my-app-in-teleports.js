import MyApp from './my-app.js'

export default async (uri) => {
  return [{
    component: MyApp,
    path: uri,
    props: {},
  }]
}
