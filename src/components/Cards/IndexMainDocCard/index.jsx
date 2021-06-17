import { Divider, Flex, GridItem, Heading, HStack, Spacer, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import dateFormat from 'dateformat'
import DocumentTypeTag from '../DocumentCard/DocumentTypeTag'
import DownloadButton from '../../Buttons/DownloadButton'

const IndexDocumentCard = ({ data }) => {
  return (
    <GridItem colSpan={12} bg={'gray.50'} boxShadow="md" borderRadius="10" borderRadius="10px" overflow="hidden">
      <HStack h="100%" flexDirection="row" p="4">
        <Flex direction="column" align="start" w="70%" h="100%" minH="150px" pt="4">
          <DocumentTypeTag docType={data.type} />

          <Heading as="h2" size="lg" mb={4}>
            {data.title}
          </Heading>
          <Text>{data.description}</Text>
        </Flex>
        <Divider orientation="vertical" pl="2" />
        <VStack w="30%" h="100%" alignItems="flex-start">
          <Flex direction="column">
            <Text>{dateFormat(data.created, 'longDate')}</Text>
            <Heading size="md">{data.author}</Heading>
          </Flex>
          <Spacer />
          <Flex justify="flex-start" w="100%">
            <DownloadButton display={['none', 'block']} uri={data.uri} type={data.type} />
          </Flex>
        </VStack>
      </HStack>
    </GridItem>
  )
}

export default IndexDocumentCard
