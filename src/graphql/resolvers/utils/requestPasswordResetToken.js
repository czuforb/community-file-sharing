const AbortController = require("node-abort-controller");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const uuid4 = require("uuid4");
import { ApolloError } from "apollo-server-micro";
const requestPasswordResetToken = () => ({
  requestPasswordResetToken: async (_, { email }, { prisma }) => {
    global.AbortController = AbortController;
    const mg = mailgun.client({
      username: process.env.MAILGUN_USERNAME,
      key: process.env.MAILGUN_APIKEY,
      url: process.env.MAILGUN_URL,
    });

    const resetToken = uuid4();

    const reset = await prisma.users
      .update({
        where: { email: email },
        data: { reset: resetToken },
      })
      .then(() =>
        mg.messages.create(process.env.MAILGUN_DOMAIN, {
          from: process.env.MAILGUN_SENDER,
          to: [email],
          subject: "TÖOSZ Tudásbázis jelszóemlékeztető",
          template: process.env.MAILGUN_TEMPLATE,
          "h:X-Mailgun-Variables": JSON.stringify({ token: resetToken }),
        })
      )
      .then((msg) => console.log(msg))
      .catch((err) => {
        throw new ApolloError(err, 200);
      });

    return email;
  },
});

export default requestPasswordResetToken;
