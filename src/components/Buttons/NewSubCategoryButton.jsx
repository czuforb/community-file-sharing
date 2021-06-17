import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  GridItem,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import AddNewCategoryForm from "../Forms/AddNewCategoryForm";

const NewSubCategoryCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <GridItem
        colSpan={4}
        h="327px"
        borderRadius="10px"
        border="2px  grey"
        borderStyle="dashed"
        as="button"
        onClick={onOpen}
      >
        <Flex
          h="100%"
          flexDirection="column"
          p="4"
          justifyContent="center"
          alignItems="center"
        >
          <AddIcon
            w={16}
            h={16}
            bg="gray.300"
            color="gray.600"
            p="2"
            borderRadius="full"
            mb="4"
          />
          <Heading as="h4" size="md">
            Új kategória hozzáadása
          </Heading>
        </Flex>
      </GridItem>
      <AddNewCategoryModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default NewSubCategoryCard;

const AddNewCategoryModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Új kategória hozzáadása:</ModalHeader>
          <AddNewCategoryForm onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};
