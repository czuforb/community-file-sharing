import { gql, useMutation } from "@apollo/client";
import { LockIcon, UnlockIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Tag,
  TagLabel,
  TagLeftIcon,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import DeleteAnnuncementActionButton from "./DeleteAnnuncementActionButton";

const DocumentTableRow = ({ data }) => {
  const { title, published, owner, contact } = data;
  const [toggleAnnuncement] = useMutation(TOGGLE_ANNUNCEMENT);

  const toggleApproval = () => {
    toggleAnnuncement({
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
        publish: !published,
      },
    });
  };
  return (
    <Tr>
      <Td>{title}</Td>
      <Td>{owner}</Td>
      <Td>{contact}</Td>

      <Td>{published ? <Active /> : <InActive />}</Td>

      <Td>
        <ButtonGroup pos="relative" w="100%">
          {!published ? (
            <Button
              w="100px"
              colorScheme="green"
              variant="outline"
              size="sm"
              onClick={() => toggleApproval()}
            >
              Jóváhagy
            </Button>
          ) : (
            <Button
              w="100px"
              colorScheme="red"
              variant="outline"
              size="sm"
              onClick={() => toggleApproval()}
            >
              Elutasít
            </Button>
          )}
          <DeleteAnnuncementActionButton title={title} />
        </ButtonGroup>
      </Td>
    </Tr>
  );
};

const Active = () => {
  return (
    <Tag size="md" key="md" variant="subtle" colorScheme="green">
      <TagLeftIcon boxSize="12px" as={UnlockIcon} />
      <TagLabel>Aktív</TagLabel>
    </Tag>
  );
};
const InActive = () => {
  return (
    <Tag size="md" key="md" variant="subtle" colorScheme="red">
      <TagLeftIcon boxSize="12px" as={LockIcon} />
      <TagLabel>Inaktív</TagLabel>
    </Tag>
  );
};

export default DocumentTableRow;

const TOGGLE_ANNUNCEMENT = gql`
  mutation($title: String, $publish: Boolean) {
    toggleAnnuncement(title: $title, publish: $publish) {
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
