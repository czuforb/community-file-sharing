import {
  Box,
  Button,
  Circle,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Progress,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
  VStack
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { documentSchema } from '../validationSchemas'
import { gql, useMutation, useQuery, useReactiveVar } from '@apollo/client'
import { post } from 'axios'
import InputField from '../InputField'
import DocumentTypeSelector from './DocumentTypeSelector'
import { authVar } from '../../../graphql/client/cache'
import { useRouter } from 'next/router'
import { AddIcon, RepeatIcon } from '@chakra-ui/icons'

const _____DocumentUpl___oadForm = () => {
  const router = useRouter()

  // Apollo mutations
  const [saveDoc] = useMutation(SAVE_DOCUMENT)
  const { loading, data } = useQuery(GET_CATEGORIES)
  const auth = useReactiveVar(authVar)
  // State
  const [progress, setProgress] = useState(0)
  const [file, setFile] = useState()
  const [uploadComplete, setUploadComplete] = useState(false)
  const [category, setCategory] = useState(null)
  const [subcategory, setSubcategory] = useState(null)
  const toast = useToast()

  useEffect(() => {
    if (data) {
      const subCatArray = data.getCategories.filter((e) => e.slug === category)[0]

      setSubcategory(subCatArray)
    }
  }, [category])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => {
      const file = files[0]
      setFile(file)
    },
    disabled: false
  })

  return (
    <>
      <Progress value={progress} colorScheme="blue" />
      <Box p="4">
        <Formik
          validate={(values) => setCategory(values.documentCategory)}
          validateOnChange={true}
          validationSchema={documentSchema}
          initialValues={{
            documentTitle: '',
            documentDescription: '',
            documentType: '',
            uri: '',
            contentType: '',
            documentCategory: '',
            documentSubcategory: ''
          }}
          onSubmit={(values, actions) => {
            if (
              values.documentType == 'presentation' ||
              values.documentType == 'document' ||
              values.documentType == 'image' ||
              values.documentType == 'sheet'
            ) {
              // if (!file) {
              //   actions.setSubmitting(false);
              //   toast({
              //     title: "Hiba T??rt??nt!",
              //     description: "Nincs megadva felt??lt??tt f??jl!",
              //     status: "error",
              //     duration: 1500,
              //     isClosable: true,
              //     onCloseComplete: () => actions.resetForm(),
              //   });
              const url = 'https://toosztudasbazis.hu/api/upload'
              const formData = new FormData()
              formData.append('file', file)
              actions.setSubmitting(true)
              // UPLOAD FILE WITH AXIOS

              post(url, formData, {
                headers: {
                  'content-type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                  let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                  setProgress(percentCompleted)
                  setUploadComplete(true)
                }
              })
                .then((res) => {
                  // SAVE FILE WITH GRAPHQL
                  const savedFile = res.data.file
                  saveDoc({
                    refetchQueries: () => [
                      {
                        query: GET_DOCUMENTS_IN_SUBCATEGORY,
                        variables: {
                          slug: values.documentSubCategory
                        }
                      },
                      {
                        query: GET_ALL_DOCUMENTS
                      }
                    ],
                    variables: {
                      input: {
                        author: auth.name,
                        title: values.documentTitle,
                        description: values.documentDescription,
                        type: values.documentType,
                        uri: values.documentType === 'external' || values.documentType === 'video' ? values.url : savedFile,
                        contentType: values.documentType === 'external' || values.documentType === 'video' ? 'url' : file.type,
                        category: values.documentCategory,
                        subcategory: values.documentSubCategory
                      }
                    }
                  })
                    .then((e) => {
                      toast({
                        title: 'Sikeres felt??lt??s!',
                        description:
                          'A dokumentum felt??lt??sre ker??lt, amint az adminisztr??toraink j??v??hagyj??k, megjelen??t??sre ker??l az oldalon.',
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                        onCloseComplete: () => router.push('/')
                      })
                      actions.setSubmitting(false)
                    })
                    .catch((err) => {
                      actions.setSubmitting(false)
                      toast({
                        title: 'Hiba T??rt??nt!',
                        description: JSON.stringify(err),
                        status: 'error',
                        duration: 10500,
                        isClosable: true,
                        onCloseComplete: () => actions.resetForm()
                      })
                    })
                })
                .catch((err) => {
                  actions.setSubmitting(false)
                  toast({
                    title: 'Hiba T??rt??nt!',
                    description: JSON.stringify(err),
                    status: 'error',
                    duration: 10500,
                    isClosable: true,
                    onCloseComplete: () => actions.resetForm()
                  })
                })
              // }
            } else {
              saveDoc({
                refetchQueries: () => [
                  {
                    query: GET_DOCUMENTS_IN_SUBCATEGORY,
                    variables: {
                      slug: values.documentSubCategory
                    }
                  },
                  {
                    query: GET_ALL_DOCUMENTS
                  }
                ],
                // Variables
                variables: {
                  input: {
                    author: auth.name,
                    title: values.documentTitle,
                    description: values.documentDescription,
                    type: values.documentType,
                    uri: values.documentType === 'external' || values.documentType === 'video' ? values.url : savedFile,
                    contentType: values.documentType === 'external' || values.documentType === 'video' ? 'url' : file.type,
                    category: values.documentCategory,
                    subcategory: values.documentSubCategory
                  }
                }
              })
                // Success
                .then((e) => {
                  toast({
                    title: 'Sikeres felt??lt??s!',
                    description:
                      'A dokumentum felt??lt??sre ker??lt, amint az adminisztr??toraink j??v??hagyj??k, megjelen??t??sre ker??l az oldalon.',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    onCloseComplete: () => router.push('/')
                  })
                  actions.setSubmitting(false)
                })
                // Error
                .catch((err) => {
                  actions.setSubmitting(false)
                  toast({
                    title: 'Hiba T??rt??nt!',
                    description: 'K??rem pr??b??lkozzon ??jra!',
                    status: 'error',
                    duration: 10500,
                    isClosable: true,
                    onCloseComplete: () => actions.resetForm()
                  })
                })
            }
          }}>
          {(props) => (
            <Form>
              <Stack spacing="1rem">
                <InputField fieldname="documentTitle" placeholder="A dokumentum c??me" label="Dokumentum c??me:" type="text" />
                <Field name="documentDescription">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.documentDescription && form.touched.documentDescription}>
                      <FormLabel htmlFor="documentDescription">Dokumentum le??r??sa:</FormLabel>
                      <Textarea {...field} id="documentDescription" placeholder="Dokumentum le??r??sa" isRequired />
                      <FormErrorMessage>{form.errors.documentDescription}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="documentType">
                  {({ field, form, setFieldValue }) => <DocumentTypeSelector field={field} form={form} setFieldValue={setFieldValue} />}
                </Field>
                {props.values.documentType == 'external' || props.values.documentType == 'video' ? (
                  <InputField fieldname="url" placeholder="adja meg a c??met" label="Webc??m:" type="text" />
                ) : (
                  <Field name="documentFileUpload">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.documentFileUpload && form.touched.documentFileUpload}>
                        <FormLabel htmlFor="documentFileUpload">Dokumentum felt??lt??se:</FormLabel>
                        <Box border={file ? '2px solid #0426BF' : '2px dotted gray'} borderRadius="10px" padding="1rem" {...getRootProps()}>
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <Heading size="sm">K??rem h??zza ide a f??jlt.</Heading>
                          ) : (
                            <VStack>
                              {file ? (
                                <>
                                  <Circle w="4rem" h="4rem" bg="gray.100">
                                    <RepeatIcon color="gray.500" />
                                  </Circle>
                                  <Heading size="sm" color="gray.700">
                                    {file.name}
                                  </Heading>
                                  <Text>csatolva a felt??lt??shez.</Text>
                                </>
                              ) : (
                                <>
                                  <Circle w="4rem" h="4rem" bg="gray.100">
                                    <AddIcon color="gray.500" />
                                  </Circle>
                                  <Heading size="sm" color="gray.500">
                                    H??zza ide a kiv??lasztott f??jlokat, vagy kattintson ??s v??lassza ki.
                                  </Heading>
                                </>
                              )}
                            </VStack>
                          )}
                        </Box>

                        <FormErrorMessage>{form.errors.documentFileUpload}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                )}
                <Field name="documentCategory">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.documentCategory && form.touched.documentCategory}>
                      <FormLabel htmlFor="documentCategory">Kateg??ria:</FormLabel>
                      <Select {...field} id="documentCategory" placeholder="V??lassza ki a dokumentum kateg??ri??j??t">
                        <option value="tudasprogramok">Tud??sprogramok</option>
                        <option value="tudastar">Tud??st??r</option>
                        <option value="jo-gyakorlatok">J?? gyakorlatok</option>
                        <option value="halozatok">H??l??zatok</option>
                      </Select>

                      <FormErrorMessage>{form.errors.documentCategory}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                {category && (
                  <Field name="documentSubCategory">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.documentSubCategory && form.touched.documentSubCategory}>
                        <FormLabel htmlFor="documentSubCategory">Alkateg??ria:</FormLabel>
                        <Select {...field} id="documentSubCategory" placeholder="V??lassza ki a dokumentum alkateg??ri??j??t">
                          {subcategory &&
                            subcategory.subcategories &&
                            subcategory.subcategories.map((e) => <option value={e.slug}>{e.title}</option>)}
                        </Select>

                        <FormErrorMessage>{form.errors.documentCategory}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                )}
                <Divider />
              </Stack>
              <HStack w="100%" justifyContent="flex-end" spacing="1rem" p=".5rem">
                <Button colorScheme="tooszButton" isLoading={props.isSubmitting} type="submit">
                  Dokumentum bek??ld??se
                </Button>
              </HStack>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  )
}

export default ____DocumentUploadForm

// const GET_SIGNED_URL = gql`
//   mutation GetSignedUrl($filename: String, $filetype: String) {
//     getSignedS3Url(filename: $filename, filetype: $filetype)
//   }
// `;

const SAVE_DOCUMENT = gql`
  mutation insertDocument($input: DocumentInput) {
    insertDocument(input: $input) {
      title
      description
      uri
      type
      category
      subcategory
    }
  }
`
const GET_CATEGORIES = gql`
  query {
    getCategories {
      slug
      subcategories {
        title
        slug
      }
    }
  }
`

const GET_DOCUMENTS_IN_SUBCATEGORY = gql`
  query GET_DOCUMENTS_IN_SUBCATEGORY($slug: String) {
    listDocumentsInSubCategory(slug: $slug) {
      title
      description
      public
      slug
      documents {
        title
        description
        public
        published
        created
        updated
        type
        uri
        author
      }
    }
  }
`

const GET_ALL_DOCUMENTS = gql`
  query GET_ALL_DOCUMENTS {
    getDocuments {
      author
      title
      public
      published
      created
      type
      uri
      category
      subcategory
    }
  }
`
