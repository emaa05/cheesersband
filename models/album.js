const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  albumName: {
    type: String,
    required: true,
  },
  songs: [
    {
      songTitle: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
    },
  ],
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
