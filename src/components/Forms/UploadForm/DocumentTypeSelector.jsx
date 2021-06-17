import { Box, HStack } from "@chakra-ui/layout";
import { useRadio, useRadioGroup } from "@chakra-ui/radio";
import { Field } from "formik";
import React from "react";
import DocumentTypeTag from "../../Cards/DocumentCard/DocumentTypeTag";

const DocumentTypeSelector = ({ setFieldValue, field, form }) => {
  const options = [
    "external",
    "video",
    "presentation",
    "document",
    "image",
    "sheet",
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "documentType",
    defaultValue: "",
    onChange: (e) => form.setFieldValue("documentType", e),
  });
  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return <RadioCard key={value} {...radio} type={value} />;
      })}
    </HStack>
  );
};

export default DocumentTypeSelector;

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="sm"
        _checked={{
          boxShadow: "md",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        <DocumentTypeTag docType={props.type} />
      </Box>
    </Box>
  );
}
