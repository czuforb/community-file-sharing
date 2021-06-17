import AWS from "aws-sdk";

const getSignedS3UrlDownload = () => ({
  getSignedS3UrlDownload: async (_, { filename }) => {
    const s3 = new AWS.S3({
      // endpoint: new AWS.Endpoint('http://minio:9000'),
      endpoint: "https://toosztudasbazis.hu",
      accessKeyId: process.env.ACCESS_KEY,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      region: "eu-east-1",
      signatureCache: false,
      s3ForcePathStyle: true,
      signatureVersion: "v4",
      sslEnabled: true,
    });

    const url = s3.getSignedUrl("getObject", {
      Bucket: "toosz",
      Key: filename,
      //ContentType: filetype,
      Expires: 24 * 60,
    });
    // Magic here, fix SignatureDoesNotMatch error

    const goodurl = url.replace(
      "https://toosztudasbazis.hu/toosz/",
      "https://toosztudasbazis.hu/storage/toosz/"
    );

    return goodurl;
  },
});

export default getSignedS3UrlDownload;
