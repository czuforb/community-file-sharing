import { useReactiveVar } from "@apollo/client";
import { ArrowUpIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Flex,
  GridItem,
  HStack,
  Input,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { authVar } from "../../graphql/client/cache";

const ActionsBar = () => {
  const auth = useReactiveVar(authVar);
  const [search, setSearch] = useState("");
  const handleChange = (event) => setSearch(event.target.value);
  const router = useRouter();
  const queries = router.asPath.split("/");
  return (
    <GridItem colSpan={[4, null, 8, 12]}>
      <Flex w="100%" p="0" direction={["col", null, null, "row"]}>
        <HStack spacing="4" w={["100%", null, null, "50%"]}>
          <Input
            value={search}
            onChange={handleChange}
            placeholder="Keresés"
            size="md"
            bg="white"
          />
          <Link
            href={{
              pathname: "/kereses",
              query: { keyword: search },
            }}
          >
            <Button as="a" colorScheme="tooszButton" size="md">
              Keresés
            </Button>
          </Link>
        </HStack>
        {auth.name && (
          <Button
            leftIcon={<ArrowUpIcon />}
            colorScheme="tooszButton"
            marginLeft="auto"
            variant="outline"
            size="md"
            onClick={() => {
              router.push({
                path: "/dokumentum/feltoltes",
                pathname: "/dokumentum/feltoltes",
                query: {
                  category: queries[1],
                  subcategory: queries[2],
                },
              });
            }}
          >
            Feltöltés
          </Button>
        )}
      </Flex>
      <Divider py="2" />
    </GridItem>
  );
};

export default ActionsBar;
