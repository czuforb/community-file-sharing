import {
  Divider,
  Flex,
  GridItem,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import dateFormat from "dateformat";
import DocumentTypeTag from "./DocumentTypeTag";
import DownloadButton from "../../Buttons/DownloadButton";

const DocumentCard = ({ data }) => {
  return (
    <GridItem
      colSpan={12}
      bg="white"
      boxShadow="md"
      borderRadius="10"
      borderRadius="10px"
      overflow="hidden"
    >
      <HStack h="100%" flexDirection={["column", "row"]} p="4">
        <Flex
          direction="column"
          align="start"
          w={["100%", "70%"]}
          h="100%"
          minH="100px"
          pt="4"
        >
          <HStack h="8" align="center">
            <DocumentTypeTag docType={data.type} />
            <Heading size="md" as="h2" fontStyle="regular">
              {data.subcategory}
            </Heading>
          </HStack>
          <Heading as="h2" size="lg" mb={4}>
            {data.title}
          </Heading>
          <Text maxWidth="100%" height="auto">
            {data.description}
          </Text>
        </Flex>
        <Divider display={["none", "block"]} orientation={"vertical"} pl="2" />
        <VStack
          w={["100%", "30%"]}
          h="100%"
          alignItems="flex-start"
          pos="relative"
        >
          <Flex direction="column" display={["none", "block"]}>
            <Text>{dateFormat(data.created, "longDate")}</Text>
            <Heading size="md">{data.author}</Heading>
          </Flex>
          <Spacer />
          <Flex justifyContent="start" w="100%">
            <DownloadButton
              display={["none", "block"]}
              uri={data.uri}
              type={data.type}
            />
          </Flex>
        </VStack>
      </HStack>
    </GridItem>
  );
};

export default DocumentCard;
