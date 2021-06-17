import {
  Button,
  ButtonGroup,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Link as Linking,
  Spacer,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { authVar } from "../../../src/graphql/client/cache";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { useMediaQuery } from "@chakra-ui/react";
import Logo from "./Logo/Logo";
const GET_USER_LOGIN = gql`
  query GET_USER_LOGIN($token: String!) {
    getUserLogin(token: $token) {
      name
      admin
    }
  }
`;

const Navigation = () => {
  const [isSmallerThan900] = useMediaQuery(["(max-width: 900px)"]);

  const ck = Cookie;
  const router = useRouter();
  const auth = useReactiveVar(authVar);
  const cookie = ck.get("toosz");
  const { data: user } = useQuery(GET_USER_LOGIN, {
    variables: {
      token: cookie,
    },
  });

  user && authVar(user.getUserLogin);
  const logOut = () => {
    ck.remove("toosz", {
      path: router.pathname,
    });
    authVar({});
    router.push("/", "/");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="nav"
      w="100%"
      alignItems="start"
      alignItems="center"
      pos="relative"
    >
      <Logo />
      {isSmallerThan900 ? (
        <>
          <Spacer />
          <Button ml="auto" variant="outline" size="lg" onClick={onOpen}>
            <HamburgerIcon />
          </Button>
          <Drawer size="lg" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">
                  <Center w="100%">
                    <Logo />
                  </Center>
                </DrawerHeader>
                <DrawerBody>
                  <VStack spacing="26px" py="8">
                    <Link fontSize="18px" href="/tudasprogramok">
                      <Linking fontWeight="700">Tudásprogramok</Linking>
                    </Link>
                    <Link fontSize="18px" href="/tudastar">
                      <Linking fontWeight="700">Tudástár</Linking>
                    </Link>
                    <Link fontSize="18px" href="/jo-gyakorlatok">
                      <Linking fontWeight="700">Jó gyakorlatok</Linking>
                    </Link>
                    <Link fontSize="18px" href="/halozatok">
                      <Linking fontWeight="700">Hálózatok</Linking>
                    </Link>
                    <Link fontSize="18px" href="/partnerseg">
                      <Linking fontWeight="700">Partnerség</Linking>
                    </Link>
                    <Divider orientation="vertical" />
                    <ButtonGroup>
                      {auth.name ? (
                        <UserMobile role={auth} logout={logOut} />
                      ) : (
                        <NoUserMobile />
                      )}
                    </ButtonGroup>
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </>
      ) : (
        <>
          <Spacer />
          <HStack spacing="24px">
            <Link fontSize="18px" href="/tudasprogramok">
              <Linking fontWeight="700">Tudásprogramok</Linking>
            </Link>
            <Link fontSize="18px" href="/tudastar">
              <Linking fontWeight="700">Tudástár</Linking>
            </Link>
            <Link fontSize="18px" href="/jo-gyakorlatok">
              <Linking fontWeight="700">Jó gyakorlatok</Linking>
            </Link>
            <Link fontSize="18px" href="/halozatok">
              <Linking fontWeight="700">Hálózatok</Linking>
            </Link>
            <Link fontSize="18px" href="/partnerseg">
              <Linking fontWeight="700">Partnerség</Linking>
            </Link>
          </HStack>
          <ButtonGroup ml="4">
            {auth.name ? <User role={auth} logout={logOut} /> : <NoUser />}
          </ButtonGroup>
        </>
      )}
    </Flex>
  );
};

export default Navigation;

const NoUser = () => {
  return (
    <HStack h="auto" spacing="2">
      <Link href="/felhasznalo/bejelentkezes" passHref>
        <Button as="a" colorScheme="tooszButton" size="sm" variant="outline">
          Bejelentkezés
        </Button>
      </Link>
      <Link href="/felhasznalo/regisztracio">
        <Button as="a" colorScheme="tooszButton" size="sm" variant="solid">
          Regisztráció
        </Button>
      </Link>
    </HStack>
  );
};

const User = ({ role, logout }) => {
  return (
    <Flex>
      <Button
        onClick={() => logout()}
        colorScheme="tooszButton"
        size="sm"
        variant="outline"
      >
        Kijelentkezés
      </Button>

      {role.admin ? (
        <Link
          href={{
            pathname: "/admin",
          }}
          passHref
        >
          <Button as="a" colorScheme="tooszButton" size="sm" variant="solid">
            <SettingsIcon />
          </Button>
        </Link>
      ) : null}
    </Flex>
  );
};

const NoUserMobile = () => {
  return (
    <VStack spacing="24px">
      <Link href="/felhasznalo/bejelentkezes" passHref>
        <Button colorScheme="tooszButton" size="md" variant="outline">
          Bejelentkezés
        </Button>
      </Link>
      <Link href="/felhasznalo/regisztracio">
        <Button colorScheme="tooszButton" size="md" variant="solid">
          Regisztráció
        </Button>
      </Link>
    </VStack>
  );
};

const UserMobile = ({ role, logout }) => {
  return (
    <VStack direction="column" spacing="24px">
      <Button
        onClick={() => logout()}
        colorScheme="tooszButton"
        size="md"
        variant="outline"
      >
        Kijelentkezés
      </Button>

      {role.admin ? (
        <Link
          href={{
            pathname: "/admin",
          }}
          passHref
        >
          <Button
            as="a"
            colorScheme="tooszButton"
            size="md"
            variant="solid"
            rightIcon={<SettingsIcon />}
          >
            Admin
          </Button>
        </Link>
      ) : null}
    </VStack>
  );
};
