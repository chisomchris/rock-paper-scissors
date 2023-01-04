"use strict";
const buttons = document.querySelectorAll('.frame > button');
let score = 0;
const scoreElem = document.querySelector('.score p');
scoreElem.textContent = `${score}`;
const frame = document.querySelector('.frame');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const player = button.dataset.type;
        const computer = randFace(rps);
        frame.classList.add('hide');
        const container = frame.parentElement;
        const rules = document.querySelector('.rules');
        const frame1 = document.createElement('div');
        frame1.setAttribute('class', 'frame step_one');
        container.insertBefore(frame1, rules);
        const playerDiv = document.createElement('div');
        const playerPara = document.createElement('p');
        const playerBtn = document.createElement('button');
        const playerBtnImg = document.createElement('img');
        playerPara.textContent = 'you picked';
        playerBtn.setAttribute('class', `${player}`);
        playerBtnImg.setAttribute('src', `./images/icon-${player}.svg`);
        playerBtnImg.setAttribute('alt', `${player} button`);
        playerBtn.appendChild(playerBtnImg);
        playerDiv.append(playerPara, playerBtn);
        const computerDiv = document.createElement('div');
        const computerEmptyDiv = document.createElement('div');
        computerEmptyDiv.classList.add('empty');
        const computerPara = document.createElement('p');
        const computerBtn = document.createElement('button');
        const computerBtnImg = document.createElement('img');
        computerPara.textContent = 'the house picked';
        computerBtn.setAttribute('class', `${computer}`);
        computerBtnImg.setAttribute('src', `./images/icon-${computer}.svg`);
        computerBtnImg.setAttribute('alt', `${computer} button`);
        computerBtn.appendChild(computerBtnImg);
        computerDiv.append(computerPara, computerEmptyDiv);
        playerDiv.classList.add('player');
        computerDiv.classList.add('computer');
        frame1.append(playerDiv, computerDiv);
        setTimeout(() => {
            const computerBtn = document.createElement('button');
            const computerBtnImg = document.createElement('img');
            computerBtn.setAttribute('class', `${computer}`);
            computerBtnImg.setAttribute('src', `./images/icon-${computer}.svg`);
            computerBtnImg.setAttribute('alt', `${computer} button`);
            computerBtn.appendChild(computerBtnImg);
            computerDiv.append(computerBtn);
            const result = compareWinner(player, computer);
            setTimeout(() => {
                score = result === 'player' ? score + 1 : result === 'computer' ? score - 1 : score;
                scoreElem.textContent = `${score}`;
                frame1.classList.add('won');
                if (result === 'player')
                    playerBtn.classList.add('winner');
                if (result === 'computer')
                    computerBtn.classList.add('winner');
                const play_again = document.createElement('div');
                const h1 = document.createElement('h1');
                h1.textContent = result === 'player' ? 'you won' : result === 'computer' ? 'you loose' : "it's a tie";
                const button = document.createElement('button');
                button.textContent = 'play again';
                play_again.classList.add('play_again');
                play_again.append(h1, button);
                frame1.insertBefore(play_again, computerDiv);
                button.addEventListener('click', () => {
                    container.removeChild(frame1);
                    frame.classList.remove('hide');
                });
            }, 500);
        }, 500);
    });
});
function compareWinner(player, computer) {
    if (player === 'paper') {
        if (computer === 'rock')
            return 'player';
        if (computer === 'scissors')
            return 'computer';
        return 'tie';
    }
    if (player === 'rock') {
        if (computer === 'scissors')
            return 'player';
        if (computer === 'paper')
            return 'computer';
        return 'tie';
    }
    if (player === 'scissors') {
        if (computer === 'paper')
            return 'player';
        if (computer === 'rock')
            return 'computer';
        return 'tie';
    }
    throw new Error('invalid inputs');
}
const rps = ['rock', 'paper', 'scissors'];
function randFace(arr) {
    if (arr && Array.isArray(arr) && arr.length)
        return arr[Math.floor(Math.random() * arr.length)];
    throw new Error('invalid Input ');
}
