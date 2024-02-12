import { METHOD_VALUES, fetchWithToken } from 'src/helpers/fetchWithToken'
import { type Category } from 'src/interfaces/Category'

interface CategoryResponse {
  categories: Category []
}

export const getCategories = async (): Promise<CategoryResponse> => {
  const resp = await fetchWithToken({ endpoint: 'categories', method: METHOD_VALUES.GET })

  return resp
}
