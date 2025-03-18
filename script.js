console.log("Let's write JavaScript");

async function getsongs() {
    let a = await fetch("http://127.0.0.1:5502/songs/");
    let response = await a.text();
    console.log(response);

    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;
}

async function main() {
    let songs = await getsongs();
    console.log(songs);

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for(const song of songs){
        songUL.innerHTML = songUL.innerHTML +`<li> <img class="invert "src="music.svg" alt="">
    
    <div class="info">
      <div>Song  ${song.replaceAll("%20","")}</div>
      <div>Song Hite</div>
    </div>
    <div class="playnow">
      <span>Play Now</span>
      <img class="invert" src="play.svg" alt="">
    </div>
    
        
     </li>`;
    }

    if (songs.length === 0) {
        console.error("No songs found");
        return;
    }

    var audio = new Audio(songs[0]);

    // Play only after user clicks a button
    
    audio.addEventListener("loadeddata", () => {
        console.log("Duration:", audio.duration,audio.currentSrc,audio.currentTime);
    });
}

main();
