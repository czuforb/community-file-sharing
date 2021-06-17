import { gql, useMutation } from '@apollo/client'
import { LockIcon, UnlockIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup, Tag, TagLabel, TagLeftIcon, Td, Th, Tr } from '@chakra-ui/react'
import React from 'react'
import DeleteDocumentActionButton from './DeleteDocumentActionButton'

const DocumentTableRow = ({ data }) => {
  const { title, uri, type, published, author } = data
  const [toggleDocument] = useMutation(TOGGLE_DOCUMENT)

  const toggleApproval = () => {
    toggleDocument({
      refetchQueries: [
        {
          query: GET_ALL_DOCUMENTS
        },
        {
          query: GET_DOCUMENTS_IN_SUBCATEGORY,
          variables: {
            slug: data.subcategory
          }
        }
      ],
      variables: {
        uri: uri,
        publish: !published
      }
    })
  }

  return (
    <Tr>
      <Td>{title}</Td>
      <Td>{author}</Td>
      <Td>{type}</Td>
      <Td>{published ? <Active /> : <InActive />}</Td>
      <Td>
        <ButtonGroup>
          {!published ? (
            <Button w="100px" colorScheme="green" variant="outline" size="sm" onClick={() => toggleApproval()}>
              Jóváhagy
            </Button>
          ) : (
            <Button w="100px" colorScheme="red" variant="outline" size="sm" onClick={() => toggleApproval()}>
              Elutasít
            </Button>
          )}
          <DeleteDocumentActionButton uri={uri} title={title} />
        </ButtonGroup>
      </Td>
    </Tr>
  )
}

export default DocumentTableRow

const Active = () => {
  return (
    <Tag size="md" key="md" variant="subtle" colorScheme="green">
      <TagLeftIcon boxSize="12px" as={UnlockIcon} />
      <TagLabel>Publikálva</TagLabel>
    </Tag>
  )
}
const InActive = () => {
  return (
    <Tag size="md" key="md" variant="subtle" colorScheme="red">
      <TagLeftIcon boxSize="12px" as={LockIcon} />
      <TagLabel>Inaktív</TagLabel>
    </Tag>
  )
}

const TOGGLE_DOCUMENT = gql`
  mutation ($uri: String, $publish: Boolean) {
    toggleDocument(uri: $uri, publish: $publish) {
      title
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
