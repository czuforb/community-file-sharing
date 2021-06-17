import { ApolloError } from "apollo-server-micro";
import bcrypt from "bcrypt";
import uuid4 from "uuid4";

const resetPassword = () => ({
  resetPassword: async (_, { password, token }, { prisma }) => {
    const hashedPassword = bcrypt.hash(password, 10);
    const newToken = uuid4();
    const reset = await prisma.users
      .updateMany({
        where: {
          reset: { contains: token },
        },
        data: { password: hashedPassword, reset: newToken },
      })

      .catch((err) => {
        throw new ApolloError(err, 200);
      });
    const response = JSON.stringify(reset);
    return response;
  },
});

export default resetPassword;
