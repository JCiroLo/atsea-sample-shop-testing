import { uuid } from 'uuidv4'

export const generateRandomID = (): String => {
  return uuid()
}
