const DEFAULT_PARSER = /^https?:\/\/([a-zA-Z0-9\-_\.:]+)()(\/.*)/
const TRAILING_SLASH_REGEX = /\/$/

const MANY_APPS = /^(https?:\/\/.+?\/)(https?:\/\/.+)/
const appSplit = s => {
  let currentUri = s
  let nextUri = false

  const manyAppsMatch = s.match(MANY_APPS)
  if (manyAppsMatch) {
    currentUri = manyAppsMatch[1]
    nextUri = manyAppsMatch[2]
  }

  return {
    currentUri,
    nextUri
  }
}

export default function parse(uri, parsers = []) {
  const apps = []

  // Make sure we always have a trailing slash on the URI
  let nextUri = TRAILING_SLASH_REGEX.test(uri) ? uri : `${uri}/`

  do {
    const split = appSplit(nextUri)
    const currentUri = split.currentUri
    nextUri = split.nextUri

    const parser = parsers.find(p => p.test(currentUri)) || DEFAULT_PARSER
    const [ _0, app, _1, path ] = currentUri.match(parser)

    apps.push({
      app,
      path,
    })
  } while (nextUri)

  return apps
}
