const { response } = require("express");
const express = require("express");
const cors = require("cors");

const songs = require("./data");

const app = express();

app.use(cors());
app.use(express.json());

//Request for all songs
app.get("/api/songs", (request, response) => {
  response.json(songs);
});

//Request for one song
app.get("/api/songs/:id", (request, response) => {
  const id = Number(request.params.id);
  const song = songs.find((song) => song.id === id);
  if (song) {
    response.json(song);
  } else {
    response.status(404).end();
  }
});

//Delete one song
app.delete("/api/songs/:id", (request, response) => {
  const id = Number(request.params.id);
  response.status(204).end();
});

//Post a song
app.post("/api/songs", (request, response) => {
  const song = request.body;

  const ids = songs.map((song) => song.id);
  const maxIds = Math.max(...ids);

  const newSong = {
    id: maxIds + 1,
    name: song.name,
    cover: song.cover,
    artist: song.artist,
    audio: song.audio,
    color: [song.color],
    active: typeof song.active != "undefined" ? song.active : false,
  };

  songs = [...songs, newSong];

  response.json(newSong);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}/api/songs`);
});
