import { gql } from "apollo-server-micro";

export const mutationTypes = gql`
  type Mutation {
    getSignedS3Url(filename: String, filetype: String): String
    getSignedS3UrlDownload(filename: String): String

    insertDocument(input: DocumentInput): Document!
    deleteDocument(uri: String): Document
    toggleDocument(uri: String, publish: Boolean): Document
    updateDocument(input: DocumentInput, id: Int): Document!

    addSubCategory(input: SubCategoryInput): SubCategory
    updateSubCategory(
      slug: String
      title: String
      description: String
    ): SubCategory
    deleteSubCategory(slug: String): String

    saveAnnuncement(input: AnnuncementInput): Annuncement
    updateAnnuncement(input: AnnuncementInput, id: Int): Annuncement
    deleteAnnuncement(title: String): Annuncement
    toggleAnnuncement(title: String, publish: Boolean): Annuncement

    loginUser(input: LoginUserInput): String
    deleteUser(email: String): User
    toggleUser(email: String, approval: Boolean): User
    registerUser(input: RegisterUserInput): User
    checkToken(token: String): Boolean

    requestPasswordResetToken(email: String): String
    resetPassword(token: String, password: String): String
  }
`;
