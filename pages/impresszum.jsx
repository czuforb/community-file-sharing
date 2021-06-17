import { GridItem, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import Layout from "../src/components/Layout/Layout";

const Impressum = () => {
  return (
    <Layout logo>
      <GridItem colStart={[0, null, 2, 4]} colSpan={[4, null, 4, 6]}>
        <Heading mb="8">Impresszum</Heading>
        <Text lineHeight="8">
          <strong>Települési Önkormányzatok Országos Szövetsége</strong>
          <br />
          1071 Budapest, Damjanich u. 44. <br />
          Tel.: +36 1 321 24 96, +36 1 322 74 07
          <br />
          e-mail: <a href="mailto:toosz@toosz.hu">toosz@toosz.hu</a>
        </Text>
      </GridItem>
    </Layout>
  );
};

export default Impressum;
