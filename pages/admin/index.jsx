import {
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import UsersAdminTab from "../../src/components/Admin/Users";
import DocumentsAdminTab from "../../src/components/Admin/Documents";
import AnnuncementsAdminTab from "../../src/components/Admin/Annuncements";
import Layout from "../../src/components/Layout/Layout";
import cookies from "next-cookies";
import { useReactiveVar } from "@apollo/client";
import { authVar } from "../../src/graphql/client/cache";
import { useRouter } from "next/router";

const AdminPage = () => {
  const auth = useReactiveVar(authVar);
  const router = useRouter();

  useEffect(() => {
    if (!auth.admin) {
      router.push("/", "/");
    }
  }, []);
  return (
    <>
      <Layout title="Admin">
        <GridItem
          colSpan={12}
          borderRadius="10px"
          overflow="hidden"
          boxShadow="sm"
        >
          <Tabs bg="white" p="4">
            <TabList>
              <Tab>Felhasználók</Tab>
              <Tab>Dokumentumok</Tab>
              <Tab>Partnerségi felhívások</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <UsersAdminTab />
              </TabPanel>

              <TabPanel>
                <DocumentsAdminTab />
              </TabPanel>
              <TabPanel>
                <AnnuncementsAdminTab />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  const c = cookies(context);
  if (!c.toosz) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default AdminPage;
