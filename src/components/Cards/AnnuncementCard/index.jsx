import { useReactiveVar } from "@apollo/client";
import {
  Box,
  Flex,
  GridItem,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import dateFormat from "dateformat";
import React from "react";
import { authVar } from "../../../graphql/client/cache";
import DeleteAnnuncementActionButton from "../../Admin/Annuncements/DeleteAnnuncementActionButton";
const ACard = ({ data }) => {
  const auth = useReactiveVar(authVar);

  return (
    <GridItem
      colSpan={12}
      bg="white"
      boxShadow="md"
      borderRadius="10"
      borderRadius="10px"
      overflow="hidden"
    >
      <Stack
        h="100%"
        flexDirection={["column-reverse", null, "row"]}
        pos="relative"
      >
        <Flex
          direction="column"
          w="70%"
          h="100%"
          //minH="150px"
          justify="flex-end"
          align="start"
          p="4"
        >
          <Heading as="h3" size="md" mb="4">
            {data.title}
          </Heading>
          <Text as="h3" size="sm" mb="6" color="gray.600" w="100%">
            {data.org}
          </Text>

          <Text w="80%">{data.description}</Text>
        </Flex>
        <StackDivider />
        <VStack w="30%" h="100%" alignItems="flex-start" p="4">
          <Heading as="h4" size="sm" color="gray.600">
            {data.owner}
          </Heading>
          <Text fontSize="sm" color="gray.800">
            {dateFormat(data.created, "mediumDate")}
          </Text>
          <Text fontSize="sm" color="gray.800">
            {data.contact}
          </Text>
        </VStack>
        {auth.admin && (
          <Box pos="absolute" top="4" right="4">
            <DeleteAnnuncementActionButton title={data.title} />
          </Box>
        )}
      </Stack>
    </GridItem>
  );
};

export default ACard;
