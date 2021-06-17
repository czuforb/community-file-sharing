import {
  Flex,
  Heading,
  VStack,
  ListItem,
  Text,
  Link as Click,
  UnorderedList,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <Stack
      direction={["column-reverse", null, null, "row"]}
      as="footer"
      w="1170px"
      py="8"
      spacing="8"
    >
      <VStack spacing=".75rem" color="white" align="start" p="4">
        <Heading size="xs">
          Települési Önkormányzatok Országos Szövetsége
        </Heading>
        <Text>1071 Budapest, Damjanich u. 44.</Text>
        <Text>Tel.: +36 1 321 24 96, +36 1 322 74 07</Text>
        <Text>e-mail: toosz@toosz.hu</Text>
        <Spacer />
      </VStack>
      <Spacer />
      <Flex direction="column" alignItems="start" color="gray.100">
        <UnorderedList spacing="4" listStyleType="none">
          <ListItem>
            <Link href="/rolunk" passHref>
              <Click as="a">A TÖOSZ-ról</Click>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/in-english" passHref>
              <Click as="a">In english</Click>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/impresszum" passHref>
              <Click as="a">Impresszum</Click>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/altalanos-szerzodesi-feltelek" passHref>
              <Click as="a">Általános Szerződési Feltételek</Click>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/jogi-nyil" passHref>
              <Click as="a">Jogi nyilatkozat</Click>
            </Link>
          </ListItem>
        </UnorderedList>
      </Flex>
    </Stack>
  );
};

export default Footer;
