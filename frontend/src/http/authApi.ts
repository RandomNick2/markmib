import { $host, $authHost } from '.'
import type { Response } from '.'
import type { AxiosRequestConfig } from 'axios'

const jsonConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': "application/json"
  }
}

export async function auth(username: string, password: string): Promise<Response> {
  const json = JSON.stringify({
    username: username,
    password: password
  })
  const { data, status } = await $host.post('/auth/login', json, jsonConfig)

  return {
    data: data,
    status: status
  }
}


export async function get_me() {
  const { data } = await $authHost.get('/auth/me')
  return data
}