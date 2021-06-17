import { GridItem, Skeleton } from "@chakra-ui/react";
import React from "react";

const LoadingSkeleton = ({ loading }) => {
  return (
    <GridItem colSpan={4} borderRadius="10px" overflow="hidden">
      <Skeleton isLoaded={!loading} w="100%" h="327px" />
    </GridItem>
  );
};

export default LoadingSkeleton;
