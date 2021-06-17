import { useReactiveVar } from "@apollo/client";
import {
  Box,
  Center,
  Flex,
  GridItem,
  Heading,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AccessibilitySharp,
  ConstructSharp,
  BookSharp,
  ChatboxEllipsesSharp,
  BulbSharp,
  SchoolSharp,
  MegaphoneSharp,
  InfiniteSharp,
  LibrarySharp,
  BusinessSharp,
  SearchSharp,
  ColorWandSharp,
  HeartSharp,
  PeopleSharp,
  FlashSharp,
  HappySharp,
  HandRightSharp,
  HomeSharp,
  EarthSharp,
  GitNetworkSharp,
  GitCompareSharp,
} from "react-ionicons";
import { authVar } from "../../../graphql/client/cache";
import DeleteSubCategoryButton from "../../Buttons/DeleteSubCategoryButton";
const CategoryCard = ({ loading, data, category }) => {
  const auth = useReactiveVar(authVar);

  const [color, setColor] = useState();
  const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const shade = [100, 200, 300, 400];
  useEffect(() => {
    if (category === "tudasprogramok") {
      setColor("tooszRed");
    }
    if (category === "tudastar") {
      setColor("tooszGreen");
    }
    if (category === "jo-gyakorlatok") {
      setColor("tooszPurple");
    }
    if (category === "halozatok") {
      setColor("tooszBrown");
    }
  }, [category]);

  return (
    <GridItem
      colSpan="4"
      w="100%"
      bg={`${color}.${shade[rand(0, 3)]}`}
      h="327px"
      boxShadow="md"
      borderRadius="10px"
      overflow="hidden"
      as="a"
      _hover={{ boxShadow: "lg" }}
    >
      <LinkBox w="100%" h="100%">
        <Skeleton h="100%" isLoaded={!loading}>
          <Flex
            h="100%"
            flexDirection="column"
            p="4"
            justify="end"
            color="white"
          >
            <Box w="100%" h="50%">
              {data.icon && (
                <Center w="100%" h="100%">
                  <CardIcon icon={data.icon} />
                </Center>
              )}
            </Box>
            <Box minH="50%">
              <Heading as="h2" w="100%" size="lg" mb={4}>
                <Link href={`${category}/${data.slug}`}>
                  <LinkOverlay>{data.title}</LinkOverlay>
                </Link>
              </Heading>
              <Text noOfLines="3">{data.description}</Text>
            </Box>
            {auth.admin && (
              <DeleteSubCategoryButton category={category} slug={data.slug} />
            )}
          </Flex>
        </Skeleton>
      </LinkBox>
    </GridItem>
  );
};

function CardIcon({ icon }) {
  const stuff = icon.toLowerCase();
  const CostumIcon = iconType[stuff];
  return <CostumIcon color="white" height="72px" width="72px" />;
}

export default CategoryCard;

const iconType = {
  accessibility: AccessibilitySharp,
  construct: ConstructSharp,
  book: BookSharp,
  chatboxellipses: ChatboxEllipsesSharp,
  bulb: BulbSharp,
  school: SchoolSharp,
  megaphone: MegaphoneSharp,
  infinite: InfiniteSharp,
  library: LibrarySharp,
  business: BusinessSharp,
  search: SearchSharp,
  colorwand: ColorWandSharp,
  heart: HeartSharp,
  people: PeopleSharp,
  flash: FlashSharp,
  happy: HappySharp,
  handright: HandRightSharp,
  home: HomeSharp,
  earth: EarthSharp,
  gitnetwork: GitNetworkSharp,
  gitcompare: GitCompareSharp,
};
