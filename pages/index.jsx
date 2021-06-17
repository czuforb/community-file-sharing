import { gql, useQuery } from '@apollo/client'
import { Divider, GridItem, Heading, Text } from '@chakra-ui/react'
import Layout from '../src/components/Layout/Layout'
import { default as Card } from '../src/components/Cards/IndexMainCategoryCard'
import DocumentCard from '../src/components/Cards/DocumentCard'
import { CalendarIcon, LinkIcon, SearchIcon, StarIcon, PhoneIcon } from '@chakra-ui/icons'
import IndexDocumentCard from '../src/components/Cards/IndexMainDocCard'

const CategoryPage = () => {
  const { data, loading } = useQuery(GET_LAST_IN_CATEGORY)

  return (
    <Layout logo hero>
      <Card
        bg="tooszRed.200"
        color="white"
        title="Tudásprogramok"
        description="Korábbi online és offline konferenciák, workshopok, programok felvételei, aktuális tudásprogramok időpontjai."
        category="tudasprogramok"
        icon={<CalendarIcon w="50%" h="50%" />}
      />
      <Card
        bg="tooszGreen.200"
        color="white"
        title="Tudástár"
        description="Az önkormányzatisággal kapcsolatos tanulmányok, fejlesztési dokumentumok, kutatási eredmények, településfejlesztési eszközök, módszertanok kategorizált gyűjteménye."
        category="tudastar"
        icon={<SearchIcon w="50%" h="50%" />}
      />
      <Card
        bg="tooszPurple.200"
        color="white"
        title="Jó gyakorlatok"
        description="Megvalósult jó gyakorlatok bemutatása a Legjobb Önkormányzati Gyakorlatok, és különböző nemzetközi példák alapján."
        category="jo-gyakorlatok"
        icon={<StarIcon w="50%" h="50%" />}
      />
      <Card
        bg="tooszBrown.200"
        color="white"
        title="Hálózatok"
        description="A TÖOSZ kiemelt programjai köré szerveződő közösségek."
        category="halozatok"
        icon={<LinkIcon w="50%" h="50%" />}
      />
      <Card
        bg="#8BA64D"
        color="white"
        title="Partnerség"
        description="Közösségi partnerkereső felület, amely segíti a kooperációt és együttműködési projekteket."
        category="partnerseg"
        icon={<PhoneIcon w="50%" h="50%" />}
      />
      {/* columns={[4, null, 8, 12]} */}
      <GridItem colSpan={[4, null, 8, 12]} my="8">
        <Heading pb="4">Legfrisseb tudásprogramok:</Heading>
        <Divider />
      </GridItem>
      {data && data.getLastInCategory.map((e, i) => <IndexDocumentCard key={i} loading={loading} data={e} />)}
    </Layout>
  )
}

export default CategoryPage

const GET_LAST_IN_CATEGORY = gql`
  query GET_LAST_IN_CATEGORY {
    getLastInCategory(category: "tudasprogramok") {
      title
      description
      type
      uri
      author
    }
  }
`
