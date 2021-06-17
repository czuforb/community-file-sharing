import bcrypt from "bcrypt";
import uuid4 from "uuid4";

const registerUserMutationResolver = () => ({
  registerUser: async (_, { input }, { prisma }) => {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const token = uuid4();
    const newUser = await prisma.users.create({
      data: {
        email: input.email,
        name: input.name,
        password: hashedPassword,
        org: input.org,
        role: input.role,
        reset: token,
      },
    });
    return newUser;
  },
});

export default registerUserMutationResolver;
