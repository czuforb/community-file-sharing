import Cors from 'micro-cors'
import { ApolloServer } from 'apollo-server-micro'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { PrismaClient } from '@prisma/client'
import mergedTypes from '../../src/graphql/types'
import resolvers from '../../src/graphql/resolvers'
import checkJWT from '../../src/graphql/utils/auth'
import { applyMiddleware } from 'graphql-middleware'
import { permissions } from '../../src/graphql/utils/permissions'

const cors = Cors()
const prisma = new PrismaClient()

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs: mergedTypes,
    resolvers: resolvers
  }),
  permissions
)

const apolloServer = new ApolloServer({
  schema,
  context: ({ req }) => ({
    prisma,
    auth: checkJWT(req) || null
  })
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default cors((req, res) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  return apolloServer.createHandler({
    path: process.env.GRAPHQL_SERVER_HANDLER
  })(req, res)
})
