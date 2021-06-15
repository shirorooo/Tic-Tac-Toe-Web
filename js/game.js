let url = window.location.search;
let urlParam = new URLSearchParams(url);
let playerMarker = urlParam.get('playerMarker');
let gameID = urlParam.get('id');
let isPlayerMoved = false;

document.getElementById('reset').style.display = 'none';
document.getElementById('winner').style.display = 'none';
document.getElementById('overlay').style.display = "block";
document.getElementById('quit').style.display = "none";

document.getElementById('player-marker').innerHTML = `Your marker is: ${playerMarker}`

// CHECK THE BOARD EVERY 2 SEC
const stateChecker =  setInterval(() => {
  xhr.open('GET', board + gameID, true);

  xhr.onload = () =>{

    let move = [xhr.responseText.split(":")[0],
      xhr.responseText.split(":")[1],
      xhr.responseText.split(":")[2],
      xhr.responseText.split(":")[3],
      xhr.responseText.split(":")[4],
      xhr.responseText.split(":")[5],
      xhr.responseText.split(":")[6],
      xhr.responseText.split(":")[7],
      xhr.responseText.split(":")[8]
  ];

    if(move[0] === "[GAME NOT YET STARTED]"){
      newGame();
    }
    else {
      for(let i=0; i<move.length; i++){
        document.getElementById(`box${i+1}`).innerHTML = move[i];
      }
    }
    // CALL THE CHECKER OF STATE OF THE GAME
    checkGameState(move);
  }
  xhr.send();
}, 1000);

// WILL CHECK THE STATE OF THE GAME
checkGameState = (move) =>{

  // WILL CHECK WHO'S PLAYER TURN
    let count = 0;

    move.forEach(tile => {
      if(tile !== ""){
        count++;
      }
    });

    if(!isPlayerMoved){
      if(count % 2 !== 0 && playerMarker === "O"){
        document.getElementById("overlay").style.display = "none";
        document.getElementById("quit").style.display = "block";
      }
      else if(count % 2 === 0 && playerMarker === "X"){
        document.getElementById("overlay").style.display = "none";
        document.getElementById("quit").style.display = "block";
      }
    }

  // WILL CHECK IF THE GAME IS DRAW OR THERE'S A WINNER 
  //HORIZONTAL
  if(move[0] === move[1] && move[0] === move[2] && move[1] === move[2] && move[0] !== "" && move[1] !== "" && move[2] !== ""){
    gameEndOverlay(`Game End: Winner ${move[0]}`);
  }
  else if(move[3] === move[4] && move[3] === move[5] && move[4] === move[5] && move[3] !== "" && move[4] !== "" && move[5] !== ""){
    gameEndOverlay(`Game End: Winner ${move[3]}`);
  }
  else if(move[6] === move[7] && move[6] === move[8] && move[7] === move[8] && move[6] !== "" && move[7] !== "" && move[8] !== ""){
    gameEndOverlay(`Game End: Winner ${move[6]}`);
  }

  // VERTICAL
  else if(move[0] === move[3] && move[0] === move[6] && move[3] === move[6] && move[0] !== "" && move[3] !== "" && move[6] !== ""){
    gameEndOverlay(`Game End: Winner ${move[0]}`);
  }
  else if(move[1] === move[4] && move[1] === move[7] && move[4] === move[7] && move[1] !== "" && move[4] !== "" && move[7] !== ""){
    gameEndOverlay(`Game End: Winner ${move[1]}`);
  }
  else if(move[2] === move[5] && move[2] === move[8] && move[5] === move[8] && move[2] !== "" && move[5] !== "" && move[8] !== ""){
    gameEndOverlay(`Game End: Winner ${move[2]}`);
  }

  // DIAGONAL
  else if(move[0] === move[4] && move[0] === move[8] && move[4] === move[8] && move[0] !== "" && move[4] !== "" && move[8] !== ""){
    gameEndOverlay(`Game End: Winner ${move[0]}`);
  }
  else if(move[2] === move[4] && move[2] === move[6] && move[4] === move[6] && move[2] !== "" && move[4] !== "" && move[6] !== ""){
    gameEndOverlay(`Game End: Winner ${move[2]}`);
  }

  // DRAW
  else if(!move.includes("")){
    gameEndOverlay(`Game End: Game Draw`);
  }
  isPlayerMoved = false;
}

// DISPLAY THE OVERLAY OF THE BOARD
gameEndOverlay = (overlayDisplay) =>{
  document.getElementById('winner').style.display = 'block';
  document.getElementById('quit').style.display = 'none';
  document.getElementById('reset').style.display = 'block';
  document.getElementById('player-turn').innerHTML = overlayDisplay;
  document.getElementById('player-turn').style.marginTop = "200px";
  document.getElementById('overlay').style.display = "block";
  document.getElementById('player-wait').style.display = 'none';
  clearInterval(stateChecker);
  checkReset();
}

// WILL CALL THE SERVICE TO MOVE A TILE
tileMove = (x, y) =>{
  xhr.open('GET', move + gameID + '&tile=' + playerMarker + '&y=' + y + '&x=' + x, true);
  xhr.send();
}

// MOVES
boxMove = (x, y) =>{
    document.getElementById("overlay").style.display = "block";
    document.getElementById('player-turn').innerHTML = 'Waiting for opponents turn...';
    document.getElementById('quit').style.display = 'none';
    gameWait = 0;
    isPlayerMoved = true;
    tileMove(x, y);
}

// QUIT BUTTON
quit = () =>{
  xhr.open('GET', reset + gameID, true);

  xhr.onload = () =>{
    window.location.href = `./index.html`;
  }

  xhr.send();
}

// RESET BUTTON
resetGame = () =>{
  let newGameInterval;
  xhr.open('GET', reset + gameID, true);
  xhr.onload = () =>{
    newGameInterval = xhr.response;
  }
  xhr.send();

  if(newGameInterval === "[EXIT]"){
    newGame();
  }
}

newGame = () =>{
  xhr.open("GET", create + gameID, true);
  xhr.onload = () =>{
    marker = xhr.responseText;
    window.sessionStorage.setItem('player', marker);
    window.location.href = `./gameLobby.html?id=` + gameID + `&playerMarker=` + marker;
  }
  xhr.send();
}

// WILL CHECK IF THE GAME WAS RESET
checkReset = () =>{
  let resetChecker = "";
  setInterval(() =>{
    xhr.open('GET', check + gameID, true);
    xhr.onload = () =>{
      resetChecker = xhr.responseText;
    }
    xhr.send();
    if(resetChecker === 'false'){
      document.getElementById('reset').style.display = 'none';
      document.getElementById('quit').style.display = 'none';
      newGame();
    }
  }, 800);
}

window.onload = () =>{
  let sessionMarker = window.sessionStorage.getItem('player');
  let sessionID = window.sessionStorage.getItem('id');
  if(sessionMarker === playerMarker && sessionID === gameID){
      return
  }
  else if(sessionMarker == null && sessionID == null){
    alert("Request can't be done. Redirecting to home page");
    window.location.href = `./index.html`;
  }
  else {
    alert("Don't change marker or ID");
    window.location.href = `./game.html?id=` + sessionID + `&playerMarker=` + sessionMarker;
  }
}