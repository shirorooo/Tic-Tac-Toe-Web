document.addEventListener("DOMContentLoaded", function(event){

  document.getElementById('reset').style.display = 'none';
  document.getElementById('winner').style.display = 'none';

  let url = window.location.search;
  let urlParam = new URLSearchParams(url);
  let playerMarker = urlParam.get('playerMarker');
  let gameID = urlParam.get('id');

  document.getElementById('player-marker').innerHTML = `Your marker is: ${playerMarker}`

  const stateChecker =  setInterval(() => {
    let xhr = new XMLHttpRequest;
    xhr.open('GET', 'http://184.72.178.43:8080/TicTacToeServer/tictactoeserver/board?key=' + gameID, true);

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
        clearInterval();
        alert("Game was ended. Redirecting to game lobby...");
        window.location.href = `${window.origin}/index.html`;
      } else {
        document.getElementById('box1').innerHTML = move[0];
        document.getElementById('box2').innerHTML = move[1];
        document.getElementById('box3').innerHTML = move[2];
        document.getElementById('box4').innerHTML = move[3];
        document.getElementById('box5').innerHTML = move[4];
        document.getElementById('box6').innerHTML = move[5];
        document.getElementById('box7').innerHTML = move[6];
        document.getElementById('box8').innerHTML = move[7];
        document.getElementById('box9').innerHTML = move[8];
      }

      checkGameEnding(move);
    }

    xhr.send();

  }, 3000);

  checkGameEnding = (move) =>{
    //HORIZONTAL
    if(move[0] === move[1] && move[0] === move[2] && move[1] === move[2] && move[0] !== "" && move[1] !== "" && move[2] !== ""){
      clearInterval(stateChecker);
      document.getElementById('winner').style.display = 'block';
      document.getElementById('winner').innerHTML = `Game End: Winner ${move[0]}`;
      alert(`Game End: Winner ${move[0]}`);
      document.getElementById('quit').style.display = 'none';
      document.getElementById('reset').style.display = 'block';
    }
    else if(move[3] === move[4] && move[3] === move[5] && move[4] === move[5] && move[3] !== "" && move[4] !== "" && move[5] !== ""){
      clearInterval(stateChecker);
      document.getElementById('winner').style.display = 'block';
      document.getElementById('winner').innerHTML = `Game End: Winner ${move[3]}`;
      alert(`Game End: Winner ${move[3]}`);
      document.getElementById('quit').style.display = 'none';
      document.getElementById('reset').style.display = 'block';
    }
    else if(move[6] === move[7] && move[6] === move[8] && move[7] === move[8] && move[6] !== "" && move[7] !== "" && move[8] !== ""){
      clearInterval(stateChecker);
      document.getElementById('winner').style.display = 'block';
      document.getElementById('winner').innerHTML = `Game End: Winner ${move[6]}`;
      alert(`Game End: Winner ${move[6]}`);
      document.getElementById('quit').style.display = 'none';
      document.getElementById('reset').style.display = 'block';
    }

    // VERTICAL
    else if(move[0] === move[3] && move[0] === move[6] && move[3] === move[6] && move[0] !== "" && move[3] !== "" && move[6] !== ""){
      clearInterval(stateChecker);
      document.getElementById('winner').style.display = 'block';
      document.getElementById('winner').innerHTML = `Game End: Winner ${move[0]}`;
      alert(`Game End: Winner ${move[0]}`);
      document.getElementById('quit').style.display = 'none';
      document.getElementById('reset').style.display = 'block';
    }
    else if(move[1] === move[4] && move[1] === move[7] && move[4] === move[7] && move[1] !== "" && move[4] !== "" && move[7] !== ""){
      clearInterval(stateChecker);
      document.getElementById('winner').style.display = 'block';
      document.getElementById('winner').innerHTML = `Game End: Winner ${move[1]}`;
      alert(`Game End: Winner ${move[1]}`);
      document.getElementById('quit').style.display = 'none';
      document.getElementById('reset').style.display = 'block';
    }
    else if(move[2] === move[5] && move[2] === move[8] && move[5] === move[8] && move[2] !== "" && move[5] !== "" && move[8] !== ""){
      clearInterval(stateChecker);
      document.getElementById('winner').style.display = 'block';
      document.getElementById('winner').innerHTML = `Game End: Winner ${move[2]}`;
      alert(`Game End: Winner ${move[2]}`);
      document.getElementById('quit').style.display = 'none';
      document.getElementById('reset').style.display = 'block';
    }

    // DIAGONAL
    else if(move[0] === move[4] && move[0] === move[8] && move[4] === move[8] && move[0] !== "" && move[4] !== "" && move[8] !== ""){
      clearInterval(stateChecker);
      document.getElementById('winner').style.display = 'block';
      document.getElementById('winner').innerHTML = `Game End: Winner ${move[0]}`;
      alert(`Game End: Winner ${move[0]}`);
      document.getElementById('quit').style.display = 'none';
      document.getElementById('reset').style.display = 'block';
    }
    else if(move[2] === move[4] && move[2] === move[6] && move[4] === move[6] && move[2] !== "" && move[4] !== "" && move[6] !== ""){
      clearInterval(stateChecker);
      document.getElementById('winner').style.display = 'block';
      document.getElementById('winner').innerHTML = `Game End: Winner ${move[2]}`;
      alert(`Game End: Winner ${move[2]}`);
      document.getElementById('quit').style.display = 'none';
      document.getElementById('reset').style.display = 'block';
    }

    // DRAW
    else if(!move.includes("")){
      clearInterval(stateChecker);
      document.getElementById('winner').style.display = 'block';
      document.getElementById('winner').innerHTML = `Game End: Game Draw`;
      alert(`Game End: Game Draw`);
      document.getElementById('quit').style.display = 'none';
      document.getElementById('reset').style.display = 'block';
    }
    
  }

  tileMove = (x, y) =>{
    let xhr = new XMLHttpRequest;
    let move = "";

    xhr.open('GET', 'http://184.72.178.43:8080/TicTacToeServer/tictactoeserver/move?key=' + gameID + '&tile=' + playerMarker + '&y=' + y + '&x=' + x, true);

    xhr.onload = () =>{
      if(xhr.responseText === "[TAKEN]"){
        alert("The move has already been populated!");
      }
    }

    xhr.send();
  }

  boxOne = () =>{
    const x = 0;
    const y = 0;
    tileMove(x, y);
    document.getElementById('column').disabled = true;
  }
  boxTwo = () =>{
    const x = 1;
    const y = 0;
    tileMove(x, y);
    document.getElementById('column').disabled = true;
  }
  boxThree = () =>{
    const x = 2;
    const y = 0;
    tileMove(x, y);
    document.getElementById('column').disabled = true;
  }
  boxFour = () =>{
    const x = 0;
    const y = 1;
    tileMove(x, y);
    document.getElementById('column').disabled = true;
  }
  boxFive = () =>{
    const x = 1;
    const y = 1;
    tileMove(x, y);
    document.getElementById('column').disabled = true;
  }
  boxSix = () =>{
    const x = 2;
    const y = 1;
    tileMove(x, y);
    document.getElementById('column').disabled = true;
  }
  boxSeven = () =>{
    const x = 0;
    const y = 2;
    tileMove(x, y);
    document.getElementById('column').disabled = true;
  }

  boxEight = () =>{
    const x = 1;
    const y = 2;
    tileMove(x, y);
    document.getElementById('column').disabled = true;
  }
  boxNine = () =>{
    const x = 2;
    const y = 2;
    tileMove(x, y);
    document.getElementById('column').disabled = true;
  }

  quit = () =>{
    let xhr = new XMLHttpRequest;
    xhr.open('GET', 'http://184.72.178.43:8080/TicTacToeServer/tictactoeserver/reset?key=' + gameID, true);

    xhr.onload = () =>{
      clearInterval();
      window.location.href = `${window.origin}/index.html`;
    }

    xhr.send();
  }
});