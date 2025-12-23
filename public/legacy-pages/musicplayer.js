// Selecting Elements
const now_playing = document.querySelector('.now-playing');
const track_art = document.querySelector('.track-art');
const track_name = document.querySelector('.track-name');
const track_artist = document.querySelector('.track-artist');
const playpause_btn = document.querySelector('.playpause-track');
const next_btn = document.querySelector('.next-track');
const prev_btn = document.querySelector('.prev-track');
const shuffle_btn = document.querySelector('.random-track');
const seek_slider = document.querySelector('.seek_slider');
const volume_slider = document.querySelector('.volume_slider');
const curr_time = document.querySelector('.current-time');
const total_duration = document.querySelector('.total-duration');
const wave = document.getElementById('wave');
const randomIcon = document.querySelector('.fa-random');
const curr_track = new Audio();

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

// ✅ Music List with paths relative to legacy-music/
const music_list = [
  { img: 'ammadihn.webp', name: 'Ammadi', artist: 'Shakthishree Gopalan, Kala Bhairava', music: 'ammadi.mp3' },
  { img: 'abhi.webp', name: 'Abhi Na Jao Chhod Kar', artist: 'Asha Bhosle, Mohammed Rafi', music: 'abhina.mp3' },
  { img: 'badeachhe.webp', name: 'Bade Achhe Lagte Hain', artist: 'Amit Kumar, R.D.Burman', music: 'bade.mp3' },
  { img: 'ehsan.webp', name: 'Ehsan Tera Hoga Mujh Par', artist: 'Mohammed Rafi', music: 'ethmp.mp3' },
  { img: 'raat.webp', name: 'Raat Kali Ek Khwab Men Aayi', artist: 'Kishore Kumar, R.D.Burman', music: 'rkekma.mp3' },
  { img: 'aap.webp', name: 'Aap Ki Aankhon Mein Kuch', artist: 'Kishore Kumar, Lata Mangeshkar, R.D.Burman', music: 'akamk.mp3' },
  { img: 'kanmani.webp', name: 'Kanmani Anbodu', artist: 'S.Varalakshmi, K.J.Yesudas', music: 'Kanmani-Anbodu.mp3' },
  { img: 'ammadihn.webp', name: 'Adigaa', artist: 'Karthik', music: 'adigaa.mp3' }
];

// Load Initial Track
function loadTrack(index) {
  clearInterval(updateTimer);
  resetPlayer();
  curr_track.src = music_list[index].music;
  curr_track.load();

  track_art.style.backgroundImage = `url('${music_list[index].img}')`;
  track_name.textContent = music_list[index].name;
  track_artist.textContent = music_list[index].artist;
  now_playing.textContent = `Playing ${index + 1} of ${music_list.length}`;

  updateTimer = setInterval(updateSeek, 1000);
  curr_track.addEventListener('ended', nextTrack);
  applyRandomBackground();
}

function applyRandomBackground() {
  const hex = "0123456789abcdef";
  const randomColor = () => "#" + Array.from({ length: 6 }, () => hex[Math.floor(Math.random() * 16)]).join("");
  document.body.style.background = `linear-gradient(to right, ${randomColor()}, ${randomColor()})`;
}

function resetPlayer() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "4:57"; // Placeholder
  seek_slider.value = 0;
}

function toggleRandom() {
  isRandom = !isRandom;
  randomIcon.classList.toggle('randomActive', isRandom);
}

function repeatTrack() {
  loadTrack(track_index);
  playTrack();
}

function togglePlayPause() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add('rotate');
  wave.classList.add('loader');
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove('rotate');
  wave.classList.remove('loader');
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  track_index = isRandom ? Math.floor(Math.random() * music_list.length) : (track_index + 1) % music_list.length;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  track_index = track_index > 0 ? track_index - 1 : music_list.length - 1;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekToTime = curr_track.duration * (seek_slider.value / 100);
  if (!isNaN(seekToTime)) {
    curr_track.currentTime = seekToTime;
  }
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function updateSeek() {
  if (!isNaN(curr_track.duration) && curr_track.duration > 0) {
    let progress = (curr_track.currentTime / curr_track.duration) * 100;
    seek_slider.value = progress;
  }
}

// Event Listeners
playpause_btn.addEventListener("click", togglePlayPause);
next_btn.addEventListener("click", nextTrack);
prev_btn.addEventListener("click", prevTrack);
shuffle_btn.addEventListener("click", toggleRandom);
seek_slider.addEventListener("input", seekTo);
volume_slider.addEventListener("input", setVolume);

// Load the first track
loadTrack(track_index);
