document.addEventListener("DOMContentLoaded", function(event){

  document.getElementById('reset').style.display = 'none';
  document.getElementById('winner').style.display = 'none';

  let url = window.location.search;
  let urlParam = new URLSearchParams(url);
  let playerMarker = urlParam.get('playerMarker');
  let gameID = urlParam.get('id');

  document.getElementById('player-marker').innerHTML = `Your marker is: ${playerMarker}`

  setInterval(() => {
    let xhr = new XMLHttpRequest;
    xhr.open('GET', 'http://184.72.178.43:8080/TicTacToeServer/tictactoeserver/board?key=' + gameID, true);

    xhr.onload = () =>{
      // const boxOne = xhr.responseText.split(":")[0];
      // const boxTwo = xhr.responseText.split(":")[1];
      // const boxThree = xhr.responseText.split(":")[2];
      // const boxFour = xhr.responseText.split(":")[3];
      // const boxFive = xhr.responseText.split(":")[4];
      // const boxSix = xhr.responseText.split(":")[5];
      // const boxSeven = xhr.responseText.split(":")[6];
      // const boxEight = xhr.responseText.split(":")[7];
      // const boxNine = xhr.responseText.split(":")[8];

      let move = [xhr.responseText.split(":")[0],
      xhr.responseText.split(":")[1],
      xhr.responseText.split(":")[2],
      xhr.responseText.split(":")[3],
      xhr.responseText.split(":")[4],
      xhr.responseText.split(":")[6],
      xhr.responseText.split(":")[7],
      xhr.responseText.split(":")[8]
    ];

      if(boxOne == "[GAME NOT YET STARTED]"){
        alert("The other player has left! Redirecting to game lobby...");
        setTimeout(() =>{
          window.location.href = `${window.origin}/index.html`;
        }, 1000);
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

      if(xhr.responseText.split(":").includes("")){
        // alert(xhr.responseText.split(":"));
        // alert("It still contains blank");
      }
      // checkGameEnding(boxOne, boxTwo, boxThree, boxFour, boxFive, boxSix, boxSeven, boxEight, boxNine);
    }

    xhr.send();

  }, 1000);

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
  }
  boxTwo = () =>{
    const x = 1;
    const y = 0;
    tileMove(x, y);
  }
  boxThree = () =>{
    const x = 2;
    const y = 0;
    tileMove(x, y);
  }
  boxFour = () =>{
    const x = 0;
    const y = 1;
    tileMove(x, y);
  }
  boxFive = () =>{
    const x = 1;
    const y = 1;
    tileMove(x, y);
  }
  boxSix = () =>{
    const x = 2;
    const y = 1;
    tileMove(x, y);
  }
  boxSeven = () =>{
    const x = 0;
    const y = 2;
    tileMove(x, y);
  }

  boxEight = () =>{
    const x = 1;
    const y = 2;
    tileMove(x, y);
  }
  boxNine = () =>{
    const x = 2;
    const y = 2;
    tileMove(x, y);
  }

  quit = () =>{
    let xhr = new XMLHttpRequest;
    xhr.open('GET', 'http://184.72.178.43:8080/TicTacToeServer/tictactoeserver/reset?key=' + gameID, true);

    xhr.onload = () =>{
      window.location.href = `${window.origin}/index.html`;
    }

    xhr.send();
  }
});