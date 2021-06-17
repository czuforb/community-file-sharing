import { gql } from "apollo-server-micro";

export const costumTypes = gql`
  type Document {
    id: Int
    title: String
    author: String
    description: String
    public: Boolean
    published: Boolean
    created: DateTime
    updated: DateTime
    type: String
    uri: String
    category: Int
    subcategory: Int
  }
  type Category {
    id: Int
    title: String
    description: String
    slug: String
    public: Boolean
    documents: [Document]
    subcategories: [SubCategory]
    created: DateTime
    updated: DateTime
  }
  type SubCategory {
    id: Int
    title: String
    description: String
    public: Boolean
    slug: String
    created: DateTime
    category: Category
    documents: [Document]
    icon: String
  }

  type Annuncement {
    id: Int
    org: String
    title: String
    owner: String
    contact: String
    description: String
    created: DateTime
    updated: DateTime
    public: Boolean
    published: Boolean
  }
  type User {
    id: Int
    name: String
    org: String
    role: String
    email: String
    password: String
    admin: Boolean
    created: DateTime
    updated: DateTime
    login: DateTime
    approved: Boolean
  }

  type UserLogin {
    name: String
    admin: Boolean
  }

  scalar DateTime
`;
