const PROXY_PATH = '/b'
// eslint-disable-next-line
const baseUrl = `${window.location.protocol}//${window.location.hostname}:${API_PORT}${PROXY_PATH}`

const DEFAULT_FETCH_OPT = {
  // eslint-disable-next-line
  mode: FETCH_MODE,
  redirect: 'follow',
  // eslint-disable-next-line
  credentials: FETCH_CREDENTIALS,
}

/**
 * 需要bind。func.bind(this)(args...)
 * @param {string} path e.g. /abc
 * @return {promise}
 */
export async function superGet(path) {
  const url = `${baseUrl}${path}`

  const opt = {
    ...DEFAULT_FETCH_OPT
  }

  opt.method = 'GET'

  const res = await fetch(url, opt)
  if (res.status === 200) {
    return res.json()
  }
  else if (res.status === 404) {
    this.$Message.error('404: Not Found!')
    return undefined
  }
  else if (res.status === 500) {
    this.$Message.error('500: server error')
    return undefined
  }
  throw `wrong status: ${res.status}`
}

/**
 * 需要bind。func.bind(this)(args...)
 * @param {string} path e.g. /abc
 * @param {object} json
 * @return {promise}
 */
export async function superPost(path, json) {
  const url = `${baseUrl}${path}`

  const opt = {
    ...DEFAULT_FETCH_OPT
  }

  if (json) {
    opt.headers = {
      'Content-Type': 'application/json'
    }
    opt.body = JSON.stringify(json)
  }
  opt.method = 'POST'

  const res = await fetch(url, opt)
  if (res.status === 200) {
    return res.json()
  }
  else if (res.status === 404) {
    this.$Message.error('404: Not Found!')
    return undefined
  }
  else if (res.status === 500) {
    this.$Message.error('500: server error')
    return undefined
  }
  throw `wrong status: ${res.status}`
}


/**
 * 需要bind。func.bind(this)(args...)
 * @param {string} path e.g. /abc
 * @param {object} json
 * @return {promise}
 */
export async function superPatch(path, json) {
  const url = `${baseUrl}${path}`

  const opt = {
    ...DEFAULT_FETCH_OPT
  }

  if (json) {
    opt.headers = {
      'Content-Type': 'application/json'
    }
    opt.body = JSON.stringify(json)
  }
  opt.method = 'PATCH'

  const res = await fetch(url, opt)
  if (res.status === 200) {
    return res.json()
  }
  else if (res.status === 404) {
    this.$Message.error('404: Not Found!')
    return undefined
  }
  else if (res.status === 500) {
    this.$Message.error('500: server error')
    return undefined
  }
  throw `wrong status: ${res.status}`
}