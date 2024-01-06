import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("Token:", req.cookies.access_token);
  if (!token) {
    console.log("No token found!");
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.MY_SECRET, (err, user) => {
    if (err) {
        console.log("Token is not valid!");
      return next(createError(403, "Token is not valid!"));
    }
    console.log("User from token:", user);
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
    console.log("req:++ ", req.cookies);

  verifyToken(req, res, () => {
    console.log("user:", req.user);
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
        console.log("You are "+ req.user.isAdmin);
        console.log("You are not authorized!");
      return next(createError(403, "You are not authorized!"));
    }
  });
};
