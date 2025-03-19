document.addEventListener("DOMContentLoaded", function(){
//list of songs

const songs = [
     { title: "Why this kolaveri", duration: "4:20", thumbnail: "./assets/icons/music-icon.svg", src: "./data/Why-this-kolaveri-di.mp3", artist: "Dhanush", year: 2011, },
     { title: "Sawadeeka", duration: "3:24", thumbnail: "./assets/icons/music-icon.svg", src: "./data/Sawadeeka.mp3", artist: "Anirudh", year: 2025, }, 
     { title: "Chuttamalle", duration: "3:24", thumbnail: "./assets/icons/music-icon.svg", src: "./data/Chuttamalle.mp3", artist: "Anirudh", year: 2024, }, 
     { title: "Ambikapathy", duration: "4:15", thumbnail: "./assets/icons/music-icon.svg", src: "./data/Ambikapathy.mp3", artist: "A.R.Rahman", year: 2013, },
     { title: "Kannadi-Poove", duration: "4:21", thumbnail: "./assets/icons/music-icon.svg", src: "./data/Kannadi-Poove.mp3", artist: "Santhosh Narayanan", year: 2025, },
     { title: "Naan-Un", duration: "4:48", thumbnail: "./assets/icons/music-icon.svg", src: "./data/Naan-Un.mp3", artist: "A.R.Rahman", year: 2016, },
     { title: "Yakkai-Thiri", duration: "4:33", thumbnail: "./assets/icons/music-icon.svg", src: "./data/Yakkai-Thiri.mp3", artist: "A.R.Rahman", year: 2004, },
     ];


// Get the Access to all DOM elements
const songList= document.getElementById("song-list");
const thumbnail=document.getElementById("thumbnail");
const trackTitle=document.getElementById("player-title");
const trackDescription=document.getElementById("player-description");
const currTime=document.getElementById("current-time");
const progress=document.getElementById("progress");
const leftTime=document.getElementById("time-left");
const playPauseBtn=document.getElementById("play-pause");
const restartBtn= document.getElementById("restart");
const stopBtn= document.getElementById("stop");
const volumeControl=document.getElementById("volume");



// To store the index of track being played
let currentSongIndex = 0;

//Audio constructor =>to create an audio object
let audio = new Audio();
console.log(audio);
loadSong(currentSongIndex);

const updatePlayPauseButton = (paused) => {
    // path added in src is with respect to location of index.html file
    playPauseBtn.innerHTML = paused ? `<img src="./assets/icons /play-button.svg"/> ` : `<img src="./assets/icons/pause-button.svg"/>`;
};

// To play-pause the track
function playPause(){
    if(audio.paused){
        audio.play();
        updatePlayPauseButton(true);
    }
    else{
        audio.pause();
        updatePlayPauseButton(false);
    }
}

//To highlight currently playing track in the list
function updateCurrentSongHighlight(){
    // Remove highlight from all titles
    const titleElemets = document.querySelectorAll(".track-title");
    titleElemets.forEach((element) =>{
        console.log(element);
        element.classList.remove("current-song");
        
    });

    // Subsequently highlight applied on current song index
    const currentSongTitleElement = document.querySelector(`.item-container[data-index="${currentSongIndex}"] .track-title`);

    if(currentSongTitleElement){
        currentSongTitleElement.classList.add("current-song");
    }
}

//to play a track using audio
function loadSong(index){
    const currentSong = songs[index];   
    console.log(currentSong);
     
    audio.src = currentSong.src;
    thumbnail.src = currentSong.thumbnail;
    trackTitle.innerText = currentSong.title;
    trackDescription.innerText = currentSong.artist;
    leftTime.textContent = "00:00";
    audio.addEventListener("loadedmetadata", function (){
        progress.max = audio.duration;

    });
    updateCurrentSongHighlight(index);


}


// To Restart a track
function restart(){
    audio.currentTime =0;
    progress.value = 0;
}

// To Stop track
function stop(){
    audio.currentTime =0;
    audio.pause();
}


function padZero(number){
    return (number < 10 ? "0" : "") + number;
}


function formatTime(time){
    const minutes = Math.floor(time/60); //it'll roundoff to the lowest value (1.5 -> 1  ;   2.9 -> 2)
    const seconds = Math.floor(time % 60); // 59%60 > 59
    return `${padZero(minutes)}:${padZero(seconds)}`;
}

// called Periodically to update the progress on track
function updateProgress(){
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    //calculate remaining time
    const remainingTime = duration - currentTime;
    progress.value = currentTime;
    currTime.textContent = `${formatTime(currentTime)}`;
    leftTime.textContent = `${"-" + (remainingTime >= 0 ? formatTime(remainingTime) : "00:00")}`;

    // used because, this particular function should not be called multiple times
    throttledUpdateProgress = null;
}


function updateVolume(){
    audio.volume = volumeControl.value;
}


// to render the list of songs in the left menu from the given array
function renderSongList(){
    // clear existing list
    songList.innerHTML = "";

    //Render songs dynamically
    songs.forEach((song, index) =>{
        console.log(song);
        
        // create an elements for each song
        const itemContainer = document.createElement("div");
        const itemImg = document.createElement("div");
        const imgElement = document.createElement("img");
        const trackDataContainer = document.createElement("div");
        const trackTitle = document.createElement("p");
        const trackArtist = document.createElement("p");
        const trackDurationContainer = document.createElement("div");
        const trackDuration = document.createElement("p");
        const trackYear = document.createElement("p");

        //add Classes
        itemContainer.classList.add("item-container");
        itemContainer.setAttribute("data-index", index);
        itemImg.classList.add("item-img");
        trackDataContainer.classList.add("track-data-container");
        trackTitle.classList.add("track-title");
        trackArtist.classList.add("track-artist");
        trackDurationContainer.classList.add("track-duration-container");
        trackDuration.classList.add("track-duration");
        trackYear.classList.add("track-year");

        //Set attributes and Content
        itemContainer.addEventListener("click", () =>{
            currentSongIndex = index;
            loadSong(currentSongIndex);
            audio.play();
            updatePlayPauseButton();
        });

        imgElement.src = "./assets/icons/outline.svg";
        trackTitle.textContent = song.title;
        trackArtist.textContent = song.artist || "Unknown Artist";
        trackDuration.textContent = song.duration;
        trackYear.textContent = song.year || "Unknown Year";

        //Append Elements to the container
        itemImg.appendChild(imgElement);
        trackDataContainer.appendChild(trackTitle);
        trackDataContainer.appendChild(trackArtist);
        trackDurationContainer.appendChild(trackDuration);
        trackDurationContainer.appendChild(trackYear);

        itemContainer.appendChild(itemImg);
        itemContainer.appendChild(trackDataContainer);
        itemContainer.appendChild(trackDurationContainer);

        songList.appendChild(itemContainer);

        updateCurrentSongHighlight(currentSongIndex);

    });
}
renderSongList();


// Attached eventListener to DOM elements
playPauseBtn.addEventListener("click", playPause);
restartBtn.addEventListener("click", restart);
stopBtn.addEventListener("click", stop);
progress.addEventListener("input", function () {
    audio.currentTime = progress.value;
});

volumeControl.addEventListener("input", updateVolume);
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("play", updatePlayPauseButton(true));
audio.addEventListener("pause",updatePlayPauseButton(false));
});




