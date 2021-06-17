import { Box, Center, Flex, HStack, Wrap, WrapItem } from "@chakra-ui/layout";
import React from "react";
import LogoITM from "./LogoITM";
import LogoLOGY from "./LogoLOGY";
import { Text, Heading, Image } from "@chakra-ui/react";

const LogoContainer = () => {
  return (
    <Center w="100%" bg="gray.50" py="12">
      <Wrap spacing="30px" align="center" justify="center">
        <WrapItem w="450px" h="200px">
          <Image
            boxSize="100%"
            objectFit="fit"
            src="/logy.png"
            alt="Legyjobb Önkormányzati Gyakorlatok Programja"
          />
        </WrapItem>
        <WrapItem w="400px" h="auto">
          <Image
            boxSize="100%"
            objectFit="cover"
            src="/itm-negative.png"
            alt="Információs és Technológiai Minisztérium"
          />
        </WrapItem>
      </Wrap>
    </Center>
  );
};

export default LogoContainer;
