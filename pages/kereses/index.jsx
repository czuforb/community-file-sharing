import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import cookies from "next-cookies";
//
import Layout from "../../src/components/Layout/Layout";
import PageHeader from "../../src/components/Layout/PageHeader";
//
import DocumentCard from "../../src/components/Cards/DocumentCard/index";
import ActionsBar from "../../src/components/Layout/ActionsBar";

const SearchPage = () => {
  const router = useRouter();
  const { keyword } = router.query;

  const { loading, data } = useQuery(SEARCH_DOCUMENTS, {
    variables: {
      search: keyword,
    },
  });

  return (
    <Layout title={data && data.searchDocuments.title}>
      {data && data.searchDocuments && (
        <PageHeader
          data={data.searchDocuments}
          loading={loading}
          search={keyword}
        />
      )}
      <ActionsBar />
      {data &&
        data.searchDocuments &&
        data.searchDocuments.map((e, i) => (
          <DocumentCard key={i} loading={loading} data={e} />
        ))}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const c = cookies(context);

  if (!c.toosz) {
    return {
      redirect: {
        destination: "/felhasznalo/bejelentkezes",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default SearchPage;

const SEARCH_DOCUMENTS = gql`
  query SEARCH_DOCUMENTS($search: String) {
    searchDocuments(search: $search) {
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
`;
