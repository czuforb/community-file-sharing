// UTILS
import jwt from "jsonwebtoken";
import slugify from "slugify";
import { DateTimeResolver } from "graphql-scalars";

import insertMutationResolver from "./utils/insertMutationResolver";
import getNodesQueryResolver from "./utils/getNodesQueryResolver";

// USER MGMT
import registerUserMutationResolver from "./utils/registerUserMutationResolver";
import loginUserMutationResolver from "./utils/loginUserMutationResolver";

// AWS S3
import getSignedS3Url from "./utils/getSignedS3Url";
import getSignedS3UrlDownload from "./utils/getSignedS3UrlDownload";

// PASSWORD RESET
import requestPasswordResetToken from "./utils/requestPasswordResetToken";

import resetPassword from "./utils/resetPassword";

const resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    ...getNodesQueryResolver("getDocuments", "documents"),
    searchDocuments: async (_, { search }, { prisma, request }) => {
      const response = await prisma.documents.findMany({
        orderBy: {
          title: "asc",
        },
        where: {
          OR: [
            {
              title: {
                contains: search,
              },
            },
            {
              description: {
                contains: search,
              },
            },
          ],
          AND: {
            published: true,
          },
        },
      });

      return response;
    },
    getCategories: async (_, __, { prisma }) => {
      const response = await prisma.categories.findMany({
        include: {
          subcategories: true,
        },
      });
      return response;
    },
    listSubcategoriesInCategory: async (_, { slug }, { prisma, auth }) => {
      const response = await prisma.categories.findUnique({
        where: {
          slug: slug,
        },
        include: {
          subcategories: true,
        },
      });
      return response;
    },
    listDocumentsInSubCategory: async (_, { slug }, { prisma }) => {
      const response = await prisma.subcategories.findUnique({
        where: {
          slug: slug,
        },
        include: {
          documents: {
            where: {
              published: true,
            },
            orderBy: {
              updated: "desc",
            },
          },
        },
      });
      return response;
    },
    getUsers: async (_, __, { prisma }) => {
      const response = await prisma.users.findMany({
        orderBy: {
          created: "desc",
        },
      });
      return response;
    },
    getDocuments: async (_, __, { prisma }) => {
      const response = await prisma.documents.findMany({
        orderBy: {
          created: "desc",
        },
      });
      return response;
    },
    getAnnuncements: async (_, { published = false }, { prisma }) => {
      const response = await prisma.annuncements.findMany({
        ...(published && {
          where: {
            published: true,
          },
        }),
        orderBy: {
          updated: "desc",
        },
      });
      return response;
    },
    getLastInCategory: async (_, { category }, { prisma }) => {
      const response = await prisma.documents.findMany({
        orderBy: {
          updated: "desc",
        },
        take: 5,
        where: {
          category: {
            title: category,
          },
        },
      });
      return response;
    },
    getUserLogin: async (_, { token }) => {
      const response = await jwt.verify(token, process.env.SIGN_TOKEN);
      return { name: response.n, admin: response.a };
    },
  },
  Mutation: {
    ...getSignedS3Url(),
    ...getSignedS3UrlDownload(),
    ...registerUserMutationResolver(),
    ...loginUserMutationResolver(),
    ...requestPasswordResetToken(),
    ...resetPassword(),
    ...insertMutationResolver("saveAnnuncement", "annuncements"),
    addSubCategory: async (_, { input }, { prisma }) => {
      const response = await prisma.subcategories.create({
        data: {
          title: input.title,
          slug: input.slug,
          description: input.description,
          categories: {
            connect: { slug: input.category },
          },
        },
      });

      return response;
    },
    insertDocument: async (_, { input }, { prisma }) => {
      const {
        author,
        title,
        description,
        type,
        uri,
        contentType,
        category,
        subcategory,
      } = input;
      const insertResponse = await prisma.documents.create({
        data: {
          author: author,
          title: title,
          description: description,
          type: type,
          uri: uri,
          contentType: contentType,
          category: {
            connect: { slug: category },
          },
          subcategory: {
            connect: { slug: subcategory },
          },
        },
      });
      return insertResponse;
    },
    deleteUser: async (_, { email }, { prisma }) => {
      const response = await prisma.users.delete({
        where: {
          email: email,
        },
      });
      return response;
    },
    deleteDocument: async (_, { uri }, { prisma }) => {
      const response = await prisma.documents.delete({
        where: {
          uri: uri,
        },
      });
      return response;
    },
    deleteSubCategory: async (_, { slug }, { prisma }) => {
      const response = await prisma.subcategories.delete({
        where: {
          slug: slug,
        },
      });
      return "success";
    },
    deleteAnnuncement: async (_, { title }, { prisma }) => {
      const response = await prisma.annuncements.delete({
        where: {
          title: title,
        },
      });
      return response;
    },
    toggleUser: async (_, { email, approval }, { prisma }) => {
      const response = await prisma.users.update({
        where: { email: email },
        data: {
          approved: approval,
        },
      });
      return response;
    },
    toggleDocument: async (_, { uri, publish }, { prisma }) => {
      const response = await prisma.documents.update({
        where: { uri: uri },
        data: {
          published: publish,
        },
      });
      return response;
    },
    toggleAnnuncement: async (_, { title, publish }, { prisma }) => {
      const response = await prisma.annuncements.update({
        where: { title: title },
        data: {
          published: publish,
        },
      });
      return response;
    },
    updateSubCategory: async (_, { slug, title, description }, { prisma }) => {
      const response = await prisma.subcategories.update({
        where: { slug: slug },
        data: {
          slug: slugify(title, {
            lower: true,
            strict: true,
            locale: "hu",
          }),
          title: title,
          description: description,
        },
      });
      return response;
    },
  },
};

export default resolvers;
