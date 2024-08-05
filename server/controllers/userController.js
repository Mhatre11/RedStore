const Users = require("../models/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  register: async (request, response) => {
    try {
      const { Name, Email, Password } = request.body;
      const user = await Users.findOne({ Email });
      if (user)
        return response.status(409).json({ msg: "Email Already Registered" });
      if (!validator.isEmail(Email)) {
        return response.status(400).json({ msg: "Email Format Invalid" });
      }
      if (!validator.isLength(Password, { min: 7 })) {
        return response
          .status(400)
          .json({ msg: "Password must be at least 7 characters long" });
      }

      // password Encryption
      const passwordHash = await bcrypt.hash(Password, 10);

      const newUser = new Users({
        Name,
        Email,
        Password: passwordHash,
      });

      // save mongoDB
      await newUser.save();

      // create jwt to Authentication
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      response.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });
      response.json({ accessToken });

      response.json({ msg: "Register Success" });
    } catch (error) {
      return response.status(500).json({ msg: error.message });
    }
  },
  refreshToken: async (request, response) => {
    try {
      const rf_token = request.cookies.refreshToken;
      if (!rf_token)
        return response.status(400).json({ msg: "Please Login or Register" });
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if (error) {
          return response
            .status(400)
            .json({ msg: " Please Login or Register" });
        }
        const accesstoken = createAccessToken({ id: user.id });
      });
      response.json(rf_token);
    } catch (error) {
      return response.status(500).json({ msg: error, message });
    }
  },
  login: async (request, response) => {
    try {
      const { Email, Password } = request.body;
      const user = await Users.findOne({ Email });
      if (!user) {
        return response.status(400).json({ msg: "User does not exist" });
      }
      const isMatch = await bcrypt.compare(Password, user.Password);
      if (!isMatch) {
        return response.status(400).json({ msg: "Incorrect Password" });
      }

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      response.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      response.json(accessToken);
    } catch (error) {
      return response.status(500).json({ msg: error.message });
    }
  },
  logout: async (request, response) => {
    try {
      response.clearCookie("refreshToken", { path: "/user/refresh_token" });
      return response.json({ msg: "Log Out" });
    } catch (error) {
      return response.status(400).json({ msg: error.message });
    }
  },
  getUser: async (request, response) => {
    try {
      const user = await Users.findById(request.user.id);
      if (!user) {
        return response.status(400).json({ msg: "User Not Found" });
      }
      response.json(user);
    } catch (error) {}
  },
};

const createAccessToken = (payLoad) => {
  return jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
const createRefreshToken = (payLoad) => {
  return jwt.sign(payLoad, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
module.exports = userController;
