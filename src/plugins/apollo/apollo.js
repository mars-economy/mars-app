// import Vue from 'vue'
import { createHttpLink } from 'apollo-link-http'
import ApolloClient from 'apollo-client'
import VueApollo from 'vue-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_URL
})

const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    fetchPolicy: 'no-cache'
  }
})

// Vue.use(VueApollo)

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})
