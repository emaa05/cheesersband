document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const albumId = urlParams.get('id');

  getAlbumDetails(albumId);

  async function getAlbumDetails(albumId) {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`http://127.0.0.1:3000/albums/${albumId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      if (response.status === 200 && response.data.success) {
        const albumDetails = response.data.albumDetails;
        readAlbum(albumDetails);
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      handleError(error.message);
    }
  }

  async function readAlbum(albumDetails) {
    console.log('Detalles del álbum:', albumDetails);
  }

  function handleError(errorMessage) {
    console.error('Error al obtener detalles del álbum:', errorMessage);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `Error al obtener detalles del álbum: ${errorMessage}`,
    });
  }
});
