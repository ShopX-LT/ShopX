const TOKEN_EXPIRES_TIME = '15m';
const REFRESH_TOKEN_EXPIRES_TIME = '180m';

//   REFRESH TOKEN FUNCTION
const setRefreshToken = async (setAdminRefreshToken, tokenizer, verification, res) => {
  let token;
  token = tokenizer.sign(verification, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_TIME });
  res.cookie('refreshToken', token, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  await setAdminRefreshToken({ email: verification.admin, refreshToken: token });
};

// VERIFY REFRESH TOKEN
const verifyRefreshToken = (tokenizer, admin, refreshToken) => {
  try {
    const details = tokenizer.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    // console.log('details', details);
    // console.log('admin', admin);

    // encure the admin requesting for a new token is the same as the owner of rhe refresh token
    if (admin.email !== details.admin) {
      throw new Error('Unauthorized Access');
    }
    return details;
  } catch (error) {
    console.error(error);
    throw new Error('verifyRefreshToken: Refresh Token error');
  }
};

const generateTokensInteractor = async ({ setAdminRefreshToken }, { tokenizer }, { adminEmail, storeName, res }) => {
  //   ACCESS TOKEN
  const verification = {
    admin: adminEmail,
    store: storeName,
  };
  const token = tokenizer.sign(verification, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRES_TIME });

  //   REFRESH TOKEN
  await setRefreshToken(setAdminRefreshToken, tokenizer, verification, res);
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
  try {
    const cookieDetails = verifyRefreshToken(tokenizer, admin, refreshToken);
    //create the new token
    const verification = {
      admin: cookieDetails.admin,
      store: cookieDetails.store,
    };
    const token = tokenizer.sign(verification, process.env.JWT_SECRET, {
      expiresIn: TOKEN_EXPIRES_TIME,
    });

    return token;
  } catch (error) {
    console.error(error);
    throw new Error('adminRefreshTokenInteractor: Refresh Token error');
  }
};

const logoutInteractor = async ({ getUserByAdminToken, removeAdminRefreshToken }, { cookies, res }) => {
  const refreshToken = cookies?.refreshToken;
  // if there is no refresh token just return
  if (!refreshToken) return;

  await removeAdminRefreshToken({ refreshToken });
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
