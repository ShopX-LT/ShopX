//   REFRESH TOKEN FUNCTION
const setRefreshToken = (tokenizer, verification, res) => {
  let token;
  token = tokenizer.sign(verification, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' });
  res.cookie('refreshToken', token, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
};

// VERIFY REFRESH TOKEN
const verifyRefreshToken = (tokenizer, admin, refreshToken) => {
  const details = tokenizer.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  // encure the admin requesting for a new token is the same as the owner of rhe refresh token
  if (admin.email !== details.admin) {
    throw new Error('Unauthorized Access');
  }
  return details;
};

const generateTokensInteractor = ({ tokenizer }, { adminEmail, storeName, res }) => {
  //   ACCESS TOKEN
  const verification = {
    admin: adminEmail,
    store: storeName,
  };
  const token = tokenizer.sign(verification, process.env.JWT_SECRET, { expiresIn: '15m' });

  //   REFRESH TOKEN
  setRefreshToken(verification, res);
  return token;
};

const adminRefreshTokenInteractor = async ({ getUserByAdminToken }, { tokenizer, cookies }) => {
  const refreshToken = cookies?.refreshToken;
  if (!refreshToken) {
    throw new Error('Refresh token error');
  }
  const admin = await getUserByAdminToken({ adminRefreshToken: refreshToken });
  if (!admin) {
    throw new Error('Invalid token');
  }

  const cookieDetails = verifyRefreshToken(tokenizer, admin, refreshToken);
  //create the new token
  const verification = {
    admin: cookieDetails.admin,
    store: cookieDetails.store,
  };
  const token = tokenizer.sign(verification, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });
  return token;
};

const logoutInteractor = async ({ getUserByAdminToken }, { cookies, res }) => {
  const refreshToken = cookies?.refreshToken;
  // if there is no refresh token just return
  if (!refreshToken) return;

  const admin = await getUserByAdminToken({ adminRefreshToken: refreshToken });

  // remove refresh token form the db
  if (admin) {
    admin.adminRefreshToken = '';
  }
  // clear the cookie
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
  });

  return;
};

module.exports = {
  generateTokensInteractor,
  adminRefreshTokenInteractor,
  logoutInteractor,
  logoutInteractor,
};
