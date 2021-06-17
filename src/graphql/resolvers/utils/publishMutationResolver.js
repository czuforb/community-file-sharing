const publishMutationResolver = (mutationName, modelName) => ({
  [mutationName]: async (_, { id }, { prisma }) => {
    const publishResponse = await prisma[modelName].update({
      where: { id: id },
      data: {
        published: true,
      },
    });
    return publishResponse;
  },
});

export default publishMutationResolver;
