import { getEnvVariables } from './getEnvVariables'

const {
  VITE_API_URL,
  VITE_API_URL_PROD,
  PROD
} = getEnvVariables()

interface ReturnProps {
  API_URL: string
  URL: string
}

export const getApiUrl = (): ReturnProps => {
  const API_URL = PROD ? `${VITE_API_URL_PROD}/api` : `${VITE_API_URL}/api`
  const URL = PROD ? VITE_API_URL_PROD : VITE_API_URL

  return { API_URL, URL }
}
