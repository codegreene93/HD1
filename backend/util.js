const jwt = require('jsonwebtoken')
const config = require('./config')


const getToken = (user) => {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin

  }, config.JWT_SECRET, {
    expiresIn: '48h'
  })
}

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      const onlyToken = token.slice(7, token.length);
      jwt.verify(onlyToken, config.JWT_SECRET)
      req.user = decode;
      next();
      return

    }
  } catch (err) {
    return res.status(401).send({
      msg: "Token is not supplied."
    });
  }
}

const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next()
    }
  } catch (err) {
    return res.status(401).send({
      msg: 'Admin Token is not valid.'
    })
  }

}

module.exports = {
  getToken,
  isAuth,
  isAdmin
}
