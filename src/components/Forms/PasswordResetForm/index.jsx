import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { passwordSchema } from "../validationSchemas";
import { useMutation, gql } from "@apollo/client";
import { useToast } from "@chakra-ui/react";

const PasswordResetForm = ({ token }) => {
  const [resetPassword] = useMutation(PASSwORD_RESET, {});
  const toast = useToast();
  return (
    <Box p="4">
      <Formik
        validationSchema={passwordSchema}
        initialValues={{ passowrd: "", passwordcheck: "" }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          resetPassword({
            variables: {
              input: {
                token: token,
                password: values.password,
              },
            },
          })
            .then((res) => {
              toast({
                title: "Sikeres jelszóváltoztatás!",
                description: "Kérem jelentkezzen be az új jelszavával.",
                status: "success",
                duration: 1000,
                isClosable: true,
                onCloseComplete: () => {
                  router.push("/", "/");
                },
              });
              actions.setSubmitting(false);
            })
            .catch((err) => {
              toast({
                title: "Hiba történt",
                description: "Kérem próbálkozzon újra!",
                status: "error",
                duration: 2000,
                isClosable: true,
                onCloseComplete: () => actions.resetForm(),
              });
              actions.setSubmitting(false);
            });
        }}
      >
        {(props) => (
          <Form>
            <Stack spacing="1rem">
              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel htmlFor="password">Jelszó:</FormLabel>
                    <Input
                      type="password"
                      {...field}
                      id="password"
                      placeholder=""
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="passwordcheck">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.passwordcheck && form.touched.passwordcheck
                    }
                  >
                    <FormLabel htmlFor="passwordcheck">
                      Jelszó mégegyszer:
                    </FormLabel>
                    <Input
                      type="password"
                      {...field}
                      id="passwordcheck"
                      placeholder=""
                    />
                    <FormErrorMessage>
                      {form.errors.passwordcheck}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Stack>
            <Button
              mt={4}
              colorScheme="tooszButton"
              isLoading={props.isSubmitting}
              type="submit"
              size="md"
            >
              Új jelszó generálás
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PasswordResetForm;

const PASSwORD_RESET = gql`
  mutation($password: String, $token: String) {
    resetPassword(password: $password, token: $token)
  }
`;
