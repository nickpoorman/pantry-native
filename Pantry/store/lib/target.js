import Axios from 'axios'
import urlParse from 'url-parse'

export const axiosInstance = Axios.create({
  timeout: 30000,
  headers: {
    'User-Agent': 'Metriks-App',
    'Cache-Control': 'no-cache',
  },
})

export async function axios(options) {
  return axiosInstance({
    ...options,
  })
}

export async function fetchTarget(target) {
  var { url } = target
  if (!url) {
    console.warn(`Trying to fetch an empty URL: ${JSON.stringify(url)}`)
  }
  const parsed = urlParse(url)
  const proto = parsed.protocol
  if (!proto) {
    url = `http://${url}`
  }

  return axios({ url })
    .then(res => res.data)
    .catch(err => {
      // TODO: We need to handle fetching where the target is broken.
      console.log(`TODO: Handle this error - axios err: ${JSON.stringify(err)}`)
    })
}
