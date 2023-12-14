function createAlbum() {
  const albumName = document.getElementById('albumName').value;
  const songInputs = document.querySelectorAll('[name^="song"]');
  const durationInputs = document.querySelectorAll('[name^="duration"]');

  if (songInputs.length === 0 || durationInputs.length === 0) {
      showErrorAlert('Error', 'Debes ingresar al menos una canción y duración.');
      return;
  }

  const songs = Array.from(songInputs).map((songInput, index) => ({
      songTitle: songInput.value.trim(),
      duration: durationInputs[index].value.trim(),
  }));

  const token = localStorage.getItem('accessToken');
  const albumData = {
      albumName,
      songs,
  };

  axios.post('http://www.cheesersband.backend.com/albums', albumData, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })
      .then(response => {
          console.log('Álbum creado con éxito:', response.data);
          showSuccessAlert('Éxito', 'Álbum creado con éxito. Serás redirigido a la página de inicio.');
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 2000); 
      })
      .catch(error => {
          console.error('Error al crear el álbum:', error.message);
          showErrorAlert('Error', `Error al crear el álbum: ${error.message}`);
      });
}

function showSuccessAlert(title, text) {
  Swal.fire({
    icon: 'success',
    title: title,
    text: text,
  });
}
