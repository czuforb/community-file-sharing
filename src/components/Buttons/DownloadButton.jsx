import { gql, useMutation } from '@apollo/client'
import { Button } from '@chakra-ui/button'
import { DownloadIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import React from 'react'
import download from 'downloadjs'
const DownloadButton = ({ uri, type }) => {
  const [downloadUrl] = useMutation(GET_DOWNLOAD_URL)

  const startDownload = () => {
    downloadUrl({ variables: { filename: uri } }).then((e) => {
      const url = e.data.getSignedS3UrlDownload
      download(url)
    })
  }

  if (type === 'external' || type === 'video') {
    return (
      <Button as="a" leftIcon={<ExternalLinkIcon />} colorScheme="tooszButton" href={uri} target="_blank">
        Ugrás a linkre
      </Button>
    )
  }

  return (
    <Button leftIcon={<DownloadIcon />} colorScheme="tooszButton" onClick={startDownload}>
      Letöltés
    </Button>
  )
}

export default DownloadButton

const GET_DOWNLOAD_URL = gql`
  mutation GET_DOWNLOAD_URL($filename: String) {
    getSignedS3UrlDownload(filename: $filename)
  }
`
