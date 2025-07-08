console.log("working");
let currentSong = new Audio();
let songs = [];
let currFolder;

// let start = document.querySelectorAll(".start");
async function getsongs(folder) {
    try {
        songs = [];
        currFolder = folder;
        let a = await fetch(`http://127.0.0.1:5500/spotify-clone/${folder}/`)
        let response = await a.text();
        let div = document.createElement("div");
        div.innerHTML = response;
        let as = div.querySelectorAll("a");
        

        for (let index = 0; index < as.length; index++) {
            const element = as[index];
            if (element.href.endsWith(".mp3")) {
                songs.push(element.href);
            }
        }
        let firstTrack = songs[0].split(`${currFolder}`)[1].replace(/^\/+/, "");
        playMusic(firstTrack, pause = true);
        let SongUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
        SongUl.innerHTML = "";
        for (const song of songs) {
            var audio = new Audio(song);
            let track = audio.src.split(`${currFolder}`)[1].replaceAll("%20", " ").replace(/^\/+/, "")

                ;
            // alert(track)
            let title = track.split("-")[0];
            let artist = track.split("-")[1].replace(".mp3", "");
            // alert(title)
            SongUl.innerHTML = SongUl.innerHTML + `

<li>
                            
                            <div class="info flex">
                                <img class="filter" src="img/music.svg" alt="music">
                                <div>
                                    <p class="track">${title}</p>
                                    <p class="artist">${artist}</p>
                                </div>
                            </div>
                            <div class="playnow flex">
                                <span>
                                    PlayNow

                                </span>
                                <img class="filter" id= "start" src="img/play.svg" alt="play">
                            </div>
                        </li>


`;
            // playMusic(song,true);
        }
        //play songs by clicking on it
        Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
            e.addEventListener("click", element => {
                let ps = e.querySelector(".info").getElementsByTagName("p");
                let title = ps[0].innerText.trim();
                let artist = ps[1].innerText.trim();
                let track = `${title} - ${artist}.mp3`;

                
                // playMusic(encodeURIComponent(track));
                playMusic(track)
            })

        })
        return songs
    } catch (err) {
        console.log(err.message);
    }
}


const playMusic = (track, pause = false) => {
    currentSong.src = `/spotify-clone/${currFolder}/` + track;

    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = " 00:00/00:00";

    currentSong.addEventListener("loadedmetadata", function handler() {
        document.querySelector(".songtime").innerHTML =
            `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`;

        // Remove listener after first use to prevent duplicates
        currentSong.removeEventListener("loadedmetadata", handler);
    });

    if (!pause) {
        currentSong.play();
        play.src = "img/pause.svg";
        
    }
}


function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:5500/spotify-clone/songs/`)
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");
    let cardCont = document.querySelector(".cardContainer");
    let array = Array.from(anchors);
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes("/songs/")) {
            // play.src = "play.svg";
            let parts = e.href.split("/");
            let folder = parts[parts.length - 1]
            //give the metadata from folder

             let a = await fetch(`http://127.0.0.1:5500/spotify-clone/songs/${folder}/info.json`)
        let response = await a.json();
        cardCont.innerHTML = cardCont.innerHTML + `<div data-folder="${folder}" class="card rounded">
                            <div class="play">
                                <svg xmlns="http://www.w3.org/2000/svg" data-encore-id="icon" role="img"
                                    aria-hidden="true" class="e-9960-icon e-9960-baseline" viewBox="0 0 24 24">
                                    <path
                                        d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606">
                                    </path>
                                </svg>
                            </div>
                            <img class="rounded" src="/spotify-clone/songs/${folder}/cover.jpg" alt="">
                            <h4>${response.title}</h4>
                            <p>${response.description}</p>
                        </div>`
        }
    }
     Array.from(document.getElementsByClassName("card")).forEach(card => {
        card.addEventListener("click", async (item) => {
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`);
            let firstTrack = songs[0].split(`${currFolder}`)[1].replace(/^\/+/, "");
        playMusic(firstTrack ,pause = false);
        })
        
    })

}



async function main() {
    songs = await getsongs("songs/ncs");

    //display albums

    displayAlbums();



    //play and pause song with song buttons



    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "img/pause.svg"

        } else {
            currentSong.pause();
            play.src = "img/play.svg";
        }
    })

    //attach eventlistner to on time update

    currentSong.addEventListener("timeupdate", () => {
        // document.querySelector(".songtime").innerHTML = "00/00"
        document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`
        // console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".circle").style.left = ((currentSong.currentTime / currentSong.duration) * 100) + "%";
    })

    //attach event listner to seekbar

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    //add event listner to hamburger

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    })

    //attach eventlistner to close btn

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%";
    })

    //add event listener to next

    next.addEventListener("click", () => {
        let currentTrack = currentSong.src.split(`${currFolder}`)[1].replace(/^\/+/, "")
            ;

        let index = songs.findIndex(s => s.includes(currentTrack));

        if (index < songs.length - 1) {
            let nextTrack = songs[index + 1].split(`${currFolder}`)[1].replace(/^\/+/, "")
                ;
            playMusic(nextTrack);
        }
    })

    //add event listener to previous

    previous.addEventListener("click", () => {
        // currentSong.pause();
        let currentTrack = currentSong.src.split(`${currFolder}`)[1].replace(/^\/+/, "");
        
        let index = songs.findIndex(s => s.includes(currentTrack));

        if (index > 0) {
            let previousTrack = songs[index - 1].split(`${currFolder}`)[1].replace(/^\/+/, "")
                ;
            playMusic(previousTrack);
        }
    })

    //add event listner to change volume

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {

        currentSong.volume = parseInt(e.target.value) / 100;
    })

    //add event listner to card

   //add event listner to volume button to mute unmute

   document.querySelector(".volume img").addEventListener("click",e=>{
    if(e.target.src.includes("volume.svg")){
        e.target.src = e.target.src.replace("volume.svg","mute.svg");
        currentSong.volume = 0
    }
    else{
        e.target.src = e.target.src.replace("mute.svg","volume.svg");
        currentSong.volume = document.querySelector(".range").getElementsByTagName("input")[0].value /100; 
    }
   })

}
main();