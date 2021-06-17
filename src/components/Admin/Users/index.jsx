import { Box, Heading, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import UserTableRow from "./UserTableRow";
import { gql, useQuery } from "@apollo/client";

const UsersAdminTab = () => {
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  return (
    <>
      <Box w="100">
        <Heading size="md" py="8">
          Felhasználók kezelése
        </Heading>
        <Table w="100%" bg="gray.100" overflow="hidden" borderRadius="10px">
          <Thead bg="gray.200">
            <Tr>
              <Th fontSize="md">Felhasználó</Th>
              <Th w="25%" fontSize="md">
                Szervezet és tisztség
              </Th>
              <Th fontSize="md">Regisztrált</Th>
              <Th fontSize="md">Státusz</Th>
              <Th fontSize="md">Műveletek</Th>
            </Tr>
          </Thead>

          <Tbody>
            {data &&
              data.getUsers &&
              data.getUsers.map((e, i) => <UserTableRow data={e} key={i} />)}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default UsersAdminTab;

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
