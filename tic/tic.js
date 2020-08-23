let answer = document.querySelector('#yes'),
    game = document.querySelector('#game'),
    beg = document.querySelector('#beg'),
    resf = document.querySelector('#res'),
    fin = document.querySelector('#fin'),
    resphr=fin.querySelector('#resPhr'),
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

answer.addEventListener('click', () => {
    beg.classList.add('hide');
    beg.classList.remove('show');
    showGame();

});
resf.addEventListener('click', () => {
    resphr.innerHTML='';
    fin.style.display = 'none';
    showGame();
    current = 'X';
    position1 = [];
    position2 = [];
    counter = 0;
    game.addEventListener('click', choice);
});



let checker = (arr, target) => target.every(v => arr.includes(v));


let current = 'X';
let position1 = [],
    position2 = [],
    counter = 0;

function choice(e) {

    let target = e.target;

    if (target.tagName == 'DIV') {
        counter++;
        if (target.textContent == '' && current == 'X') {
            target.textContent = 'X';
            position1.push([target.getAttribute('data-cell')]);
            current = 'O';






        } else if (target.textContent == '' && current == 'O') {
            target.textContent = 'O';
            position2.push([target.getAttribute('data-cell')]);
            current = 'X';



        }


    }
    if (counter >= 5 && counter < 9) {
        for (let i = 0; i < winningConditions.length; i++) {
            if (checker(position1.flat(), winningConditions[i])) {

                game.removeEventListener('click', choice);
                console.log('X Wins');
                setTimeout("returnRes('X')", 1000);

            } else if (checker(position2.flat(), winningConditions[i])) {
                console.log('O');
                game.removeEventListener('click', choice);
                console.log('O Wins');
                setTimeout("returnRes('O')", 1000);

            }

        }





    } else if (counter == 9) {

        game.removeEventListener('click', choice);
        console.log('NO Wins');
        setTimeout(returnRes, 1000);
    }

    console.log(position1.flat().join(','));
    console.log(position2.flat().join(','));
    console.log(counter);



};

function showGame() {
    game.style.display = 'grid';
    cells.forEach(element => {
        element.textContent = '';

    });

}


function returnRes(a = 'Noone') {
    game.style.display = 'none';
    fin.style.display = 'block';
    resphr.innerHTML=`${a} wins`;
    



}


game.addEventListener('click', choice);