import { gql, useMutation } from "@apollo/client";
import { DeleteIcon } from "@chakra-ui/icons";
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

const DeleteUserActionButton = ({ email, name }) => {
  const [deleteUser] = useMutation(DELETE_USER);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const onDelete = () => {
    deleteUser({
      variables: {
        email: email,
      },
    });
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant="solid"
        colorScheme="red"
        size="sm"
        onClick={() => setIsOpen(true)}
        leftIcon={<DeleteIcon />}
      >
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
              Felhasználó törlése!
            </AlertDialogHeader>

            <AlertDialogBody>
              Biztosan törölni akarja nevű felhasználót? Törlés után véglegesen
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

export default DeleteUserActionButton;

const DELETE_USER = gql`
  mutation($email: String) {
    deleteUser(email: $email) {
      name
      email
    }
  }
`;
