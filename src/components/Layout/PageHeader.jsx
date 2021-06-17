import {
  Text,
  Heading,
  Button,
  GridItem,
  SkeletonText,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { gql, useReactiveVar } from "@apollo/client";
import { authVar } from "../../../src/graphql/client/cache";
import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import EditCategoryForm from "../Forms/EditCategoryForm";

const PageHeader = ({ data, loading, update, search }) => {
  const auth = useReactiveVar(authVar);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <GridItem colSpan={[4, null, 8, 12]}>
        <HStack mb="4" justify="space-between">
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.back()}
            colorScheme="tooszButton"
            leftIcon={<ArrowBackIcon />}
          >
            Vissza
          </Button>
          {auth.admin && update ? (
            <Button
              right="0"
              size="md"
              variant="solid"
              colorScheme="tooszButton"
              variant="outline"
              onClick={onOpen}
            >
              <EditIcon />
            </Button>
          ) : null}
        </HStack>
        <SkeletonText isLoaded={!loading}>
          <Heading as="h1" fontWeight="bold" size="2xl" mb="2" pt="2" w="100%">
            {search ? `Keresési találatok: "${search}"` : data.title}
          </Heading>
        </SkeletonText>
        <SkeletonText isLoaded={!loading}>
          {data && (
            <Text fontSize="md" w="70%" lineHeight="1.6">
              {data.description}
            </Text>
          )}
        </SkeletonText>
      </GridItem>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{data.title} kategória szerkesztése</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditCategoryForm slug={data.slug} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PageHeader;
