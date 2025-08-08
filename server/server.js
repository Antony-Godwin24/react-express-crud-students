const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "..", ".env"), // From server/db/ to WithReactJs/.env
});
const express = require("express");
const app = express();
const db = require("./db/db");
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const rateLimit = require("express-rate-limit");

app.use(cors());
app.use(express.json());

// JWT secret token used to verify the jwt token whther login done or not
const secretToken = process.env.JWT_SECRET;
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided!" });
  jwt.verify(token, secretToken, (err, user) => {
    if (err) return res.status(401).json({ message: "Invalid token!" });
    req.user = user;
    next();
  });
};

// Input sanitization function used to prevent XSS attacks like if user (script>Hack</script>) is entered in the input field
// it will be sanitized to Hack llike it will remove <></> so that it won't be executed as a script
// This function is used in the sanitizeMiddleware to sanitize the input from the user
const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;
  return input
    .trim()
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "");
};

// Input sanitization middleware
// This middleware will sanitize the input from the user before it is processed by the server
// It will sanitize the request body, query parameters, and URL parameters
const sanitizeMiddleware = (req, res, next) => {
  // Sanitize request body
  if (req.body) {
    for (let key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = sanitizeInput(req.body[key]);
      }
    }
  }

  // Sanitize query parameters
  // This will sanitize the query parameters in the URL like /students?search=<script>Hack</script>
  // It will remove the <script> tags and sanitize the input
  if (req.query) {
    for (let key in req.query) {
      if (typeof req.query[key] === "string") {
        req.query[key] = sanitizeInput(req.query[key]);
      }
    }
  }

  // Sanitize URL parameters
  // This will sanitize the URL parameters in the URL like /students/<script>Hack</script>
  // It will remove the <script> tags and sanitize the input
  if (req.params) {
    for (let key in req.params) {
      if (typeof req.params[key] === "string") {
        req.params[key] = sanitizeInput(req.params[key]);
      }
    }
  }

  next();
};
app.use(sanitizeMiddleware); // Apply sanitization to all routes

// Rate limiting configurations
// General rate limiting for all routes
// This will limit the number of requests from a single IP address to 100 requests per
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per 15 minutes
  message: {
    error: "Too many requests from this IP, please try again later.",
    retryAfter: "15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Authentication rate limiting
// This will limit the number of authentication attempts to 5 per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Only 5 authentication attempts per 15 minutes
  message: {
    error: "Too many login/signup attempts, please try again later.",
    retryAfter: "15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiting for sensitive operations like deleting all students or deleting an account
// This will limit the number of attempts to 3 per 15 minutes
const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Only 3 attempts for sensitive operations
  message: {
    error: "Too many attempts for this operation, please try again later.",
    retryAfter: "15 minutes",
  },
});
app.use(generalLimiter); // Apply general rate limiting to all routes

// Input validation
const { body, validationResult } = require("express-validator");

// Validation rules for different routes
// These rules will validate the input from the user and return an error if the input is not
const validateStudent = [
  body("roll").isNumeric().withMessage("Roll number must be numeric"),
  body("name").isLength({ min: 2, max: 50 }).trim().escape(),
  body("dept").isLength({ min: 2, max: 30 }).trim().escape(),
  body("city").isLength({ min: 2, max: 30 }).trim().escape(),
  body("pin").isPostalCode("IN").withMessage("Invalid PIN code"),
];

const validateSignup = [
  body("user").isLength({ min: 3, max: 30 }).trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("pass").isLength({ min: 8, max: 100 }),
  body("repass").isLength({ min: 8, max: 100 }),
];

const validateLogin = [
  body("user").isLength({ min: 3, max: 30 }).trim().escape(),
  body("email").isEmail().normalizeEmail(),
  body("pass").isLength({ min: 6, max: 100 }),
];

const validateNotice = [
  body("info").isLength({ min: 5, max: 500 }).trim().escape(),
  body("formatted").isLength({ min: 1, max: 100 }).trim(),
];

// Error handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.path, msg: e.msg })),
    });
  }
  next();
};

// Apply middleware
// Apply general rate limiting

// Routes with specific rate limiting and validation

// Student routes
app.get("/students", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM stdnts");
    console.log(rows);
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching students" });
  }
});

