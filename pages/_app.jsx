import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Fonts from "../src/components/Styling/Fonts";
import apolloClient from "../src/graphql/client";
import { ApolloProvider } from "@apollo/client";

const toosz = extendTheme({
  fonts: {
    heading: "Space Grotesk",
    body: "Poppins",
  },
  colors: {
    tooszMisc: {
      100: "#f9f9f9",
      200: "#0426bf",
      300: "#f1f1f1",
      400: "#8BA64D",
    },
    tooszRed: {
      100: "#EB5D54",
      200: "#D14038",
      300: "#B92F28",
      400: "#A01913",
    },
    tooszGreen: {
      100: "#3A7979",
      200: "#235D5D",
      300: "#104949",
      400: "#033C3C",
    },
    tooszPurple: {
      100: "#6662B4",
      200: "#4B4597",
      300: "#3A347E",
      400: "#2F296E",
    },

    tooszBrown: {
      100: "#3ba0bc",
      200: "#1D81A2",
      300: "#06698D",
      400: "#055878",
    },
    tooszButton: {
      100: "#cec4f2",
      200: "#ad9cea",
      300: "#2b2cc6",
      500: "#0426BF",
      600: "#001ab4",
      700: "#0426BF",
      800: "#001ab4",
      900: "#001ab4",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={toosz}>
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
