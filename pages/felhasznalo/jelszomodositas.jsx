import React from "react";
// Next.js
import { useRouter } from "next/router";

// Page components
import Layout from "../../src/components/Layout/Layout";
import FormContainer from "../../src/components/Forms/FormContainer";
import PasswordResetForm from "../../src/components/Forms/PasswordResetForm";

const PasswordChange = () => {
  const router = useRouter();
  const { token } = router.query;

  return (
    <Layout title="Jelszómodosítás">
      <FormContainer>
        <PasswordResetForm token={token} />
      </FormContainer>
    </Layout>
  );
};

export default PasswordChange;
