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

import InputField from "../InputField";

export default function EditCategoryForm({ slug }) {
  const [updateSubCategory] = useMutation(UPDATE_SUBCATEGORY, {});
  const router = useRouter();
  const queries = router.asPath.split("/");
  return (
    <>
      <Box p="4">
        <Formik
          //validationSchema={loginSchema}
          initialValues={{ title: "", description: "" }}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true);
            updateSubCategory({
              refetchQueries: () => [
                {
                  query: GET_SUBCATEGORIES_IN_CATEGORY,
                  variables: {
                    slug: queries[1],
                  },
                },
              ],
              variables: {
                slug: slug,
                title: values.title,
                description: values.description,
              },
            })
              .then((e) => {
                router.back();
                // router.push({
                //   path: `/${queries[1]}/${e.data.updateSubCategory.slug}`,
                //   path: `/${queries[1]}/${e.data.updateSubCategory.slug}`,
                // });
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
                  placeholder="kategória"
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

const UPDATE_SUBCATEGORY = gql`
  mutation UPDATE_SUBCATEGORY(
    $slug: String
    $title: String
    $description: String
  ) {
    updateSubCategory(slug: $slug, title: $title, description: $description) {
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
