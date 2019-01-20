import Axios from 'axios'

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
  const { url } = target
  return axios({ url }).then(res => res.data)
}
