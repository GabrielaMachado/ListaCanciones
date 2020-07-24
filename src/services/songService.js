const songs = [
    {
        _id:"1",
        titulo: "La camisa negra",
        genero: "Rock en español",
        artista: "Juanes",
        duracion: "4:07",
        liked: false
    },
    {
        _id:"2",
        titulo: "Te aviso, te anuncio",
        genero: "Pop",
        artista: "Shakira",
        duracion: "4:22",
        liked: false
    },
    {
        _id:"3",
        titulo: "Diamonds",
        genero: "Pop",
        artista: "Rihanna",
        duracion: "4:42",
        liked: false
    },
];

export function getSongs() {
    return songs;
}

export function getSong(id) {
    return songs.find(s => s._id === id);
}

export function saveSong(song) {
    let songInDb = songs.find(s => s._id === song._id) || {};
    songInDb.titulo = song.titulo;
    songInDb.genero = song.genero;
    songInDb.artista = song.artista;
    songInDb.duracion = song.duracion;
  
    if (!songInDb._id) {
        songInDb._id = Date.now().toString();
        songs.push(songInDb);
    }
  
    return songInDb;
  }
  
  export function deleteSong(id) {
    let songInDb = songs.find(s => s._id === id);
    songs.splice(songs.indexOf(songInDb), 1);
    return songInDb;
  }
