const jwt = require('jsonwebtoken');
const User = require('../models/User');
const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) return res.sendStatus(401);
    const cookieRefreshToken = cookies.refreshToken;
    //verify the user exists and has a refresh token
    const admin = await User.findOne({ adminRefreshToken: cookieRefreshToken });
    if (!admin)
      return res.status(400).json({
        message: 'Invalid token',
      });

    //verify the refresh token is valid
    try {
      const details = await jwt.verify(cookieRefreshToken, process.env.JWT_REFRESH_SECRET);

      // encure the admin requesting for a new token is the same as the owner of rhe refresh token
      if (admin.email !== details.admin) {
        return res.sendStatus(403);
      }
      //create the new token
      const verification = {
        admin: details.admin,
        store: details.store,
      };
      const token = jwt.sign(verification, process.env.JWT_SECRET, {
        expiresIn: '15m',
      });
      res.status(200).json({ token });
    } catch (error) {
      console.log('Invalid refresh token');
      return res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports = { handleRefreshToken };
