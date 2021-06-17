import { gql } from "apollo-server-micro";

export const queryTypes = gql`
  type Query {
    getDocuments: [Document]
    getAnnuncements(published: Boolean): [Annuncement]
    getLastInCategory(category: String): [Document]
    getCategories: [Category]
    listSubcategoriesInCategory(slug: String): Category
    listDocumentsInSubCategory(slug: String): SubCategory
    getUsers: [User]
    getUserLogin(token: String!): UserLogin
    searchDocuments(search: String): [Document]
  }
`;
