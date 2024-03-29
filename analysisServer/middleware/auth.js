const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    if (token === 'null') {
      return res.status(403).send({ message: 'Unauthorized request' });
    }
    //verify the request token and extract the user id from it
    const vref = await jwt.verify(token, process.env.JWT_SECRET);
    req.auth = vref;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Unauthorized request' });
  }
};

module.exports = {
  verifyToken: verifyToken,
};
