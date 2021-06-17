import React from "react";
// Next.js
import { useRouter } from "next/router";

// Page components
import Layout from "../../src/components/Layout/Layout";
import FormContainer from "../../src/components/Forms/FormContainer";
import RequestPasswordResetForm from "../../src/components/Forms/RequestPasswordResetForm";
const PasswordChange = () => {
  return (
    <Layout title="Jelszómodosítás">
      <FormContainer>
        <RequestPasswordResetForm />
      </FormContainer>
    </Layout>
  );
};

export default PasswordChange;
