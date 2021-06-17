import { gql, useMutation, useReactiveVar } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
//import { useEffect } from "react";
import { authVar } from "../../../graphql/client/cache";
import * as Yup from "yup";

const RequestPasswordResetForm = () => {
  const [requestToken] = useMutation(REQUEST_PASS_TOKEN);
  const toast = useToast();
  const router = useRouter();
  const auth = useReactiveVar(authVar);

  return (
    <Box p="4">
      <Formik
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Nem megfelelő emailt adott meg")
            .required("Email megadása kötelező"),
        })}
        initialValues={{ email: "" }}
        onSubmit={(values, actions) => {
          requestToken({
            variables: {
              email: values.email,
            },
          })
            .then((e) => {
              toast({
                title: "Jelszó emlékeztető elküldve!",
                description:
                  "A megadott emailcímre elküldtük.Kérem kattintson az emailben található gombra, és újítsa meg jelszavát!",
                status: "success",
                duration: 9000,
                isClosable: true,
                onCloseComplete: () => router.push("/"),
              });
              actions.setSubmitting(false);
            })
            .catch((e) => {
              toast({
                title: "Hiba történt!",
                description: "Kérem próbálkozzon újra!",
                status: "error",
                duration: 4000,
                isClosable: true,
              });
              actions.setSubmitting(false);
              actions.resetForm();
            });
        }}
      >
        {(props) => (
          <Form>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">Regisztrált email címe:</FormLabel>
                  <Input
                    type="email"
                    {...field}
                    id="email"
                    placeholder="Email cím"
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              size="sm"
              colorScheme="tooszButton"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Új jelszó igénylése
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RequestPasswordResetForm;

const REQUEST_PASS_TOKEN = gql`
  mutation REQUEST_PASS_TOKEN($email: String) {
    requestPasswordResetToken(email: $email)
  }
`;
