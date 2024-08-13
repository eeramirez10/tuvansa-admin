import { METHOD_VALUES, fetchWithToken } from 'src/helpers/fetchWithToken'
import { type Category } from 'src/interfaces/Category'

export const getCategories = async (): Promise<{ categories: Category[] }> => {
  return await fetchWithToken({
    endpoint: 'categories',
    method: METHOD_VALUES.GET
  })
}

export const createCategory = async ({ category }: { category: Category }): Promise<{
  category: Category
  ok: boolean
}> => {
  return await fetchWithToken({
    endpoint: 'categories',
    method: METHOD_VALUES.POST,
    body: { ...category }
  })
}

export const getCategoryById = async ({ id }: { id: string }): Promise<{ category: Category }> => {
  return await fetchWithToken({
    endpoint: `categories/${id}`,
    method: METHOD_VALUES.GET
  })
}

export const updateCategory = async ({ id, category }: { id: string, category: Category }): Promise<{ category: Category }> => {
  return await fetchWithToken({
    endpoint: `categories/${id}`,
    method: METHOD_VALUES.PUT,
    body: { ...category }
  })
}
