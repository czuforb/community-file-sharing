import jwt from 'jsonwebtoken'

const checkJWT = (req) => {
  try {
    const response = jwt.verify(req.headers.authorization, process.env.SIGN_TOKEN)
    return { u: response.n, r: response.a }
  } catch (err) {
    console.log(err)
  }
}

export default checkJWT
