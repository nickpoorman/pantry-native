import Axios from 'axios'
import urlParse from 'url-parse'

export const axiosInstance = Axios.create({
  timeout: 30000,
  headers: {
    'User-Agent': 'Metriks-App',
  },
})

export async function axios(options) {
  return axiosInstance({
    ...options,
  })
}

export async function fetchTarget(target) {
  var { url } = target
  const parsed = urlParse(url)
  const proto = parsed.protocol
  if (!proto) {
    url = `http://${url}`
  }
  return axios({ url }).then(res => res.data)
}
