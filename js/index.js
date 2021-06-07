document.addEventListener("DOMContentLoaded", function(event) { 

    document.getElementsByClassName('join-lobby')[0].style.display = 'none';
    

    //CREATE LOBBY BUTTON
    createGame = () => {
        let randomID = Math.floor(Math.random() * 1000);
        let date = new Date();
        let day = String(date.getDay());
        let month = String(date.getMonth());
        let year = String(date.getFullYear());
        let gameID = randomID + day + month + year;
        let playerMarker = "";
        // --------------------------------------HTTP REQUEST--------------------------------------
        let xhr = new XMLHttpRequest;
        xhr.open("GET", "http://184.72.178.43:8080/TicTacToeServer/tictactoeserver/createGame?key=" + gameID, true);

        xhr.onload = () =>{
            if(xhr.readyState == 4 && xhr.status == 200){
                playerMarker = xhr.responseText;
            alert("Welcome player! Your game marker is: " + playerMarker);
            window.location.href = `${window.origin}/gameLobby.html?id=` + gameID + `&playerMarker=` + playerMarker;
            } else {
                alert("Can't connect to server. Please contact admin.");
            }
            
        }
        xhr.send();
    }

    // JOIN LOBBY GAME BUTTON
    enterLobby = () =>{
        document.getElementsByClassName('join-lobby')[0].style.display = 'block';
        document.getElementsByClassName('create-game')[0].style.display = 'none';
    }

    // EXIT BUTTON
    returnLobby = () =>{
        document.getElementsByClassName('join-lobby')[0].style.display = 'none';
        document.getElementsByClassName('create-game')[0].style.display = 'flex';
    }

    // JOIN GAME BUTTON
    joinGame = () =>{
        let gameID = document.getElementById('join-game').value;
        // --------------------------------------HTTP REQUEST--------------------------------------
        let xhr = new XMLHttpRequest;
        xhr.open("GET", "http://184.72.178.43:8080/TicTacToeServer/tictactoeserver/createGame?key=" + gameID, true);

        xhr.onload = () =>{
            if(xhr.readyState == 4 && xhr.status == 200){
                playerMarker = xhr.responseText;
                alert("Welcome player! Your game marker is: " + playerMarker);
                window.location.href = `${window.origin}/gameLobby.html?id=` + gameID + `&playerMarker=` + playerMarker;
            } else {
                alert("Can't connect to server. Please contact admin.");
            }
        }
        xhr.send();

    }
});