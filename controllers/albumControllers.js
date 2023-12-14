const Album = require('../models/album');
const Swal = require('sweetalert2');
const { secretKey } = require('../');

console.log('Secret Key2:', secretKey);


module.exports = {

  createAlbum: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const { albumName, songs } = req.body;
  
      if (!songs) {
        return res.status(400).json({ success: false, error: 'Las canciones son obligatorias' });
      }
  
      const songsArray = songs.map(song => ({
        songTitle: song.songTitle.trim(),
        duration: song.duration.trim() || '', 
      }));
  
      const newAlbum = await Album.create({ albumName, songs: songsArray });
  
      res.status(201).json({ success: true, newAlbum });
    } catch (error) {
      console.error('Error al crear un nuevo álbum:', error);
      res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  },
  
  
  readAlbum: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const albumId = req.params.id;

      const albumDetails = await Album.findById(albumId);

      if (!albumDetails) {
        return res.status(404).json({ success: false, message: 'Álbum no encontrado' });
      }

      res.status(200).json({ success: true, albumDetails });
    } catch (error) {
      console.error('Error al obtener detalles del álbum:', error);
      res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  },

  updateAlbum: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const albumId = req.params.id;
      const { albumName, songs } = req.body;

      const updatedAlbum = await Album.findByIdAndUpdate(albumId, { albumName, songs }, { new: true });

      if (!updatedAlbum) {
        return res.status(404).json({ success: false, message: 'Álbum no encontrado' });
      }

      res.status(200).json({ success: true, updatedAlbum });
    } catch (error) {
      console.error('Error al actualizar el álbum:', error);
      res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  },

  getAlbums: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const albums = await Album.find();
      res.status(200).json({ success: true, albums });
    } catch (error) {
      console.error('Error al obtener la lista de álbumes:', error);
      res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  },

  deleteAlbum: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const albumId = req.params.id;

      const deletedAlbum = await Album.findByIdAndDelete(albumId);

      if (!deletedAlbum) {
        return res.status(404).json({ success: false, message: 'Álbum no encontrado' });
      }

      res.status(200).json({ success: true, message: 'Álbum eliminado con éxito', deletedAlbum });
    } catch (error) {
      console.error('Error al eliminar el álbum:', error);
      res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  },

  editAlbum: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const albumId = req.params.id;
      const { albumName, songs } = req.body;

      const updatedAlbum = await Album.findByIdAndUpdate(albumId, { albumName, songs }, { new: true });

      if (!updatedAlbum) {
        return res.status(404).json({ success: false, message: 'Álbum no encontrado' });
      }

      res.status(200).json({ success: true, updatedAlbum });
    } catch (error) {
      console.error('Error al editar el álbum:', error);
      res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  },

  showErrorAlert: (title, text) => {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
    });
  },
};
