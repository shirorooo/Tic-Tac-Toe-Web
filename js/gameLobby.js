document.addEventListener("DOMContentLoaded", function(event) { 
    let url = window.location.search;
    let urlParam = new URLSearchParams(url);
    let gameID = urlParam.get('id');
    let playerMarker = urlParam.get('playerMarker');
    let gameWait = 0; 

    document.getElementById('gameID').innerHTML = `Game ID: ${gameID}`;
    document.getElementById('playerMarker').innerHTML = "Your marker for the game is: " + `<b>${playerMarker}</b>`;

    const playerChecker = setInterval(() =>{
        let xhr = new XMLHttpRequest;
        // IF THE GAME WAITS FOR 2MIN IT WILL RESET THE GAME AND REDIRECT TO MAIN PAGE
        if(gameWait === 15){
            xhr.open('GET', 'http://184.72.178.43:8080/TicTacToeServer/tictactoeserver/reset?key=' + gameID, true);
            xhr.send();
            window.location.href = `./index.html`;
        } else {
            xhr.open('GET', 'http://184.72.178.43:8080/TicTacToeServer/tictactoeserver/check?key=' + gameID, true);

            xhr.onload = () =>{
                if(xhr.responseText == "true"){
                    window.location.href = `./game.html?id=` + gameID + `&playerMarker=` + playerMarker;
                }
            }
            xhr.send();

            if(playerMarker !== "X" && playerMarker !== "O"){
                window.location.href = `./index.html`;
            }
        }
        gameWait++;
    }, 2000);

});