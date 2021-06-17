import { Heading, HStack } from "@chakra-ui/layout";
import React from "react";
import {
  AlbumsSharp,
  BarChartSharp,
  DocumentSharp,
  ImageSharp,
  LinkSharp,
  PlayCircleSharp,
} from "react-ionicons";

const DocumentTypeTag = ({ docType }) => {
  switch (docType) {
    case "presentation":
      return (
        <HStack>
          <AlbumsSharp color="#00A3C4" height="1.75rem" width="1.75rem" />
          <Heading as="h4" size="sm" color="#00A3C4">
            Prezentáció
          </Heading>
        </HStack>
      );
    case "video":
      return (
        <HStack>
          <PlayCircleSharp color="#E53E3E" height="1.75rem" width="1.75rem" />
          <Heading as="h4" size="sm" color="#E53E3E">
            Videó
          </Heading>
        </HStack>
      );
    case "document":
      return (
        <HStack>
          <DocumentSharp color="#7B61FF" height="1.75rem" width="1.75rem" />
          <Heading as="h4" size="sm" color="#7B61FF">
            Dokumentum
          </Heading>
        </HStack>
      );
    case "image":
      return (
        <HStack>
          <ImageSharp color="#ED64A6" height="1.75rem" width="1.75rem" />
          <Heading as="h4" size="sm" color="#ED64A6">
            Kép
          </Heading>
        </HStack>
      );
    case "sheet":
      return (
        <HStack>
          <BarChartSharp color="#38A169" height="1.75rem" width="1.75rem" />
          <Heading as="h4" size="sm" color="#38A169">
            Táblázat
          </Heading>
        </HStack>
      );
    case "external":
      return (
        <HStack>
          <LinkSharp color="#DD6B20" height="1.75rem" width="1.75rem" />
          <Heading as="h4" size="xs" color="#DD6B20">
            Külsős hivatkozás
          </Heading>
        </HStack>
      );
    default:
      return null;
  }
};

export default DocumentTypeTag;
