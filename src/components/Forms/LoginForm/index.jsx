import { gql, resetApolloContext, useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import {
  Box,
  Button,
  Text,
  Stack,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { loginSchema } from "../validationSchemas";
import InputField from "../InputField";
import { useRouter } from "next/router";
import NotActivatedModal from "./NotActivatedModal";

export default function LoginForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cookies, setCookie] = useCookies();
  const router = useRouter();
  const [login] = useMutation(LOGIN, {});

  // const onSuccess = (res) => {
  //   const token = res.loginUser;
  //   setCookie("toosz", token);
  //   authVar(token);
  // };

  return (
    <>
      <Box p="4">
        <Formik
          validationSchema={loginSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            login({
              variables: {
                input: {
                  email: values.email,
                  password: values.password,
                },
              },
            })
              .then((res) => {
                const token = res.data.loginUser;
                setCookie("toosz", token);
                actions.setSubmitting(false);
                router.push("/", "/");
              })
              .catch((err) => {
                const errors = err.graphQLErrors;
                if (errors) {
                  if (errors[0].message == "approve") {
                    onOpen();
                  }
                  actions.setErrors({
                    email:
                      errors[0].message == "user"
                        ? "Nem található ilyen email!"
                        : null,
                    password:
                      errors[0].message == "pass" ? "Helytelen jelszó" : null,
                  });
                  actions.setSubmitting(false);
                  setTimeout(() => {
                    actions.resetForm({
                      values: {
                        email: "",
                        password: "",
                      },
                    });
                  }, 2000);
                }
              });
          }}
        >
          {(props) => (
            <Form>
              <Stack spacing="1rem">
                <InputField
                  fieldname="email"
                  label="Email:"
                  placeholder="Regisztrált email cím"
                />
                <InputField
                  fieldname="password"
                  label="Jelszó:"
                  placeholder="Adja meg jelszavát"
                  type="password"
                />
              </Stack>
              <Button
                mt={4}
                colorScheme="tooszButton"
                isLoading={props.isSubmitting}
                type="submit"
                size="md"
              >
                Bejelentkezés
              </Button>
              <Text mt="4" color="gray.600">
                Amennyiben elfelejtette jelszavát
                <Link href="/felhasznalo/elfelejtett-jelszo">
                  {" "}
                  kattintson ide.
                </Link>
              </Text>
            </Form>
          )}
        </Formik>
      </Box>
      <NotActivatedModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

const LOGIN = gql`
  mutation($input: LoginUserInput) {
    loginUser(input: $input)
  }
`;
