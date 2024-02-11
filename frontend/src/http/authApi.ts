import { $host } from '.'
import type { Response } from '.'

export async function auth(username: string, password: string): Promise<Response> {
  const { data, status } = await $host.post('/auth/login', {
    username: username,
    password: password
  })

  return {
    data: data,
    status: status
  }
}
