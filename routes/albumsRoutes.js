const express = require("express");
const router = express.Router();
const AlbumController = require("../controllers/albumControllers");

router.post("/albums", AlbumController.createAlbum);
router.get("/albums/:id", AlbumController.readAlbum);
router.put("/albums/:id", AlbumController.updateAlbum);
router.get("/albums", AlbumController.getAlbums);
router.delete("/albums/:id", AlbumController.deleteAlbum);
router.put("/albums/:id", AlbumController.editAlbum);

module.exports = router;
