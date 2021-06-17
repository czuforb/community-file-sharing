import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import slugify from "slugify";
import InputField from "../InputField";

export default function AddNewCategoryForm({ onClose }) {
  const [addSubCategory] = useMutation(ADD_SUBCATEGORY, {});
  const router = useRouter();
  const queries = router.asPath.split("/");
  return (
    <>
      <Box p="4">
        <Formik
          initialValues={{ title: "", description: "" }}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);

            addSubCategory({
              refetchQueries: () => [
                {
                  query: GET_SUBCATEGORIES_IN_CATEGORY,
                  variables: {
                    slug: queries[1],
                  },
                },
              ],
              variables: {
                input: {
                  slug: slugify(values.title, {
                    lower: true, // convert to lower case, defaults to `false`
                    strict: true, // strip special characters except replacement, defaults to `false`
                    locale: "hu", // language code of the locale to use
                  }),
                  title: values.title,
                  description: values.description,
                  category: queries[1],
                },
              },
            })
              .then((e) => {
                actions.setSubmitting(false);
                router.push(`/${queries[1]}`);
                onClose();
              })
              .catch((err) => {
                const errors = err.graphQLErrors;
                if (errors) {
                  if (errors[0].message == "approve") {
                    onOpen();
                  }
                  actions.setErrors({
                    title:
                      errors[0].message == "user"
                        ? "Nem található ilyen email!"
                        : null,
                    description:
                      errors[0].message == "pass" ? "Helytelen jelszó" : null,
                  });
                  actions.setSubmitting(false);
                }
              });
          }}
        >
          {(props) => (
            <Form>
              <Stack spacing="1rem">
                <InputField
                  fieldname="title"
                  label="Kategória címe:"
                  placeholder="Kategória"
                />
                <Field name="description">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.description && form.touched.description
                      }
                    >
                      <FormLabel htmlFor="description">
                        Kategória leírása:
                      </FormLabel>
                      <Textarea
                        h="100%"
                        {...field}
                        id="description"
                        placeholder="kategória leírása"
                      />
                      <FormErrorMessage>
                        {form.errors.description}
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
                Mentés
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}

const ADD_SUBCATEGORY = gql`
  mutation ADD_SUBCATEGORY($input: SubCategoryInput) {
    addSubCategory(input: $input) {
      slug
      title
      description
    }
  }
`;

const GET_SUBCATEGORIES_IN_CATEGORY = gql`
  query ($slug: String) {
    listSubcategoriesInCategory(slug: $slug) {
      title
      description
      public
      slug
      subcategories {
        title
        description
        slug
      }
    }
  }
`;
