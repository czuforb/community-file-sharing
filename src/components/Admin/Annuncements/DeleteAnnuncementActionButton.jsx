import { gql, useMutation } from "@apollo/client";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

const DeleteAnnuncementActionButton = ({ title }) => {
  const [deleteAnnuncement] = useMutation(DELETE_ANNUNCEMENT);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const toast = useToast();

  const onDelete = () => {
    deleteAnnuncement({
      refetchQueries: [
        {
          query: GET_ALL_ANNUNCEMENTS,
        },
        {
          query: GET_ALL_PUBLISHED_ANNUNCEMENTS,
        },
      ],
      variables: {
        title: title,
      },
    });
    toast({
      title: "Felhívás törölve.",
      description:
        "A partnerségi felhívást sikeresen eltávolítottuk az adatbázisból.",
      status: "info",
      duration: 2000,
      isClosable: true,
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
              Hirdetmény törlése!
            </AlertDialogHeader>

            <AlertDialogBody>
              Biztosan törölni akarja a partnerségi felhívást? Törlés után
              véglegesen eltűnik az adatbázisból!
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

export default DeleteAnnuncementActionButton;

const DELETE_ANNUNCEMENT = gql`
  mutation($title: String) {
    deleteAnnuncement(title: $title) {
      title
    }
  }
`;

const GET_ALL_ANNUNCEMENTS = gql`
  query GET_ALL_ANNUNCEMENTS {
    getAnnuncements {
      org
      title
      created
      public
      published
    }
  }
`;

const GET_ALL_PUBLISHED_ANNUNCEMENTS = gql`
  query GET_ALL_PUBLISHED_ANNUNCEMENTS {
    getAnnuncements(published: true) {
      org
      title
      updated
      owner
      description
      published
      contact
    }
  }
`;
