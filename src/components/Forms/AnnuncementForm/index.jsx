import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  Textarea,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { gql, useMutation } from "@apollo/client";
import InputField from "../InputField";
import { annuncementSchema } from "../validationSchemas";
import { useRouter } from "next/router";
const AnnuncementForm = ({ auth }) => {
  const [saveAnnuncement] = useMutation(SAVE_ANNUNCEMENT);
  const toast = useToast();
  const router = useRouter();
  return (
    <Tooltip
      isDisabled={auth.name ? true : false}
      hasArrow
      label="Hírdetés feladásához kérem jelentkezzen be."
    >
      <Box
        w="100%"
        padding="16px"
        borderRadius="10px"
        opacity={auth.name ? "1" : "0.5"}
      >
        <Formik
          validationSchema={annuncementSchema}
          initialValues={{
            title: "",
          }}
          onSubmit={(values) => {
            saveAnnuncement({
              refetchQueries: () => [
                {
                  query: GET_PUBLISHED_ANNUNCEMENTS,
                },
              ],
              variables: {
                input: {
                  org: values.organization,
                  owner: values.owner,
                  contact: values.contact,
                  title: values.title.trim(),
                  description: values.description,
                },
              },
            }).then((e) => {
              toast({
                title: "Hirdetés feladásra került.",
                description:
                  "Amint jóváhagyjuk, a partnerségi felhívást, megjelenítésre kerül.",
                status: "info",
                duration: 3000,
                isClosable: true,
                onCloseComplete: () => router.push("/"),
              });
            });
            // .catch((err) => {
            //   const errors = err.graphQLErrors;
            //   if (errors) {
            //     actions.setErrors({
            //       org:
            //         errors[0].message == "org"
            //           ? "Nem található ilyen email!"
            //           : null,
            //       password:
            //         errors[0].message == "pass" ? "Helytelen jelszó" : null,
            //     });
            //     actions.setSubmitting(false);
            //     setTimeout(() => {
            //       actions.resetForm({
            //         values: {
            //           email: "",
            //           password: "",
            //         },
            //       });
            //     }, 2000);
            //   }
            // });
          }}
        >
          {(props) => (
            <Form>
              <Stack flexDir={["column", null, "row"]} spacing="4">
                <VStack
                  w={["100%", null, "50%"]}
                  alignItems="start"
                  h="300px"
                  spacing="1rem"
                >
                  <InputField
                    fieldname="organization"
                    placeholder="Szervezet neve"
                    label="Szervezet neve"
                    disabled={auth.name ? false : true}
                  />
                  <InputField
                    fieldname="owner"
                    placeholder="Név"
                    label="Feladó neve, project gazda:"
                    disabled={auth.name ? false : true}
                  />
                  <InputField
                    fieldname="contact"
                    placeholder="Email"
                    label="Elérhetőség:"
                    disabled={auth.name ? false : true}
                  />
                </VStack>
                <VStack w={["100%", null, "50%"]} h="300px" spacing="1rem">
                  <InputField
                    fieldname="title"
                    placeholder="Partnerségi felhívás címe"
                    label="Partnerségi felhívás címe:"
                    disabled={auth.name ? false : true}
                  />
                  <Field name="description">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.description && form.touched.description
                        }
                      >
                        <FormLabel htmlFor="description">
                          Partnerségi felhívás leírása:
                        </FormLabel>
                        <Textarea
                          h="100%"
                          {...field}
                          id="description"
                          placeholder="Partnerségi felhívás leírása"
                          isDisabled={auth.name ? false : true}
                        />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </VStack>
              </Stack>
              <Flex w="100%" justifyContent="flex-end">
                <Button
                  colorScheme="tooszButton"
                  type="submit"
                  isDisabled={auth.name ? false : true}
                >
                  Partnerségi felhívás feladása
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Tooltip>
  );
};

export default AnnuncementForm;

const SAVE_ANNUNCEMENT = gql`
  mutation saveAnnuncement($input: AnnuncementInput) {
    saveAnnuncement(input: $input) {
      title
    }
  }
`;

const GET_PUBLISHED_ANNUNCEMENTS = gql`
  query GET_PUBLISHED_ANNUNCEMENTS {
    getAnnuncements {
      org
      title
      created
      public
      published
    }
  }
`;
