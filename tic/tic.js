let chooseAI = document.querySelector('#yes'),
  chooseFriend = document.querySelector('#no'),
  game = document.querySelector('#game'),
  beg = document.querySelector('#beg'),
  resf = document.querySelector('#res'),
  scorer=document.querySelector('#score'),
  player1Score=document.querySelector('#You'),
  player2Score=document.querySelector('#Player2'),
  fin = document.querySelector('#fin'),
  resphr = fin.querySelector('#resPhr'),
  cells = document.querySelectorAll('[data-cell]'),
  winningConditions = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["2", "4", "6"],
  ];


player1=0;
player2=0;
const human = 'X';
const ai = "O";
let comp = false,
  friend = false;
chooseAI.addEventListener('click', () => {
  comp = true;
  scorer.classList.add('show');
  scorer.classList.remove('hide');
  beg.classList.add('hide');
  beg.classList.remove('show');
  showGame();
  howToPlay();

});
chooseFriend.addEventListener('click', () => {
  friend = true;
  scorer.classList.add('show');
  scorer.classList.remove('hide');
  beg.classList.add('hide');
  beg.classList.remove('show');
  showGame();
  howToPlay();

});

resf.addEventListener('click', () => {
  resphr.innerHTML = '';
  fin.style.display = 'none';
  scorer.classList.add('show');
  scorer.classList.remove('hide');
  showGame();
  howToPlay();
  position = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  counter = 0;
  current='X';
  game.addEventListener('click', choice);
});

let checker = (arr, target) => target.every(v => arr.includes(v));

function emptyPos(position) {
  return position.filter(s => s != "O" && s != "X");
}

function winning(board, player) {
  let pos = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] == player) {
      pos.push(`${i}`)
    }
  }
  for (let i = 0; i < winningConditions.length; i++) {
    if (checker(pos, winningConditions[i])) {
      return true
    }

  }
}

function minmax(position, current) {


  let availPos = emptyPos(position);


  if (winning(position, human)) {
    return {
      score: -10
    };
  } else if (winning(position, ai)) {
    return {
      score: 10
    };
  } else if (availPos.length === 0) {
    return {
      score: 0
    };
  }

  let moves = [];
  for (let i = 0; i < availPos.length; i++) {
    var move = {};
    move.index = position[availPos[i]];


    position[availPos[i]] = current;


    if (current == ai) {
      var result = minmax(position, human);
      move.score = result.score;
    } else {
      var result = minmax(position, ai);
      move.score = result.score;
    }


    position[availPos[i]] = move.index;

    moves.push(move);
  }

  let bestMove = 0;
  if (current === ai) {
    let bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {

    let bestScore = 10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

function bestSpot() {
  return minmax(position, ai).index
}





let position = [0, 1, 2, 3, 4, 5, 6, 7, 8],
  counter = 0;

function choiceAI(e) {


  let target = e.target;

  if (target.tagName == 'SPAN' && target) {
    counter++;
    if (target.textContent == '') {
      target.textContent = 'X';
      position[target.getAttribute('data-cell')] = 'X';
      let a = bestSpot();
      position[a] = 'O'

      cells.forEach(element => {
        if (element.getAttribute('data-cell') == a) {
          element.textContent = 'O';


        }
      })
    }


  }
  if (counter >= 3 && counter < 5) {
    if (winning(position, human)) {

      game.removeEventListener('click', choiceAI);
      console.log('X Wins');
      player1+=1;
      player1Score.innerHTML='';
      player1Score.textContent=`Player 1: ${player1}`;
      setTimeout("returnRes('You win')", 1000);

    } else if (winning(position, ai)) {
      game.removeEventListener('click', choiceAI);
      console.log('O Wins');
      player2Score.innerHTML='';
      player2+=1;
      player2Score.textContent=`Player 2: ${player2}`;
      setTimeout("returnRes('AI wins')", 1000);

    }





  } else if (counter == 5) {

    game.removeEventListener('click', choiceAI);
    console.log('NO Wins');
    setTimeout(returnRes, 1000);
  }


  console.log(counter);
  console.log(position);



};

let current = 'X';

function choiceFD(e) {


  let target = e.target;

  if (target.tagName == 'SPAN' && target) {
    counter++;
    
    if (target.textContent == '' && current == 'X') {
      target.textContent = 'X';
      position[target.getAttribute('data-cell')] = 'X';
      current = 'O';






    } else if (target.textContent == '' && current == 'O') {
      target.textContent = 'O';
      position[target.getAttribute('data-cell')] = 'O';
      current = 'X';



    }


  }
  if (counter >= 5 && counter <= 9 && (winning(position, human)|| winning(position, ai))) {
    if (winning(position, human)) {

      game.removeEventListener('click', choiceFD);
      console.log('X Wins');
      player1+=1;
      player1Score.innerHTML='';
      player1Score.textContent=`Player 1: ${player1}`;
      setTimeout("returnRes('You win')", 1000);

    } else if (winning(position, ai)) {
      game.removeEventListener('click', choiceFD);
      console.log('O Wins');
      player2+=1;
      player2Score.innerHTML='';
      player2Score.textContent=`Player 2: ${player2}`;
      
      setTimeout("returnRes('Friend wins')", 1000);

    }





  } else if (counter == 9 && !winning(position, human)&& !winning(position, ai)) {

    game.removeEventListener('click', choiceFD);
    console.log('NO Wins');
    setTimeout(returnRes, 1000);
    
  }


  console.log(counter);
  console.log(position);



};

function showGame() {
  game.style.display = 'grid';
  cells.forEach(element => {
    element.textContent = '';

  });

}


function returnRes(a = 'Noone') {
  game.style.display = 'none';
  scorer.classList.add('hide');
  scorer.classList.remove('show');
  fin.style.display = 'block';
  resphr.innerHTML = `${a}`;




}

function howToPlay() {
  if (comp) {
    game.addEventListener('click', choiceAI);
  } else if (friend) {
    game.addEventListener('click', choiceFD);
  }
}