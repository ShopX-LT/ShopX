const User = require('../models/User');

const handleLogout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) return res.sendStatus(204);
    const cookieRefreshToken = cookies.refreshToken;
    //verify a user has this token
    const admin = await User.findOne({ adminRefreshToken: cookieRefreshToken });
    if (!admin) {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: 'None',
        // secure: true,
      });
      return res.status(204).json({});
    }
    //cleare token
    admin.adminRefreshToken = '';

    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });
    res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = { handleLogout };
