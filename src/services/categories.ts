import { METHOD_VALUES, fetchWithToken } from 'src/helpers/fetchWithToken'
import { type CategoryBody, type Category } from 'src/interfaces/Category'

interface CategoryResponse {
  ok: boolean
  msg: string
  categories: Category[]
  category: Category[]
}

export const getCategories = async (): Promise<CategoryResponse> => {
  const resp = await fetchWithToken({ endpoint: 'categories', method: METHOD_VALUES.GET })

  return resp
}

export const createCategory = async ({ category }: { category: CategoryBody }): Promise<CategoryResponse> => {
  const resp = await fetchWithToken({ endpoint: 'categories', method: METHOD_VALUES.POST, body: { ...category } })

  return resp
}
