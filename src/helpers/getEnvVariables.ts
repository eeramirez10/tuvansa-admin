export const getEnvVariables = (): ImportMetaEnv => {
  return {
    ...import.meta.env
  }
}
