import { setCommonTestEnvironmentVariables } from '../utils/env'

module.exports = async (): Promise<void> => {
  console.info('=== SET ENVIRONMENT VARIABLES ===')
  setCommonTestEnvironmentVariables()
}
