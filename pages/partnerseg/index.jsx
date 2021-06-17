import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { GridItem, Heading, Text } from "@chakra-ui/layout";
import ACard from "../../src/components/Cards/AnnuncementCard";
import AnnuncementForm from "../../src/components/Forms/AnnuncementForm";
import FormContainer from "../../src/components/Forms/FormContainer";
import Layout from "../../src/components/Layout/Layout";
import { authVar } from "../../src/graphql/client/cache";

const AnnuncementsPage = () => {
  const { loading, data } = useQuery(GET_ALL_PUBLISHED_ANNUNCEMENTS);
  const auth = useReactiveVar(authVar);
  return (
    <Layout title="Partnerség">
      <GridItem colSpan={12}>
        <Heading as="h1" fontWeight="bold" size="2xl" mb="2" pt="2">
          Partnerség
        </Heading>

        <Text fontSize="md" w="70%" lineHeight="1.6">
          Közösségi partnerkereső felület, amely segíti a kooperációt és
          együttműködési projektek megszületését a települések között.
        </Text>
      </GridItem>
      <FormContainer full>
        <AnnuncementForm auth={auth} />
      </FormContainer>

      {data &&
        data.getAnnuncements &&
        data.getAnnuncements.map((e, i) => (
          <ACard key={i} data={e} loading={loading} />
        ))}
    </Layout>
  );
};
export default AnnuncementsPage;

const GET_ALL_PUBLISHED_ANNUNCEMENTS = gql`
  query GET_ALL_PUBLISHED_ANNUNCEMENTS {
    getAnnuncements(published: true) {
      org
      title
      updated
      owner
      description
      published
      contact
    }
  }
`;
