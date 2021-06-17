import {
  Box,
  Button,
  Container,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { getDomainLocale } from "next/dist/next-server/lib/router/router";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <>
      <Flex
        w="100%"
        minH="500px"
        maxH="700px"
        backgroundImage="url('/herobg2.png')"
        bgSize="cover"
        zIndex="0"
        align="center"
      >
        <Container maxWidth="1172px" minWidth="414px" p={0}>
          <SimpleGrid
            columns={[2, 4, null, 6, 12]}
            spacing="68px"
            w="100%"
            p="4"
          >
            <GridItem
              colSpan={[2, 4, 4, 4, 6]}
              colStart={[0, 0, 0, 1, 2]}
              bg="white"
              p="8"
            >
              <Heading as="h2" mb="2" size="xl">
                TÖOSZ <br />
                Önkormányzati tudásbázis
              </Heading>
              <Text>
                Egy közösségi tudásplatform a jó gyakorlatok megosztására,
                együttgondolkodásra és párbeszédek indítására.
              </Text>
              <Link href="/rolunk" passHref>
                <Button as="a" variant="link" mt="4">
                  Tudjon meg többet a TÖOSZ-ról
                </Button>
              </Link>
            </GridItem>
          </SimpleGrid>
        </Container>
      </Flex>
      <Box w="100%" bg="white">
        <Container maxW="container.xl" p="4" py="12">
          <Heading as="h3" size="lg" mb="6">
            Tanuljunk egymástól, és formáljuk együtt az önkormányzatiság
            jövőjét!
          </Heading>
          <Text maxW="64rem" lineHeight="7" fontSize="medium">
            Regisztráljon az Önkormányzati Tudásbázis platformunkra, ahol
            hozzáférhet önkormányzatisággal kapcsolatos programokhoz és
            dokumentumokhoz. A platform lehetőséget biztosít a Legjobb
            Önkormányzati Gyakorlatok megismerésére, közösségi dokumentumok
            feltöltésére és letöltésére, valamint partnerek keresésére.
            Regisztráljon, és részesüljön első kézből a folyamatosan bővülő
            tudásbázis előnyeiből!
          </Text>
        </Container>
      </Box>
    </>
  );
};

export default Hero;
