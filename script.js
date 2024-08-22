const popup = document.querySelector(".popup"),
wifiIcon = document.querySelector(".icon i"),
popupTitle = document.querySelector(".popup .title"),
popupDesc = document.querySelector(".popup .desc"),
reconnectBtn = document.querySelector(".reconnect");
let isOnline = true;
let intervalid, timer = 10;

function checkConnection(){
    return fetch("https://www.google.com/", 
        { mode: "no-cors"})
        .then(() => {
            isOnline = true
            handlePopup(isOnline);
        })
        .catch(() => {
            clearInterval(intervalid)
            timer = 10;
            isOnline = false
            handlePopup(isOnline);
        });
}

const handlePopup = (status) => {
    if(status){
        wifiIcon.className = "uil uil-wifi";
        popupTitle.innerText = "Restored Connection";
        popupDesc.innerHTML = "Your device is now successfully connected to the internet";
        popup.classList.add("online");
        
        return setTimeout(() => popup.classList.remove("show"), 2000);
    }
    wifiIcon.className = "uil uil-wifi-slash";
    popupTitle.innerText = "Lost Connection";
    popupDesc.innerHTML = "Your network is unavailable we will attempt to reconnect you in <b>10</b> seconds.";
    popup.className = "popup show";

    intervalid = setInterval(() => {
        timer--;
        if(timer === 0) checkConnection();
        popup.querySelector(".desc b").innerHTML = timer;
    }, 1000);
}

setInterval(() => isOnline && checkConnection(), 3000);
reconnectBtn.addEventListener("click", checkConnection);