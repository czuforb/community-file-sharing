import {
  Flex,
  GridItem,
  Heading,
  Text,
  LinkBox,
  LinkOverlay,
  Box,
  Center,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const IndexMainCategoryCard = ({
  title,
  description,
  category,
  bg,
  color,
  icon,
}) => {
  return (
    <GridItem
      _hover={{ boxShadow: "lg" }}
      colSpan="4"
      bg={bg}
      color={color}
      h="327px"
      boxShadow="md"
      borderRadius="10px"
      overflow="hidden"
    >
      <LinkBox w="100%" h="100%">
        <Flex h="100%" flexDirection="column" p="4" align="end">
          <Box w="100%" h="50%">
            {icon && (
              <Center w="100%" h="100%">
                {icon}
              </Center>
            )}
          </Box>
          <Heading as="h2" size="lg" mb={4}>
            <Link href={`/${category}`} passHref>
              <LinkOverlay>{title}</LinkOverlay>
            </Link>
          </Heading>
          <Text noOfLines="3">{description}</Text>
        </Flex>
      </LinkBox>
    </GridItem>
  );
};

export default IndexMainCategoryCard;
