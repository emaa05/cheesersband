document.addEventListener("DOMContentLoaded", function () {
  albumList();
});

function albumList() {
  const token = localStorage.getItem("accessToken");
  axios
    .get("http://www.cheesersband.backend.com/albums", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const albums = response.data.albums;
      displayAlbums(albums);
    })
    .catch((error) => {
      console.error("Error fetching album list:", error.message);
      showErrorAlert("Error", "Error fetching album list");
    });
}

function displayAlbums(albums) {
  const albumListContainer = document.getElementById("albumList");
  albumListContainer.innerHTML = "";

  albums.forEach((album) => {
    const listItem = document.createElement("div");
    listItem.classList.add(
      "mb-4",
      "bg-blue-500",
      "p-4",
      "rounded",
      "cursor-pointer"
    );
    listItem.style.marginBottom = "10px";

    listItem.dataset.albumId = album._id;
    listItem.textContent = album.albumName;

    listItem.addEventListener("click", () => viewAlbumDetails(album._id));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add(
      "ml-2",
      "px-2",
      "py-1",
      "bg-red-500",
      "text-white",
      "rounded"
    );
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteAlbum(album._id);
    });

    listItem.appendChild(deleteButton);
    albumListContainer.appendChild(listItem);
  });
}

function viewAlbumDetails(albumId) {
  const token = localStorage.getItem("accessToken");
  axios
    .get(`http://www.cheesersband.backend.com/albums/${albumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const albumDetails = response.data.albumDetails;
      showAlbumDetailsForEditing(albumDetails);
    })
    .catch((error) => {
      console.error("Error fetching album details:", error.message);
      showErrorAlert("Error", "Error fetching album details");
    });
}

function showAlbumDetailsForEditing(albumDetails) {
  const detailsContainer = document.getElementById("albumDetailsContainer");
  detailsContainer.innerHTML = "";

  const albumNameInput = document.createElement("input");
  albumNameInput.type = "text";
  albumNameInput.value = albumDetails.albumName;
  albumNameInput.disabled = true;
  albumNameInput.classList.add("album-name-input");
  detailsContainer.appendChild(albumNameInput);

  const songList = document.createElement("ul");

  albumDetails.songs.forEach((song, index) => {
    const songItem = document.createElement("li");

    const songTitleInput = document.createElement("input");
    songTitleInput.type = "text";
    songTitleInput.value = song.songTitle;
    songTitleInput.id = `editSongTitle_${index}`;
    songTitleInput.disabled = true;

    const songDurationInput = document.createElement("input");
    songDurationInput.type = "text";
    songDurationInput.value = song.duration;
    songDurationInput.id = `editSongDuration_${index}`;
    songDurationInput.disabled = true;

    songItem.appendChild(songTitleInput);
    songItem.appendChild(document.createTextNode(" - Duration: "));
    songItem.appendChild(songDurationInput);

    songList.appendChild(songItem);
  });

  detailsContainer.appendChild(songList);

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => enableEdit(albumDetails));
  editButton.style.marginRight = "10px";
  editButton.style.border = "1px solid #333";
  detailsContainer.appendChild(editButton);

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save Changes";
  saveButton.addEventListener("click", () => saveChanges(albumDetails));
  saveButton.style.marginRight = "10px";
  saveButton.style.border = "1px solid #333";
  detailsContainer.appendChild(saveButton);

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", () => cancelEdit(albumDetails));
  cancelButton.style.border = "1px solid #333";
  detailsContainer.appendChild(cancelButton);
}

function enableEdit(albumDetails) {
  const albumDetailsContainer = document.getElementById(
    "albumDetailsContainer"
  );

  if (albumDetailsContainer) {
    const inputElements = albumDetailsContainer.querySelectorAll("input");

    inputElements.forEach((input) => {
      console.log(input);
      input.disabled = false;
      input.style.color = "black";
    });
  } else {
    console.error("Album details container not found");
  }
}

function saveChanges(albumDetails) {
  const albumDetailsContainer = document.getElementById(
    "albumDetailsContainer"
  );
  const albumNameInput =
    albumDetailsContainer.querySelector(".album-name-input");
  const updatedAlbumName = albumNameInput.value;

  const updatedSongs = [];

  const liElements = albumDetailsContainer.querySelectorAll("li");

  liElements.forEach(function (liElement, index) {
    const songTitleInput = liElement.querySelector("#editSongTitle_" + index);
    const songDurationInput = liElement.querySelector(
      "#editSongDuration_" + index
    );

    const songTitleValue = songTitleInput.value;
    const songDurationValue = songDurationInput.value;

    updatedSongs.push({
      songTitle: songTitleValue,
      duration: songDurationValue,
    });
  });

  const token = localStorage.getItem("accessToken");
  axios
    .put(
      `http://www.cheesersband.backend.com/albums/${albumDetails._id}`,
      {
        albumName: updatedAlbumName,
        songs: updatedSongs,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Changes saved successfully",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = "index.html";
      });
    })
    .catch((error) => {
      console.error("Error saving changes:", error.message);
      showErrorAlert("Error", "Error saving changes");
    });
}

function cancelEdit(albumDetails) {
  showAlbumDetailsForEditing(albumDetails);
}

function deleteAlbum(albumId) {
  Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete",
  }).then((result) => {
    if (result.isConfirmed) {
      const token = localStorage.getItem("accessToken");
      axios
        .delete(`http://www.cheesersband.backend.com/albums/${albumId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          console.log(`Album with ID ${albumId} deleted successfully.`);
          Swal.fire({
            icon: "success",
            title: "Deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.href = "index.html";
          });
          albumList();
        })
        .catch((error) => {
          console.error("Error deleting album:", error.message);
          showErrorAlert("Error", "Error deleting album");
        });
    }
  });
}
