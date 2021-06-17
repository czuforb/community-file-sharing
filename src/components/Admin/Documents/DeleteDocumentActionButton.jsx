import { gql, useMutation } from "@apollo/client";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

const DeleteDocumentActionButton = ({ uri, title }) => {
  const [deleteDocument] = useMutation(DELETE_DOCUMENT);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const onDelete = () => {
    deleteDocument({
      refetchQueries: [
        {
          query: GET_ALL_DOCUMENTS,
        },
      ],
      variables: {
        uri: uri,
      },
    });
    setIsOpen(false);
  };

  return (
    <>
      <Button colorScheme="red" size="sm" onClick={() => setIsOpen(true)}>
        Törlés
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Dokumentum
            </AlertDialogHeader>

            <AlertDialogBody>
              Biztosan törölni akarja a Dokumentumot? Törlés után véglegesen
              eltűnik az adatbázisból!
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Mégse
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Törlés
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteDocumentActionButton;

const DELETE_DOCUMENT = gql`
  mutation($uri: String) {
    deleteDocument(uri: $uri) {
      title
      published
    }
  }
`;

const GET_ALL_DOCUMENTS = gql`
  query GET_ALL_DOCUMENTS {
    getDocuments {
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
`;
