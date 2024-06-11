const express = require("express");
const router = express.Router();

const User = require("../models/User");

// import bcryptjs:

const bcrypt = require("bcryptjs");

// import jsonwebtoken

var jwt = require("jsonwebtoken");

//Create JWT secret
const jwt_secret = "Armaanisagoodboy";

const { body, validationResult } = require("express-validator");

var fetchuser = require('../middleware/fetchuser')

// Route 1:

//  Create a user using POST   endpoint: "/api/auth/createuser".Doesn't require auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if ther are errors return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Create an User

    // Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      // if user exists...
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry! User with this email already exists" });
      }
      // generate salt:
      const salt = await bcrypt.genSalt(10);
      // generate hash for password with salt
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_secret);
      res.json({ authtoken });

      // res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal Server error occured" });
    }
  }
);

// Route 2

//  Authenticate a user using POST   endpoint: "/api/auth/login". No login required

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // if ther are errors return Bad Request and the errors
    // the errors that may arise if password or email is not filled properly

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // check if user exists
      let user = await User.findOne({ email });

      // If user doesn't exist
      if (!user) {
        return res.status(400).json({ error: "login credentials are wrong" });
      }

      // now we'll ccompare password

      const passwordCompare = await bcrypt.compare(password, user.password);

      // If password doesn't match
      if (!passwordCompare) {
        return res.status(400).json({ error: "login credentials are wrong" });
      }

      // If password is correct send the auth token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_secret);
      res.json({ authtoken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error occured" });
    }
  }
);

// Route 3

//  get logged in user details using POST  endpoint: "/api/auth/getuser".  Login required

router.post("/getuser", fetchuser, async (req, res) => {
  // if ther are errors return Bad Request and the errors  
  // the errors that may arise if password or email is not filled properly

  try {
    const userId = req.user.id;

    //finding user using user ID and selecting  all fields except password
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server error occured" });
  }
});
module.exports = router;
