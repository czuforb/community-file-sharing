import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import cookies from "next-cookies";
//
import Layout from "../../src/components/Layout/Layout";
import PageHeader from "../../src/components/Layout/PageHeader";
//
import DocumentCard from "../../src/components/Cards/DocumentCard/index";
import ActionsBar from "../../src/components/Layout/ActionsBar";

const SubCategoryListing = () => {
  const router = useRouter();
  const { subcategory } = router.query;

  const { loading, data } = useQuery(GET_DOCUMENTS_IN_SUBCATEGORY, {
    variables: {
      slug: subcategory,
    },
  });

  return (
    <Layout title={data && data.listDocumentsInSubCategory.title}>
      {data && data.listDocumentsInSubCategory && (
        <PageHeader
          data={data.listDocumentsInSubCategory}
          loading={loading}
          update
        />
      )}
      <ActionsBar />
      {data &&
        data.listDocumentsInSubCategory &&
        data.listDocumentsInSubCategory.documents.map((e, i) => (
          <DocumentCard key={i} loading={loading} data={e} />
        ))}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const c = cookies(context);

  if (context.query.category !== "tudasprogramok") {
    if (!c.toosz) {
      return {
        redirect: {
          destination: "/felhasznalo/bejelentkezes",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default SubCategoryListing;

const GET_DOCUMENTS_IN_SUBCATEGORY = gql`
  query($slug: String) {
    listDocumentsInSubCategory(slug: $slug) {
      title
      description
      public
      slug
      documents {
        title
        description
        public
        published
        created
        updated
        type
        uri
        author
      }
    }
  }
`;
