import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

const NotActivatedModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Kedves Felhasználó!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            A felhasználói fiókja jelenleg még nem került aktiválásra.
            Amennyiben szeretne hamarabb hozzáférni a felületünkhöz, kérjük
            vegye fel a kapcsolatot.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Bezárás
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NotActivatedModal;
