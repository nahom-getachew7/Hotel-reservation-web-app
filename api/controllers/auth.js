import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong password or email!"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.MY_SECRET,
      { expiresIn: "1h" } // Set token expiration time
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    res.cookie("access_token", token, {
      httpOnly: true,
      // secure: false,
      // sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
      // domain: "localhost",
    });

    res.status(200).json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
const revokedTokens = new Set();

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token || revokedTokens.has(token)) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      // Optionally add the token to the blacklist on verification failure
      revokedTokens.add(token);
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};