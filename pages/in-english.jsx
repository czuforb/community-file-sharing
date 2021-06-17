import { GridItem, Heading, Link, Text } from "@chakra-ui/layout";
import React from "react";
import Layout from "../src/components/Layout/Layout";

const English = () => {
  return (
    <Layout logo>
      {/* columns={[4, null, 8, 12]} */}
      <GridItem colStart={[0, null, 2, 4]} colSpan={[4, null, 4, 6]}>
        <Heading mb="8">National Association of Municipalities</Heading>
        <Text lineHeight="8">
          TÖOSZ Tudásbázis is a service maintained by National Association of
          Municipalities (TÖOSZ). The purpose of this website is to store and
          distribute know-how via documents and links, organized in a efficient
          manner. The uploaded files and data collected through the years as
          best practices and the videos capture on our events.
        </Text>
        <Text>
          For more information, please visit our{" "}
          <Link color="blue.500" href="http://www.toosz.hu/">
            main website.
          </Link>
        </Text>
      </GridItem>
    </Layout>
  );
};

export default English;
