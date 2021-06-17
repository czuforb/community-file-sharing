import { gql, useMutation } from "@apollo/client";
import {
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import DeleteUserActionButton from "./DeleteUserActionButton";
import dateFormat from "dateformat";
import { LockIcon, UnlockIcon } from "@chakra-ui/icons";

const UserTableRow = ({ data }) => {
  const { name, email, approved, org, role } = data;
  const [toggleUser] = useMutation(TOGGLE_USER);

  const toggleApproval = () => {
    toggleUser({
      refetchQueries: [
        {
          query: GET_ALL_USERS,
        },
      ],
      variables: {
        email: email,
        approval: !approved,
      },
    });
  };
  return (
    <Tr fontFamily="body" minW="140px">
      <Td px="4">
        <HStack spacing="2" align="start" justify="start" h="100%">
          <VStack align="start" spacing="2">
            <Heading size="sm">{name}</Heading>
            <Text fontSize="sm">{email}</Text>
          </VStack>
        </HStack>
      </Td>
      <Td>
        <VStack align="start" spacing="2" h="100%">
          <Heading size="sm" fontWeight="bold">
            {org}
          </Heading>
          <Text fontSize="sm">{role}</Text>
        </VStack>
      </Td>
      <Td>{dateFormat(data.created, "mediumDate")}</Td>
      <Td>
        <Tag>{approved ? <Active /> : <InActive />}</Tag>
      </Td>
      <Td>
        <ButtonGroup>
          {!approved ? (
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
          <DeleteUserActionButton email={email} name={name} />
        </ButtonGroup>
      </Td>
    </Tr>
  );
};

export default UserTableRow;

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

const TOGGLE_USER = gql`
  mutation($email: String, $approval: Boolean) {
    toggleUser(email: $email, approval: $approval) {
      name
      email
    }
  }
`;

const GET_ALL_USERS = gql`
  query {
    getUsers {
      email
      org
      role
      created
      name
      login
      approved
    }
  }
`;
