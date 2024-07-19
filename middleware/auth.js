const jwt = require("jsonwebtoken");
const User = require("../model/user");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.usertoken;
    console.log("token", token);
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode", decode);
    const user = await User.findOne({ _id: decode._id });
    if (!user) {
      if (req.cookies.usertoken) {
        res.clearCookie("usertoken");
      }
      return res
        .status(401)
        .send({
          status: 401,
          success: false,
          message: "Invalid Authentication",
        });
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message ? error.message : error);
    return res
      .status(401)
      .send({ status: 401, success: false, message: "Invalid Authentication" });
  }
};

module.exports = auth;
