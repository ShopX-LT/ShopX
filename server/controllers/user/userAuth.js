const User = require('../../models/User');
const { createUser } = require('../utils/objectCreators');
const { formatUser } = require('../utils/formats');

const signUp = async (req, res) => {
  try {
    const { password, email } = req.body;
    console.log(`POST /user/signup ${email}`);
    //check if the user already has an account
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: 'Email already in use.' });
    }
    const newUser = createUser(email, password);
    const verification = {
      user: newUser.email,
    };

    const formattedUser = formatUser(newUser);
    const token = jwt.sign(verification, process.env.JWT_SECRET);

    res.status(200).json({ token, formattedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal error' });
  }
};
