const clock = document.querySelector("#clock");
function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const mins = String(date.getMinutes()).padStart(2, "0");
  const secs = String(date.getSeconds()).padStart(2, "0");

  clock.innerText = `${hours}:${mins}:${secs}`;
}


setInterval(getClock, 1000);
