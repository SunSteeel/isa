// timer.js

const release = {

  year: 2026,
  month: 5,
  day: 22,
  hour: 20,
  minute: 11

};


const releaseDate =
new Date(

  release.year,
  release.month - 1,
  release.day,
  release.hour,
  release.minute,
  0

).getTime();



const hoursElement =
document.getElementById(
  'hours'
);

const minutesElement =
document.getElementById(
  'minutes'
);

const secondsElement =
document.getElementById(
  'seconds'
);

const loaderContainer =
document.querySelector(
  '.loader-container'
);

const enterButton =
document.getElementById(
  'enterButton'
);

let released = false;



async function openSite(){

  const unlockAudio =
  document.getElementById(
    "unlockAudio"
  );

  try{

    if(unlockAudio){

      unlockAudio.volume = 0.01;

      await unlockAudio.play();

    }

  }catch(error){

    console.log(
      "erro unlock:",
      error
    );

  }

  localStorage.setItem(
    "musicAllowed",
    "true"
  );

  loaderContainer.classList.add(
    'fade-out'
  );

  setTimeout(() => {

    window.location.href =
    "pages/memories.html";

  }, 1500);

}

async function getOnlineTime(){

  try{

    const response =
    await fetch(
      'https://timeapi.io/api/Time/current/zone?timeZone=America/Sao_Paulo'
    );

    const data =
    await response.json();

    return new Date(

      data.year,
      data.month - 1,
      data.day,
      data.hour,
      data.minute,
      data.seconds

    ).getTime();

  }catch(error){

    console.error(
      'Erro ao pegar horário online:',
      error
    );


    return Date.now();

  }

}


async function updateCountdown(){

  const now =
  await getOnlineTime();

  const diff =
  releaseDate - now;



  if(diff <= 0){

    hoursElement.innerText =
    "00";

    minutesElement.innerText =
    "00";

    secondsElement.innerText =
    "00";

    if(!released){

      released = true;

      clearInterval(interval);

      enterButton.disabled =
      false;

      enterButton.innerText =
      "abrir carta ♡";

      enterButton.classList.add(
        'active'
      );

      enterButton.onclick =
      openSite;

    }

    return;

  }



  const totalHours =
  Math.floor(
    diff / (1000 * 60 * 60)
  );

  const minutes =
  Math.floor(
    (diff / (1000 * 60)) % 60
  );

  const seconds =
  Math.floor(
    (diff / 1000) % 60
  );

  hoursElement.innerText =
  String(totalHours).padStart(
    2,
    '0'
  );

  minutesElement.innerText =
  String(minutes).padStart(
    2,
    '0'
  );

  secondsElement.innerText =
  String(seconds).padStart(
    2,
    '0'
  );

}


updateCountdown();

const interval =
setInterval(
  updateCountdown,
  1000
);