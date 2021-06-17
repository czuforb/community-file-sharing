import React from "react";
import FormContainer from "../../src/components/Forms/FormContainer";
import DocumentUploadForm from "../../src/components/Forms/UploadForm";
import Layout from "../../src/components/Layout/Layout";
const index = () => {
  return (
    <Layout title="Feltöltés">
      <FormContainer full>
        <DocumentUploadForm />
      </FormContainer>
    </Layout>
  );
};

export default index;
