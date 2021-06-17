import { gql } from "apollo-server-micro";

export const inputTypes = gql`
  input DocumentInput {
    author: String
    title: String
    description: String
    type: String
    uri: String
    contentType: String
    category: String
    subcategory: String
  }

  input SubCategoryInput {
    title: String
    description: String
    slug: String
    category: String
  }

  input AnnuncementInput {
    org: String
    title: String
    owner: String
    contact: String
    description: String
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  input RegisterUserInput {
    email: String!
    org: String!
    role: String!
    name: String!
    password: String!
  }
`;
