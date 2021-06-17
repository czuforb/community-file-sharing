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

const DeleteSubCategoryButton = ({ slug, category }) => {
  const [deleteSubCategory] = useMutation(DELETE_SUBCATEGORY);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const onDelete = () => {
    deleteSubCategory({
      refetchQueries: [
        {
          query: GET_SUBCATEGORIES_IN_CATEGORY,
          variables: {
            slug: category,
          },
        },
      ],
      variables: {
        slug: slug,
      },
    });
    setIsOpen(false);
  };

  return (
    <>
      <Button
        colorScheme="red"
        size="sm"
        onClick={() => setIsOpen(true)}
        pos="absolute"
        right="4"
      >
        <DeleteIcon />
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
              Kategória
            </AlertDialogHeader>

            <AlertDialogBody>
              Biztosan törölni akarja a kategóriát? Törlés után véglegesen
              eltűnik az adatbázisból és a hozzá tartózó összes dokumentum is!
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

export default DeleteSubCategoryButton;

const DELETE_SUBCATEGORY = gql`
  mutation($slug: String) {
    deleteSubCategory(slug: $slug)
  }
`;
const GET_SUBCATEGORIES_IN_CATEGORY = gql`
  query($slug: String) {
    listSubcategoriesInCategory(slug: $slug) {
      title
      description
      public
      slug
      subcategories {
        title
        description
        slug
        icon
      }
    }
  }
`;
