import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

const InputField = ({
  fieldname,
  placeholder,
  label,
  type = "text",
  disabled,
}) => {
  return (
    <Field name={fieldname}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors[fieldname] && form.touched[fieldname]}
        >
          <FormLabel htmlFor={fieldname}>{label}</FormLabel>
          <Input
            w="90%"
            type={type}
            {...field}
            id={fieldname}
            placeholder={placeholder}
            isDisabled={disabled}
          />
          <FormErrorMessage>{form.errors[fieldname]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default InputField;
