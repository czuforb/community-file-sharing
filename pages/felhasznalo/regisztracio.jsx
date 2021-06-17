import React from "react";
// Next.js
import { useRouter } from "next/router";

// Page components
import Layout from "../../src/components/Layout/Layout";
import FormContainer from "../../src/components/Forms/FormContainer";
import RegisterForm from "../../src/components/Forms/RegisterForm";

const LoginPage = () => {
  return (
    <Layout title="Regisztráció">
      <FormContainer>
        <RegisterForm />
      </FormContainer>
    </Layout>
  );
};

export default LoginPage;
