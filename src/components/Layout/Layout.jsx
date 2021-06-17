import React from "react";
import { Box, Center, Container, SimpleGrid } from "@chakra-ui/react";
import Head from "next/head";
import Hero from "./Hero";
import Footer from "./Footer";
import Navigation from "./Navigation";
import LogoContainer from "./Logo/LogoContainer";

const Layout = ({ children, hero, title, logo }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{title && `${title} |`} TOÖSZ Önkormányzati Tudásbázis</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Box bg="tooszMisc.300" as="main" pos="relative" overflowX="none">
        <Box bg="tooszMisc.100" boxShadow="md">
          <Container maxWidth="1170px">
            <Navigation />
          </Container>
        </Box>
        {hero && <Hero />}
        <Container maxWidth="1170px" minH="70vh">
          <SimpleGrid
            columns={[4, null, 8, 12]}
            spacing="24px"
            w="100%"
            pb="12"
            pt="8"
          >
            {children}
          </SimpleGrid>
        </Container>

        {logo && <LogoContainer />}
        <Box bg="gray.900">
          <Container maxWidth="1170px">
            <Center>
              <Footer />
            </Center>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
