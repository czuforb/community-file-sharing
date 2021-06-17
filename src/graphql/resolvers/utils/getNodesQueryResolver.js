const getNodesQueryResolver = (mutationName, modelName) => ({
  [mutationName]: async (_, { id }, { prisma }) => {
    const nodesResponse = await prisma[modelName].findMany({
      orderBy: {
        updated: "asc",
      },
      include: {
        subcategories: true,
        documents: true,
      },
    });
    return nodesResponse;
  },
});

export default getNodesQueryResolver;
