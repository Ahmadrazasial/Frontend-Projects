console.log("working");
let currentSong = new Audio();
// let start = document.querySelectorAll(".start");
async function getsongs() {
    try {
        let a = await fetch("http://127.0.0.1:5500/spotify-clone/songs/")
        let response = await a.text();
        // console.log(response);
        let div = document.createElement("div");
        div.innerHTML = response;
        let as = div.querySelectorAll("a");
        console.log(as)
        // console.log(a);

        let songs = [];
        for (let index = 0; index < as.length; index++) {
            const element = as[index];
            if (element.href.endsWith(".mp3")) {
                songs.push(element.href);
            }
        }

        console.log(songs);
        return songs
    } catch (err) {
        console.log(err.message);
    }
}


const playMusic = (track,pause=false)=>{
    currentSong.src = "/spotify-clone/songs/" + track;
if(!pause){
    currentSong.play();
    play.src = "pause.svg";
    // start.src = "pause.svg";
}
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML =" 00:00/00:00";
}


function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}


async function main() {
let songs = await getsongs();
let firstTrack = songs[0].split("/songs/")[1]
playMusic(firstTrack,pause=true);

let SongUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
for (const song of songs) {
    var audio = new Audio(song);
let track = audio.src.split("/songs/")[1].replaceAll("%20"," ");
console.log(track)
let title = track.split("-")[0];
let artist = track.split("-")[1].replace(".mp3",""); 
// alert(title)
SongUl.innerHTML =  SongUl.innerHTML + `

<li>
                            
                            <div class="info flex">
                                <img class="filter" src="music.svg" alt="music">
                                <div>
                                    <p class="track">${title}</p>
                                    <p class="artist">${artist}</p>
                                </div>
                            </div>
                            <div class="playnow flex">
                                <span>
                                    PlayNow

                                </span>
                                <img class="filter" id= "start" src="play.svg" alt="play">
                            </div>
                        </li>


`;    
// playMusic(song,true);
}
//play songs by clicking on it
Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
    console.log(e);
    e.addEventListener("click",element=>{
        // element.preventDefault();
        let ps = e.querySelector(".info").getElementsByTagName("p");
        let title = ps[0].innerText.trim();
        let artist = ps[1].innerText.trim();
        let track = `${title} - ${artist}.mp3`;

        console.log(track)
    // playMusic(encodeURIComponent(track));
    playMusic(track)
    })

})
//play and pause song with song buttons

play.addEventListener("click",()=>{
    if(currentSong.paused){
        currentSong.play();
        play.src = "pause.svg"
        
    }else{
        currentSong.pause();
        play.src = "play.svg";
    }
})

//attach eventlistner to on time update

currentSong.addEventListener("timeupdate",()=>{
    document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`
    console.log(currentSong.currentTime,currentSong.duration);
    document.querySelector(".circle").style.left = ((currentSong.currentTime/currentSong.duration)* 100) +"%";
})

//attach event listner to seekbar

document.querySelector(".seekbar").addEventListener("click",e=>{
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    console.log(percent);
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = ((currentSong.duration) * percent)/100
})

//add event listner to hamburger

document.querySelector(".hamburger").addEventListener("click",()=>{
    document.querySelector(".left").style.left = "0";
})

//attach eventlistner to close btn

document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".left").style.left = "-120%";
})

}
main();