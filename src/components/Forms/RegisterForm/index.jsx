import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import InputField from "../InputField";
import { signupSchema } from "../validationSchemas";
import { useRouter } from "next/router";

export default function RegisterForm() {
  const router = useRouter();
  const toast = useToast();

  const [register] = useMutation(gql`
    mutation ($input: RegisterUserInput) {
      registerUser(input: $input) {
        email
        created
      }
    }
  `);

  return (
    <Box p="4">
      <Formik
        validationSchema={signupSchema}
        initialValues={{
          name: "",
          email: "",
          org: "",
          role: "",
          password: "",
          passwordcheck: "",
          terms: false,
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          register({
            variables: {
              input: {
                email: values.email,
                org: values.org,
                role: values.role,
                name: values.name,
                password: values.password,
              },
            },
          })
            .then((res) => {
              router.push("/");
              actions.setSubmitting(false);
              toast({
                title: "Sikeres regisztráció",
                description:
                  "Adminisztrátoraink hamarosan jóváhagyják a jelentkezését oldalunkra.",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
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
                  actions.resetForm();
                }, 2000);
              }
            });
        }}
      >
        {(props) => (
          <Form>
            <Stack spacing="1rem">
              <InputField
                fieldname="name"
                placeholder="Kérem adja meg teljes nevét"
                label="Teljes név:"
                required
              />
              <InputField
                fieldname="org"
                placeholder="Kérem adja meg önkormányzatának nevét"
                label="Önkormányzat vagy szervezet neve:"
                required
              />
              <InputField
                fieldname="role"
                placeholder="Kérem adja meg tisztségének nevét"
                label="Tisztség, vagy beosztás:"
                required
              />
              <InputField
                fieldname="email"
                placeholder="Kérem adja meg email címét"
                label="Email cím:"
                required
              />
              <InputField
                fieldname="password"
                placeholder="Kérem adja meg jelszavát"
                label="Jelszó:"
                type="password"
                required
              />
              <InputField
                fieldname="passwordcheck"
                placeholder="Kérem ismételje jelszavát"
                label="Jelszó ellenőrzése:"
                type="password"
                required
              />
              <Field name="terms">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.terms && form.touched.terms}
                  >
                    <Checkbox
                      isRequired={true}
                      type="terms"
                      {...field}
                      id="terms"
                      placeholder="terms"
                    >
                      Elfogadom az adatkezelési és a felhasználási feltételeket.
                    </Checkbox>
                    <FormErrorMessage>{form.errors.terms}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Stack>
            <Button
              mt={4}
              colorScheme="tooszButton"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Regisztráció
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
