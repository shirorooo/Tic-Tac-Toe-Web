document.addEventListener("DOMContentLoaded", function(event) { 
    let url = window.location.search;
    let urlParam = new URLSearchParams(url);
    let gameID = urlParam.get('id');
    let playerMarker = urlParam.get('playerMarker');

    document.getElementById('gameID').innerHTML = `Game ID: ${gameID}`;
    document.getElementById('playerMarker').innerHTML = "Your marker for the game is: " + `<b>${playerMarker}</b>`;

    setInterval(() =>{

        let xhr = new XMLHttpRequest;

        xhr.open('GET', 'http://184.72.178.43:8080/TicTacToeServer/tictactoeserver/check?key=' + gameID, true);

        xhr.onload = () =>{
            if(xhr.readyState == 4 && xhr.status == 200){
                if(xhr.responseText == "true"){
                clearInterval();
                window.location.href = `${window.origin}/game.html?id=` + gameID + `&playerMarker=` + playerMarker;
                }
            } else {
                alert("Can't connect to server. Please contact admin.");
            }
        }
        xhr.send();

    }, 2000);

});