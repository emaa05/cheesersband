const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userControllers');
const AlbumController = require('../controllers/albumControllers')


router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.post('/logout', UserController.logout);

router.get('/user', UserController.getUserInfo);

router.post('/albums', AlbumController.createAlbum);

router.put('/albums/:id', AlbumController.updateAlbum);

router.get('/albums', AlbumController.getAlbums);

router.delete('/albums/:id', AlbumController.deleteAlbum);

module.exports = router;
