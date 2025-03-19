document.addEventListener("DOMContentLoaded", function(){
    //list of songs
    
    const songs = [ 
        { title: "Ambikapathy", duration: "4:15", thumbnail: "./data/Ambikapathy.jfif", src: "./data/Ambikapathy.mp3", artist: "Naresh-iyer", year: 2013, isVerfied: true, followers: 1371245, monthlyListner: 12346313, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", }, 
        { title: "Chuttamalle", duration: "3:24", thumbnail: "./data/Chuttamalle.jfif", src: "./data/Chuttamalle.mp3", artist: "Anirudh", year: 2024, isVerfied: true, followers: 11150, monthlyListner: 2234440, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", },
        { title: "Kannadi Poove", duration: "4:21", thumbnail: "./data/Kannadi-Poove.jfif", src: "./data/Kannadi-Poove.mp3", artist: "Santhosh Narayanan", year: 2025, isVerfied: true, followers: 11180, monthlyListner: 10123, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", }, 
        { title: "Naan Un", duration: "4:48", thumbnail: "./data/Naan-Un.jfif", src: "./data/Naan-Un.mp3", artist: "A.R.Rahman", year: 2016, isVerfied: false, followers: 13132, monthlyListner: 421325, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", },
        { title: "Sawadeeka", duration: "3:24", thumbnail: "./data/Sawadeeka.jfif", src: "./data/Sawadeeka.mp3", artist: "Anirudh", year: 2025, isVerfied: false, followers: 71332, monthlyListner: 4325, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", },
        { title: "Why-this-kolaveri-di.mp3", duration: "4:20", thumbnail: "./data/Why-this-kolaveri-di.jfif", src: "./data/Why-this-kolaveri-di.mp3", artist: "Anirudh", year: 2011, isVerfied: false, followers: 13132, monthlyListner: 421325, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", },
        { title: "Yakkai-Thiri", duration: "4:33", thumbnail: "./data/Yakkai-Thiri.jfif", src: "./data/Yakkai-Thiri.mp3", artist: "A.R.Rahman", year: 2004, isVerfied: true, followers: 913132, monthlyListner: 421325, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", },
    
        ];
    
    
    // Get the Access to all DOM elements
    const songList= document.getElementById("song-list");
    const thumbnailContainer = document.getElementById("thumbnail-container");
    const thumbnail=document.getElementById("thumbnail");
    const trackTitle=document.getElementById("player-title");
    const trackDescription=document.getElementById("player-description");
    const currTime=document.getElementById("current-time");
    const progress=document.getElementById("progress");
    const leftTime=document.getElementById("time-left");
    const shuffleBtn = document.getElementById("shuffle");
    const playPauseBtn=document.getElementById("play-pause");
    const prevBtn= document.getElementById("prev");
    const nextBtn= document.getElementById("next");
    const repeatBtn = document.getElementById("repeat")
    const volumeControl=document.getElementById("volume");
    const customdropdown = document.getElementById("custom-dropdown");
    const dropdownItems = document.querySelectorAll(".custom-dropdown-item");
    const shuffleImg = document.getElementById("shuffle-img");
    const loopImg = document.getElementById("loop-img");
    
    // To store the index of track being played
    let currentSongIndex = 0;
    
    // Default-value -> Constructor
    let isShuffleMode = true;
    let isRepeatMode = false;
    //Audio constructor =>to create an audio object
    let audio = new Audio();
    console.log(audio);
    loadSong(currentSongIndex);

    
    const updatePlayPauseButton = (paused) => {
        // path added in src is with respect to location of index.html file
        playPauseBtn.innerHTML = paused ? `<img src="./assets/icons/play-button.svg"/> ` : `<img src="./assets/icons/pause-button.svg"/>`;
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
    

    // Navigate To Previous track
    function prevSong(){
        currentSongIndex = currentSongIndex -1;
        if(currentSongIndex >= 0){
        loadSong(currentSongIndex);
        audio.play();
        }
        else{
            currentSongIndex = 0;
            loadSong(currentSongIndex);
            audio.play();
        }

    }

    function getRandomIndex(){
        const lastIndex = songs.length-1;   //4
        const randomIndex = Math.floor(Math.random() * (lastIndex + 1)); // Math.random() -> generate 0 to 1 , (lastindex+1)=>5
        return randomIndex;
    }
    
    // Navigate to Next Track
    function nextSong(isBtnClicked){
        // if shuffle mode is on, select a random song
        if(isShuffleMode){
            const randomIndex = getRandomIndex();
            currentSongIndex = randomIndex;
            loadSong(currentSongIndex);
            audio.play();
        }
        // if button is clicked
        else if(isBtnClicked){
            currentSongIndex = currentSongIndex+1;

            if(currentSongIndex >= 0 && currentSongIndex <= songs.length-1 ){
                loadSong(currentSongIndex);
                audio.play();
                }
                else{
                    currentSongIndex = 0;
                    loadSong(currentSongIndex);
                    audio.play();
                }
        }
        // if current song has ended
        else{
            audio.currentTime = 0;
            progress.value = 0;
            audio.play();
        }
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
            
            // create elements for each song
            const itemContainer = document.createElement("div");
            const itemImg = document.createElement("div");
            const imgElement = document.createElement("img");
            const thumbnailImg = document.createElement("img");
            const trackDataContainer = document.createElement("div");
            const trackTitle = document.createElement("p");
            const trackArtist = document.createElement("p");
            const trackDurationContainer = document.createElement("div");
            const trackDuration = document.createElement("p");
            const trackYear = document.createElement("p");
    
            //add Classes
            itemContainer.classList.add("item-container");
            itemContainer.setAttribute("data-index", index);
            thumbnailImg.classList.add("list-thumbnail");
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
            thumbnailImg.src = song.thumbnail;
            trackTitle.textContent = song.title;
            trackArtist.textContent = song.artist || "Unknown Artist";
            trackDuration.textContent = song.duration;
            trackYear.textContent = song.year || "Unknown Year";
    
            //Append Elements to the container
            itemImg.appendChild(imgElement);
            itemImg.appendChild(thumbnailImg);
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
    
    // Update Style of Shufle and repeat button
    function updateButtonState(button, isActive){
        isActive ? button.classList.add("selected") : button.classList.remove("selected");
    }

    // Turn on Shuffle mode
    function toggleShuffleMode(){
        isShuffleMode = true;
        isRepeatMode = false;
        shuffleImg.src ="assets/icons/shuffle-highlighted.svg";
        loopImg.src = "assets/icons/loop.svg";
        updateButtonState(shuffleBtn, isShuffleMode);
    }


    // Turn On Repeat Mode
    function toggleRepeatMode(){
        isRepeatMode = true;
        isShuffleMode = false;
        shuffleImg.src ="assets/icons/shuffle.svg";
        loopImg.src = "assets/icons/loop-highlighted.svg";
        updateButtonState(repeatBtn, isRepeatMode);
    }

    // To open or Close the DropDown
    function toggleDropDown(){
        if(document.getElementById("dropdown-list-items").style.display === "block"){

            document.getElementById("dropdown-list-items").style = "display : none";
            document.getElementById("dropdown-arrow").classList.remove("rotate-270");
        }
        else{
            document.getElementById("dropdown-list-items").style = "display : block";
            document.getElementById("dropdown-arrow").classList.add("rotate-270");
        }
    }


    // Add Selected Playback value to audio
    dropdownItems.forEach(function(item){
        console.log(item);
        item.addEventListener("click", function (){
            // ----------> Exxample
            // Accessing values -> (Syntax) element.dataset.keyname => (We used) this.dataset.value
            // let selectedVal = parseFloat(this.dataset.value);   //dataset.value -> data-value
                // console.log(selectedVal);
            // <-------------

                audio.playbackRate = parseFloat(this.dataset.value);
                // Highlight the selected item
                dropdownItems.forEach(function(item){
                    item.classList.remove("selected-speed");
                });
                this.classList.add("selected-speed");
                
        });
    });


    // Modal Js
    // Accessing Modal elements
    const previewModal = document.getElementById("preview-modal");
    const closeModal = document.getElementById("close-modal");
    const previewImg = document.getElementById("preview-image");
    const previewDescription = document.getElementById("preview-description");
    const previewArtist = document.getElementById("preview-artist");
    const followerCount = document.getElementById("follower-count");
    const listnerCount = document.getElementById("listner-count");


    // Function to open a preview Modal
    function openViewModal(){
        const currentTrack = songs[currentSongIndex];
        previewModal.style.display = "flex";
        previewImg.src = currentTrack.thumbnail;
        previewArtist.innerText = currentTrack.artist;
        followerCount.innerText = currentTrack.followers;
        listnerCount.innerText = currentTrack.monthlyListner;
        previewDescription.innerText = currentTrack.description;

        if(!currentTrack.isVerfied){
            document.getElementById("verified").style.display ="none";
        }
        else{
            document.getElementById("verified").style.display = "flex";
        }
    }


    function closePreviewModal(){
        previewModal.style.display = "none";
    }
    // Event Listner to close the preview modal when close button is clicked
    closeModal.addEventListener("click", closePreviewModal);

    // Event listner to close prviewModal when clicking outside the modal
    window.addEventListener("click", (event) => {
      
        if(event.target === previewModal){
            console.log(event.target);
            closePreviewModal();
        }
        
    })


    // Attached eventListener to DOM elements
    playPauseBtn.addEventListener("click", playPause);
    prevBtn.addEventListener("click", prevSong);
    nextBtn.addEventListener("click", () => nextSong(true));
    progress.addEventListener("input", function () {
        audio.currentTime = progress.value;
    });
    
    volumeControl.addEventListener("input", updateVolume);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", () => nextSong(false));
    audio.addEventListener("play", updatePlayPauseButton(true));
    audio.addEventListener("pause",updatePlayPauseButton(false));

    shuffleBtn.addEventListener("click",toggleShuffleMode);
    repeatBtn.addEventListener("click", toggleRepeatMode);
    customdropdown.addEventListener("click",toggleDropDown);
    thumbnailContainer.addEventListener("click", openViewModal);

    // Event listner to close a dropdown on outside track
    window.addEventListener("click", function(event){
        if(!event.target.matches(".custom-dropdown-selected")){
            const itemsContainer = customdropdown.querySelector(".custom-dropdown-items");
            itemsContainer.style.display = "none";
            document.getElementById("dropdown-arrow").classList.remove("rotate-270");
        }
    });
    });
    
    
    
    
    