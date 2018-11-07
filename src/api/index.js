import { mock } from './mock'
import { error } from './error'
import { github } from './github'

export const Api = {
  mock,
  error,
  github: github()
}