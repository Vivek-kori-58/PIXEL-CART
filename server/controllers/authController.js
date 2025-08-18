const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.postLogin = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    console.log("user found", user.userType);

    if (!user) {
      return res.status(422).json({
        success: false,
        message: "user not found",
        isLoggedIn: true,
        user: {
          _id: user._id,
          name: user.name,
          userType: user.userType, // 👈✅ This is how you know the type
        },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(422)
        .json({ success: false, message: "incorrect password" });
    }
    req.session.isLoggedIn = true;
    req.session.user = user;

    await req.session.save();
    return res.status(200).json({
      success: true,
      message: "Login successful",
      isLoggedIn: true,
      user: {
        _id: user._id,
        name: user.name,
        userType: user.userType, // <-- THIS is what frontend needs
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getCheckAuth = (req, res, next) => {
  if (req.session?.isLoggedIn && req.session?.user) {
    return res.status(200).json({
      loggedIn: true,
      user: {
        _id: req.session.user._id,
        email: req.session.user.email,
        name: req.session.user.name, // or whatever fields you want
        userType: req.session.user.userType, // <- this is important
      },
    });
  }

  return res.status(200).json({ loggedIn: false });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
    return res.status(200).json({ success: true, message: "Logged out" });
  });
};


exports.postSignup = [
  check("FirstName")
    .trim()
    .isLength({ min: 3 })
    .withMessage("fisrt name should 3 char")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("first name should contain alphabets"),

  check("LastName")
    .trim()
    .matches(/^[A-Za-z\s]*$/)
    .withMessage("last name should contain alphabets"),

  check("email")
    .isEmail()
    .withMessage("please enter valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("password length must be 8 characters")
    .matches(/[a-z]/)
    .withMessage("password should contain 1 lowwer case")
    .matches(/[A-Z]/)
    .withMessage("password should contain 1 upper case")
    .matches(/[!@$&]/)
    .withMessage("password should contain 1 special char")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("password does not match");
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .isIn(["guest", "host"])
    .withMessage("invalid usertype"),

  (req, res) => {
    const { FirstName, LastName, email, password, userType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: errors.array().map((err) => err.msg),
      });
    }

    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          FirstName,
          LastName,
          email,
          password: hashedPassword,
          userType,
        });
        return user.save();
      })
      .then(() => {
        return res.status(201).json({
          success: true,
          message: "User registered successfully",
        });
      })
      .catch((err) => {
        console.log(err);

        return res.status(402).json({
          success: false,
          message: "error occured while signup new account",
          errors: err.message,
        });
      });
  },
];
