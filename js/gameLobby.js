let url = window.location.search;
let urlParam = new URLSearchParams(url);
let gameID = urlParam.get('id');
let playerMarker = urlParam.get('playerMarker');


document.getElementById('gameID').innerHTML = `Game ID: ${gameID}`;
document.getElementById('playerMarker').innerHTML = "Your marker for the game is: " + `<b>${playerMarker}</b>`;

window.onload = () =>{
    let sessionMarker = window.sessionStorage.getItem('player');
    let sessionID = window.sessionStorage.getItem('id');
    if(sessionMarker === playerMarker && sessionID === gameID){
        return;
    }
    else if(sessionMarker == null && sessionID == null){
        alert("Request can't be done. Redirecting to home page");
        window.location.href = `./index.html`;
    }
    else {
        alert("Don't change marker or ID");
        window.location.href = `./gameLobby.html?id=` + sessionID + `&playerMarker=` + sessionMarker;
    }
}

// FOR EVERY 2 SECONDS THIS INTERVAL WILL CHECK IF THE GAME HAS ALREADY 2 PLAYERS
setInterval(() =>{
    if(playerMarker === '[GAME ALREADY STARTED]'){
        window.location.href = `./index.html`;
    }
    else if (playerMarker !== 'X' && playerMarker !== 'O'){
        window.location.href = `./gameLobby.html?id=` + gameID + `&playerMarker=X`;
    } else {
        xhr.open('GET', check + gameID, true);

        xhr.onload = () =>{
            if(xhr.responseText == "true"){
                window.location.href = `./game.html?id=` + gameID + `&playerMarker=` + playerMarker;
            }
        }
        xhr.send();
    }
}, 2000);

// QUIT BUTTON
quit = () =>{
    xhr.open('GET', reset + gameID, true);
    xhr.send();
    window.location.href = `./index.html`;
}