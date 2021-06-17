import { GridItem } from "@chakra-ui/react";
import React from "react";

const FormContainer = ({ children, full }) => {
  return (
    <GridItem
      colStart={full ? 0 : [0, null, 2, 4]}
      colSpan={full ? 12 : 6}
      bg="white"
      mt="6"
      overflow="hidden"
      borderRadius="lg"
      boxShadow="md"
    >
      {children}
    </GridItem>
  );
};

export default FormContainer;