app.post("/students",validateStudent,handleValidationErrors,async (req, res) => {
    const { roll, name, dept, city, pin } = req.body;
    try {
      const [test] = await db.execute("SELECT name from stdnts where roll=?", [
        roll,
      ]);
      if (test.length > 0) {
        console.log(`student with roll=${roll} was added already!`);
        return res.json({
          message: `student with roll=${roll} was added already!`,
        });
      } else {
        const [exists] = await db.execute("select * from users where uname=?", [
          name,
        ]);
        if (exists.length > 0) {
          const [rows] = await db.execute(
            "insert into stdnts values (?,?,?,?,?)",
            [roll, name, dept, city, pin]
          );
          console.log("added!");
          res.json({ message: "student was added successfully!" });
        } else {
          console.log("user must register first before adding!");
          res.json({
            message: "student must have registered before adding to the list!",
          });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error adding student" });
    }
  }
);

app.put("/students/:roll",validateStudent,handleValidationErrors,async (req, res) => {
    const { roll } = req.params;
    const { name, dept, city, pin } = req.body;
    try {
      const [rows] = await db.execute(
        "UPDATE stdnts set name=?, dept=?, city=?, pin=? where roll=?",
        [name, dept, city, pin, roll]
      );
      console.log("stdnt updated!");
      res.json({ message: "stdnt updated!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error updating student" });
    }
  }
);

app.put("/students/updateMe/:userName", async (req, res) => {
  const { userName } = req.params;
  const { roll, name, city, pin } = req.body;
  console.log("Username from params:", userName);
  try {
    const [exists] = await db.execute(
      "select * from stdnts where name=? and roll=?",
      [userName, roll]
    );
    if (exists.length > 0) {
      const [rows] = await db.execute(
        "update stdnts set name=?,city=?,pin=? where roll=?",
        [name, city, pin, roll]
      );
      console.log("student updated successfully!");
      res.json({
        message: `stdnt with name=${userName} updated successfully!`,
      });
    } else {
      console.log("UnAuthorized Credentials used for update!");
      return res.json({ message: "Student not found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error encountered on updateMe" });
  }
});

app.delete("/students/deleteAll", strictLimiter, async (req, res) => {
  try {
    const [result] = await db.execute("DELETE FROM stdnts");
    console.log("Delete result:", result);
    res.json({ message: "All students deleted successfully" });
  } catch (err) {
    console.error("DELETE ALL ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/students/:roll", async (req, res) => {
  const { roll } = req.params;
  try {
    const [rows] = await db.execute("DELETE FROM stdnts WHERE roll=?", [roll]);
    console.log("stdnt deleted!");
    res.json({ message: "stdnt deleted!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting student" });
  }
});

app.get("/students/search", async (req, res) => {
  const { search } = req.query;
  try {
    const [rows] = await db.execute("SELECT * FROM stdnts WHERE name LIKE ?", [
      `%${search}%`,
    ]);
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error searching students" });
  }
});

// Authentication routes with strict rate limiting
app.post("/signup",authLimiter,validateSignup,handleValidationErrors,async (req, res) => {
    const { user, email, pass, repass } = req.body;
    try {
        if(pass.length<8) return res.status(400).json({'message':'Password should contains atleast 8 characters!'})
        if (pass !== repass) {
            console.log("Passwords do not match!");
            return res.status(400).json({ message: "Passwords do not match!" });
        }
        const [exists] = await db.execute(
            "select uname from users where uname=? or email=?",
            [user, email]
        );
        if (exists.length > 0) {
            console.log("User already exists!");
            return res
            .status(400)
            .json({ message: "User already exists with Same Credentials!" });
        } else {
            const hashedPass = await bcrypt.hash(pass, 10);
            const [rows] = await db.execute("insert into users values (?,?,?)", [
            user,
            email,
            hashedPass,
            ]);
            console.log("User registered successfully!");
            res.json({ message: "User registered successfully!" });
      }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error registering user" });
    }
  }
);

app.post("/login",authLimiter,validateLogin,handleValidationErrors,async (req, res) => {
    const { user, email, pass } = req.body;
    try {
      const [rows] = await db.execute(
        "SELECT uname, pass FROM users WHERE uname=? AND email=?",
        [user, email]
      );

      if (!Array.isArray(rows) || rows.length === 0) {
        return res.status(401).json({ message: "Invalid credentials!" });
      }

      const userRecord = rows[0]; // get the first row
      const validPass = await bcrypt.compare(pass, userRecord.pass);

      if (!validPass) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const uname = userRecord.uname;
      const role = uname.toLowerCase().includes("admin") ? "admin" : "student";

      const token = jwt.sign({ user: uname, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "2h",
      });

      return res.json({
        message: `${
          role === "admin" ? "Admin" : "Student"
        } logged in successfully!`,
        token,
      });
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      return res.status(500).json({ message: "Error logging in user" });
    }
  }
);

// Notice routes
app.post("/notice",validateNotice,handleValidationErrors,async (req, res) => {
    const { info, formatted } = req.body;
    try {
      const [rows] = await db.execute(
        "insert into notice (info,Time) values (?,?)",
        [info, formatted]
      );
      console.log("Notice added successfully!");
      res.json({ message: "Notice added successfully!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error adding notice" });
    }
  }
);

app.get("/notice", async (req, res) => {
  try {
    const [rows] = await db.execute("select * from notice");
    console.log("Notices fetched successfully!");
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching notices" });
  }
});

app.put("/notice/:id",validateNotice,handleValidationErrors,async (req, res) => {
    const { id } = req.params;
    const { cont, formatted } = req.body;
    try {
      const [rows] = await db.execute(
        "update notice set info=? , Time=? where id=?",
        [cont, formatted, id]
      );
      console.log("Notice updated successfully!");
      res.json({ message: "Notice updated successfully!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error updating notice" });
    }
  }
);

app.delete("/notice/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute("delete from notice where id=?", [id]);
    console.log("Notice deleted successfully!");
    res.json({ message: "Notice deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting notice" });
  }
});

app.get("/students/:userName", async (req, res) => {
  const { userName } = req.params;
  try {
    const [rows] = await db.execute("select * from stdnts where name=?", [
      userName,
    ]);
    if (rows.length > 0) {
      const [exists] = await db.execute("select * from users where uname=?", [
        userName,
      ]);
      if (exists.length > 0) {
        console.log("User details fetched successfully!");
        res.json(rows);
      } else {
        console.log("User was not added as a Student!");
        res.status(404).json({ message: "User was not added as a Student!" });
      }
    } else {
      console.log("User not found!");
      res.status(404).json({ message: "User not found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching user details" });
  }
});

app.delete(
  "/students/deleteAccount/:userName",
  strictLimiter,
  async (req, res) => {
    try {
      const { userName } = req.params;
      const [rows] = await db.execute("delete from users where uname=?", [
        userName,
      ]);
      const [rows2] = await db.execute("delete from stdnts where name=?", [
        userName,
      ]);
      console.log("Account deleted successfully!");
      res.json({ message: "Account deleted successfully!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error deleting account" });
    }
  }
);

app.get("/getUsers", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT uname, email FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
