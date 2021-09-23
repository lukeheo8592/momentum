const clock = document.querySelector("#clock");
const time = document.querySelector("#greeting #time");
function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const mins = String(date.getMinutes()).padStart(2, "0");
  const secs = String(date.getSeconds()).padStart(2, "0");
  getTime(parseInt(hours));
  clock.innerText = `${hours}:${mins}:${secs}`;
}
function getTime(hours){
  if(hours >= 22){
    time.innerText = "Good night,";
  }else if(hours >= 18){
    time.innerText = "Good eveing,";
  }else if (hours >= 12){
    time.innerText = "Good afternoon,";
  }else{
    time.innerText = "Good morning,";
  }
}
setInterval(getClock, 1000);
