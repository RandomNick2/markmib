import { $authHost } from '.'


export async function getGroups() {
  const response = await $authHost.get('/group/all')
  return response.data
}