var mockedSongs = [
  {
    name: "Song Name 1",
    artist: "Artist Name",
    album: "Album Name",
    url: "./assets/songs/song1.mp3",
    cover_art_url: "./assets/cover/art1.jpg"
  }, {
    name: "Song Name 2",
    artist: "Artist Name",
    album: "Album Name ",
    url: "./assets/songs/song2.mp3",
    cover_art_url: "./assets/cover/art2.jpg"
  }, {
    name: "Song Name 3",
    artist: "Artist Name",
    album: "Album Name",
    url: "./assets/songs/song1.mp3",
    cover_art_url: "./assets/cover/art1.jpg"
  }, {
    name: "Song Name 4",
    artist: "Artist Name",
    album: "Album Name",
    url: "./assets/songs/song2.mp3",
    cover_art_url: "./assets/cover/art2.jpg"
  }, {
    name: "Song Name 5",
    artist: "Artist Name",
    album: "Album Name",
    url: "./assets/songs/song1.mp3",
    cover_art_url: "./assets/cover/art1.jpg"
  }, {
    name: "Song Name 6",
    artist: "Artist Name",
    album: "Album Name",
    url: "./assets/songs/song2.mp3",
    cover_art_url: "./assets/cover/art2.jpg"
  }, {
    name: "Song Name 7",
    artist: "Artist Name",
    album: "Album Name",
    url: "./assets/songs/song1.mp3",
    cover_art_url: "./assets/cover/art1.jpg"
  }
];

// Init Amplitude
Amplitude.init({
  'songs' : mockedSongs,
  "debug": true,
  "callbacks": {
      "before_play": "beforeNewTrackPlay",
      "after_next": "beforeNewTrackPlay",
      "after_stop": "afterStopTrack", // TODO: how to trigger this?
      "after_init": "afterInit" // TODO: same
      // "after_prev": "beforeNewTrackPlay"
    // after_play
    // before_stop
    // before_next
    // before_prev
    // before_album_change
    // after_album_change
  }
});

// Init Wavesurfer
var wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: '#97a7dc',
  progressColor: 'purple',
  height: '40'
});

wavesurfer.load(mockedSongs[0].url)
var currentWaveform = document.getElementById('waveform')
currentWaveform.className = mockedSongs[0].name



var playlistEl = document.getElementById('playlist');
var playlistItemTmp = getElementByClassName(playlistEl, 'playlist-item');

for (i = 0; i < mockedSongs.length; i++) {
  playlistEl.appendChild(createPlaylistItem(i, mockedSongs[i]));
}

function createPlaylistItem(i, playListItem) {
  var playlistItemTmpCopy = playlistItemTmp.cloneNode(true);
  playlistItemTmpCopy.id = 'playlist-item-'+i;
  playlistItemTmpCopy.setAttribute('amplitude-song-index', i);
  // Add play/pause clickable cover
  var coverImg = getElementByClassName(playlistItemTmpCopy, 'song-cover');
  coverImg.setAttribute('amplitude-song-index', i);
  coverImg.src = playListItem.cover_art_url;
  // Add number
  var songNumberEl = getElementByClassName(playlistItemTmpCopy, 'song-number');
  songNumberEl.innerHTML = i + 1;
  // Add artist name and song name
  var artistNameEl = getElementByClassName(playlistItemTmpCopy, 'artist-name');
  artistNameEl.innerHTML = playListItem.artist;
  var songNameEl = getElementByClassName(playlistItemTmpCopy, 'song-name');
  songNameEl.innerHTML = playListItem.name;
  // Add duration
  var minEl = getElementByClassName(playlistItemTmpCopy, 'amplitude-duration-minutes');
  minEl.setAttribute('amplitude-song-index', i);
  var secEl = getElementByClassName(playlistItemTmpCopy, 'amplitude-duration-seconds');
  secEl.setAttribute('amplitude-song-index', i);
  // More Info Toggle
  var mibEl = getElementByClassName(playlistItemTmpCopy, 'more-info-button');
  mibEl.setAttribute('amplitude-song-index', i);
  // Play Button for track
  var minEl = getElementByClassName(playlistItemTmpCopy, 'amplitude-play-pause');
  minEl.setAttribute('amplitude-song-index', i);

  return playlistItemTmpCopy;
}

function getElementByClassName(el, className) {
  return el.getElementsByClassName(className)[0];
}