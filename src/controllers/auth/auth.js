const jwt = require("jsonwebtoken");
const config = require("../../config");
const { getHashString } = require("../../helpers/HashHelper");
const AccountService = require("../../objectservices/User");
const {
  BadRequest,
  InternalServerError
} = require("../../helpers/ErrorHelper");

const WrongAccountMsg = "Wrong email or password";

const auth = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) return BadRequest(res);
  try {
    email = email.trim().toLowerCase();
    const account = await AccountService.getUserByEmail(email);
    if (account && isMatchPassword(account, password)) {
      responseUserSession(res, account);
    } else {
      BadRequest(res, WrongAccountMsg);
    }
  } catch (err) {
    InternalServerError(res);
  }
};

const createToken = (user, expireTime = "24h") =>
  jwt.sign({ ...user }, config.SECRET_WORD, {
    expiresIn: expireTime
  });

const isMatchPassword = (user, password) =>
  user.hash_password === getHashString(password, user.salt_password);

const responseUserSession = (res, user) => {
  const userInfo = user.toObject();
  delete userInfo.hash_password;
  delete userInfo.salt_password;
  res.json({
    token: createToken({ email: user.email, id: user._id }),
    user: userInfo
  });
};

module.exports = auth;
