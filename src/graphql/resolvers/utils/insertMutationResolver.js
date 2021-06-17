const insertMutationResolver = (mutationName, modelName) => ({
  [mutationName]: async (_, { input }, { prisma }) => {
    const insertResponse = await prisma[modelName].create({
      data: { ...input },
    });
    return insertResponse;
  },
});

export default insertMutationResolver;
