import axios from 'axios'


const API = axios.create({
  baseURL: `http://localhost:8080/`,
  timeout: 20000,
})

API.interceptors.request.use(async (config) => {
  const auth_token = localStorage.getItem('auth_token') 
  if (auth_token) {
    config.headers.Authorization = `${auth_token}`
  }

  return config
})

export default API
  