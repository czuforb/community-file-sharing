import { ApolloClient, ApolloLink, concat, HttpLink } from '@apollo/client'
import { cache } from './cache'
import Cookie from 'js-cookie'

const httpLink = new HttpLink({
  uri: `https://toosztudasbazis.hu/api/graphql`
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: Cookie.get('toosz') || null
    }
  })

  return forward(operation)
})

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache
})

export default apolloClient
