const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const albumsRoutes = require("./routes/albumsRoutes");
const path = require("path");

const app = express();

app.use(cors());

app.use(express.json());
app.use(
  session({
    secret: "4860694as",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    },
  })
);

const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

app.use("/health", (req, res) => res.sendStatus(200));
app.use("/", userRoutes);
app.use("/", albumsRoutes);

app.use(express.static(path.join(__dirname, "proyecto p5")));

const url =
  "mongodb+srv://emanuelcorradini:4860694as@emaa05.6boemjs.mongodb.net/Emaa05";
const connectToMongo = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected`);

    app.listen(3000, () => {
      console.log(`Server on port 3000`);
    });
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error}`);
  }
};

connectToMongo();
