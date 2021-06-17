import React from "react";
// Next.js
import { useRouter } from "next/router";

// Page components
import Layout from "../../src/components/Layout/Layout";
import FormContainer from "../../src/components/Forms/FormContainer";
import LoginForm from "../../src/components/Forms/LoginForm";

const LoginPage = () => {
  return (
    <Layout title="Bejelentkezés">
      <FormContainer>
        <LoginForm />
      </FormContainer>
    </Layout>
  );
};

export default LoginPage;
