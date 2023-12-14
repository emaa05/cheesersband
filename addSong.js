let songCounter = 1;

function addSongField() {
    const songsContainer = document.getElementById('songsContainer');

       const songInput = document.createElement('input');
    songInput.type = 'text';
    songInput.name = `song${songCounter}`;
    songInput.placeholder = 'Nombre de la Canción';
    songInput.classList.add('mb-2'); 

    const durationInput = document.createElement('input');
    durationInput.type = 'text';
    durationInput.name = `duration${songCounter}`;
    durationInput.placeholder = 'Duración (por ejemplo, 3:30)';
    durationInput.classList.add('mb-4'); 


    songsContainer.appendChild(songInput);
    songsContainer.appendChild(durationInput);

    songCounter++;
}
