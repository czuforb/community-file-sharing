import { allow, or, rule, shield } from 'graphql-shield'

const isAdmin = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  return ctx.auth.r
})

const isUser = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  return ctx.u.length >= 3
})

export const permissions = shield({
  Query: {
    getDocuments: isAdmin,
    getAnnuncements: allow,
    getLastInCategory: allow,
    getCategories: allow,
    listSubcategoriesInCategory: allow,
    listDocumentsInSubCategory: or(isUser, isAdmin),
    getUsers: isAdmin,
    getUserLogin: allow,
    searchDocuments: or(isUser, isAdmin)
  },
  Mutation: {
    getSignedS3Url: allow,
    getSignedS3UrlDownload: allow,
    insertDocument: or(isUser, isAdmin),
    deleteDocument: isAdmin,
    toggleDocument: isAdmin,
    updateDocument: isAdmin,

    addSubCategory: isAdmin,
    updateSubCategory: isAdmin,
    deleteSubCategory: isAdmin,

    saveAnnuncement: or(isUser, isAdmin),
    updateAnnuncement: isAdmin,
    deleteAnnuncement: isAdmin,
    toggleAnnuncement: isAdmin,
    loginUser: allow,
    deleteUser: isAdmin,
    toggleUser: isAdmin,
    registerUser: allow,
    checkToken: allow,
    requestPasswordResetToken: allow,
    resetPassword: allow
  }
})
