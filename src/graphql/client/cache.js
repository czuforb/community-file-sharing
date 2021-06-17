import { InMemoryCache, makeVar } from '@apollo/client'

export const authVar = makeVar({})

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        login: {
          read() {
            return authVar()
          }
        }
      }
    }
  }
})
