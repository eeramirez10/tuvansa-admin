export const getUsers = async (): Promise<any> => {
  const resp = await fetch('https://jsonplaceholder.typicode.com/posts')

  const body = await resp.json()

  return body
}
