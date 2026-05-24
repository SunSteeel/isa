

const music =
document.getElementById(
  "bgMusic"
);

const toggle =
document.getElementById(
  "musicToggle"
);

const icon =
toggle.querySelector(
  ".icon"
);

const musicOn =
"../../assets/images/on.png";

const musicOff =
"../../assets/images/off.png";




const maxVolume = 0.10; 

const fadeSpeed = 70; 
const fadeStep = 0.004;

const returnDelay = 4000; 


music.volume = 0;

let playing = false;
let fadeInterval = null;
let returnTimeout = null;


async function startMusic(){

  clearInterval(fadeInterval);
  clearTimeout(returnTimeout);

  playing = true;
  icon.src = musicOn;

  try{

    if(music.paused){
      await music.play();
    }

    let volume = music.volume;

    fadeInterval = setInterval(() => {

      if(volume >= maxVolume){

        volume = maxVolume;
        clearInterval(fadeInterval);
        return;
      }

      volume += fadeStep;

      music.volume = Math.min(
        volume,
        maxVolume
      );

    }, fadeSpeed);

  }catch(error){

    console.log(
      "play error:",
      error
    );
  }
}




function stopMusic(){

  clearInterval(fadeInterval);
  clearTimeout(returnTimeout);

  playing = false;
  icon.src = musicOff;

  fadeInterval = setInterval(() => {

    if(
      music.volume <= fadeStep
    ){

      clearInterval(
        fadeInterval
      );

      music.pause();
      music.volume = 0;

      return;
    }

    music.volume -= fadeStep;

  }, fadeSpeed);
}




window.addEventListener(
  "load",
  async () => {

    await startMusic();

  }
);




toggle.addEventListener(
  "click",
  async (e) => {

    e.stopPropagation();

    toggle.classList.remove(
      "switching"
    );

    void toggle.offsetWidth;

    toggle.classList.add(
      "switching"
    );

    if(playing){

      stopMusic();

    }else{

      await startMusic();

    }

  }
);



const portal =
document.getElementById(
  "musicPortal"
);

if(portal){

  portal.appendChild(
    toggle
  );

}




const allAudios =
document.querySelectorAll(
  "audio"
);

allAudios.forEach(audio => {

  if(
    audio.id ===
    "bgMusic"
  ) return;

  audio.addEventListener(
    "play",
    () => {

      stopMusic();

      allAudios.forEach(other => {

        if(
          other !== audio
          &&
          other !== music
        ){

          other.pause();

        }

      });

    }
  );

  audio.addEventListener(
    "pause",
    () => {

      const someonePlaying =
      [...allAudios].some(a =>

        a !== music
        &&
        !a.paused

      );

      if(
        !someonePlaying
      ){

        returnTimeout =
        setTimeout(() => {

          startMusic();

        }, returnDelay);

      }

    }
  );

});