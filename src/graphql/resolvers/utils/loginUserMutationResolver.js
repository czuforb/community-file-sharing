import {
  ApolloError,
  AuthenticationError,
  UserInputError,
} from "apollo-server-micro";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUserMutationResolver = () => ({
  loginUser: async (_, { input }, { prisma }) => {
    if (!input.email || !input.password) {
      throw new UserInputError("Az email és a jelszó megadása kötelezőasdasd");
    }
    const user = await prisma.users.findUnique({
      where: {
        email: input.email,
      },
    });

    if (!user) {
      throw new AuthenticationError("user", 200);
    }
    if (!user.approved) {
      throw new ApolloError("approve", 200);
    }
    const login = await bcrypt.compare(input.password, user.password);
    if (!login) {
      throw new AuthenticationError("pass", 200);
    }

    const playload = {
      n: user.name,
      a: user.admin,
    };
    const token = jwt.sign(playload, process.env.SIGN_TOKEN);

    return token;
  },
});

export default loginUserMutationResolver;
