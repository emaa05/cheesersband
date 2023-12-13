const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const cors = require('cors');
const userRoutes = require("./routes/userRoutes");
const path = require("path");
const UserController = require('./controllers/userControllers');
const AlbumController = require('./controllers/albumControllers');
const albumControllers = require("./controllers/albumControllers");


const app = express();

const corsOptions = {
  origin: ['http://127.0.0.1:5500', 'http://127.0.0.1:3000'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(session({
  secret: '4860694as',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000, 
  },
}));

const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

app.use('/', userRoutes);

app.get('/user', requireAuth, UserController.getUserInfo);
app.post('/logout', UserController.logout);
app.post('/albums', AlbumController.createAlbum);
app.get('/albums/:id', AlbumController.readAlbum);
app.put('/albums/:id', AlbumController.updateAlbum);
app.get('/albums', AlbumController.getAlbums);
app.delete('/albums/:id', AlbumController.deleteAlbum);
app.put('/albums/:id', albumControllers.editAlbum);

app.use(express.static(path.join(__dirname, "proyecto p5")));

const url = "mongodb+srv://emanuelcorradini:4860694as@emaa05.6boemjs.mongodb.net/Emaa05";
const connectToMongo = async () => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`MongoDB connected`);

    app.listen(3000, () => {
      console.log(`Server on port 3000`);
    });
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error}`);
  }
};

connectToMongo();
