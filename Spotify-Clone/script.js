console.log("working");

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
}async function main() {
    

let songs = await getsongs();

let SongUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
for (const song of songs) {
    var audio = new Audio(song);
let track = audio.src.split("/songs/")[1].replaceAll("%20"," ");
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
                                <img class="filter" src="play.svg" alt="play">
                            </div>
                        </li>


`;    
}


var audio = new Audio(songs[0]);



// audio.play();

audio.addEventListener("loadeddata",()=>{
    let duration = audio.duration;
    console.log(duration)
})
}
main();