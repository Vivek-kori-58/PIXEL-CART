// External Module
const express = require("express");
const path = require("path");
const multer = require("multer");

//Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { default: mongoose } = require("mongoose");
const authRouter = require("./routes/authRouter");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");
const user = require("./models/user");
require("dotenv").config();

// mongodb+srv://vivekDb:vivekDb@vivekdb.7wrhhfz.mongodb.net/?retryWrites=true&w=majority&appName=vivekDb
const app = express();
app.set("views","views");

app.use(express.json()); // For JSON POST/PUT bodies
app.use(express.urlencoded({ extended: true })); // For form data

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // allow cookies (important for sessions)
  })
);

// mongodb+srv://vivekDb:vivekDb@vivekdb.7wrhhfz.mongodb.net/airbnb?retryWrites=true&w=majority&appName=vivekDb
const store = MongoDBStore({
  uri:process.env.MONGO_URL ,
  collection: "sessions",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const filefilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerOptions = {
  storage: storage,
};

app.use(multer(multerOptions).single("photo"));
app.use(express.static(path.join(rootDir, "public")));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/host/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/homes/uploads", express.static(path.join(rootDir, "uploads")));

app.use(
  session({
    secret: "airbnb session",
    resave: false,
    saveUninitialized: true,
    store: store,
    usetType: user.userType,
  })
);

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});

app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    return next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);
app.use(authRouter);

app.use(errorsController.pageNotFound);

const PORT = process.env.PORT || 3001;

// "mongodb+srv://vivekDb:vivekDb@vivekdb.7wrhhfz.mongodb.net/airbnb?retryWrites=true&w=majority&appName=vivekDb"
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("database connected");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error while connecting to database", err);
  });
