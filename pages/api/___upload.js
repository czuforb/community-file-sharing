// USE MINIO INSTEAD

// import formidable from 'formidable'
// import fs from 'fs'
// import sanitize from 'sanitize-filename'
// import { parse } from '@tinyhttp/cookie'
// import NextCors from 'nextjs-cors'

// export const config = {
//   api: {
//     bodyParser: false,
//     externalResolver: true
//   }
// }

// export default async (req, res) => {
//   await NextCors(req, res, {
//     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//     origin: '*',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   })

//   const c = parse(req.headers.cookie)
//   if (c.toosz) {
//     const form = new formidable.IncomingForm()
//     form.uploadDir = `./public/uploads/`
//     form.parse(req, (err, fields, files) => {
//       const filename = sanitize(files.file.name)
//       fs.rename(files.file.path, `${form.uploadDir}/${filename}`, () => {
//         res.status(200).json({ file: files.file.name, path: form.uploadDir })
//       })
//     })
//   } else {
//     return res.status(403).end()
//   }
// }
