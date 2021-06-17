import {
  Box,
  Heading,
  Table,
  TableCaption,
  TabPanel,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import DocumentTableRow from "./DocumentTableRow";

const DocumentsAdminTab = () => {
  const { loading, error, data } = useQuery(GET_ALL_DOCUMENTS);
  return (
    <Box w="100%">
      <Heading size="md" py="8">
        Dokumentumok kezelése
      </Heading>
      <Table w="100%" bg="gray.100" overflow="hidden" borderRadius="10px">
        <Thead bg="gray.200">
          <Tr>
            <Th fontSize="md">Név</Th>
            <Th fontSize="md">Feltöltő</Th>
            <Th fontSize="md">Tipus</Th>
            <Th fontSize="md">Státusz</Th>
            <Th fontSize="md">Műveletek</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.getDocuments &&
            data.getDocuments.map((e, i) => (
              <DocumentTableRow data={e} key={i} />
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default DocumentsAdminTab;

const GET_ALL_DOCUMENTS = gql`
  query {
    getDocuments {
      author
      title
      public
      published
      created
      type
      uri
      category
      subcategory
    }
  }
`;
