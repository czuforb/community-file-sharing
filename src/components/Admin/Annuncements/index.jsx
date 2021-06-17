import { Box, Heading, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import AnnuncementTableRow from "./AnnuncementTableRow";

const AnnuncementsAdminTab = () => {
  const { data } = useQuery(GET_ALL_ANNUNCEMENTS);
  return (
    <Box w="100%">
      <Heading size="md" py="8">
        Partnerségi felhívások kezelése:
      </Heading>
      <Table w="100%" bg="gray.100" overflow="hidden" borderRadius="10px">
        <Thead bg="gray.200">
          <Tr>
            <Th fontSize="md">Felhívás címe</Th>
            <Th fontSize="md">Feladó</Th>
            <Th fontSize="md">Email</Th>
            <Th fontSize="md">Egyéb</Th>
            <Th fontSize="md">Műveletek</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.getAnnuncements &&
            data.getAnnuncements.map((e, i) => (
              <AnnuncementTableRow data={e} key={i} />
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AnnuncementsAdminTab;

const GET_ALL_ANNUNCEMENTS = gql`
  query GET_ALL_ANNUNCEMENTS {
    getAnnuncements {
      org
      owner
      title
      contact
      published
    }
  }
`;
