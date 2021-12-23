"use strict";
var _a, _b, _c, _d;
let board = document.querySelectorAll('.board');
let arrayOfSpaces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let counter = 0;
let store;
let gameOverModal = document.getElementById('gameOverUser');
let gameOverModalFailed = document.getElementById('gameOverUserFailed');
let gameOverModalDraw = document.getElementById('gameOverDraw');
let isClicked = [];
let userPosition = [];
let winScore;
(_a = document.getElementById('restart')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => location.reload());
(_b = document.getElementById('ok-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => location.reload());
(_c = document.getElementById('ok-btn-draw')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => location.reload());
(_d = document.getElementById('ok-btn-failed')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => location.reload());
let winArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
];
const detectPosition = (n) => winArray.filter((a) => a.includes(n));
for (let i = 0; i < board.length; i++) {
    board[i].addEventListener('click', e => {
        e.preventDefault();
        if (isClicked.length !== 0 && isClicked[isClicked.length - 1].user === 'player') {
            return false;
        }
        else {
            board[i].classList.add('bg-yellow-300');
            arrayOfSpaces = arrayOfSpaces.filter((a) => a !== i);
            isClicked.push({
                user: "player",
                number: i + 1
            });
            if (arrayOfSpaces.length == 0) {
                gameOverModalDraw.classList.remove('hidden');
                return false;
            }
            counter++;
            setTimeout(() => {
                board[AIPlayer()].classList.add('bg-green-300');
            }, 2000);
            userPosition.push([detectPosition(i + 1)]);
            if (counter > 2) {
                let x = isClicked.filter((a) => a.user === "player");
                x = userPosition[userPosition.length - 1][0].find((a) => a.includes(x[1].number));
                x = x.filter((a) => a !== isClicked.filter((a) => a.user == "player")[0].number);
                x = x.filter((a) => a !== isClicked.filter((a) => a.user == "player")[1].number);
                if (x.length == 1 && x[0] === i + 1) {
                    gameOverModal.classList.remove('hidden');
                }
            }
        }
    });
}
let randomNmberFunction = (n) => Math.floor(Math.random() * n);
let AIPlayer = () => {
    let checkPlayerResult = isClicked.filter((a) => a.user === "player");
    checkPlayerResult = checkPlayerResult[checkPlayerResult.length - 1].number;
    checkPlayerResult = userPosition.length == 0 ? [] : userPosition[userPosition.length - 2] == undefined ? userPosition[userPosition.length - 1][randomNmberFunction(userPosition.length)][checkPlayerResult] : userPosition[userPosition.length - 2][0].filter((a) => a.includes(checkPlayerResult))[0];
    if (checkPlayerResult == undefined) {
        store = arrayOfSpaces[randomNmberFunction(arrayOfSpaces.length)];
    }
    else {
        store = (arrayOfSpaces[randomNmberFunction(arrayOfSpaces.length)] == undefined) ? checkPlayerResult[randomNmberFunction(checkPlayerResult.length) - 1] : arrayOfSpaces[randomNmberFunction(arrayOfSpaces.length)];
    }
    //    store = arrayOfSpaces[randomNmberFunction(arrayOfSpaces.length)]
    arrayOfSpaces = arrayOfSpaces.filter((a) => a !== store);
    isClicked.push({
        user: "AI",
        number: store + 1
    });
    if (isClicked.filter((a) => a.user === "AI").length > 2) {
        let x = isClicked.filter((a) => a.user === "AI");
        x = userPosition[userPosition.length - 2][0].find((a) => a.includes(x[1].number));
        x = x.filter((a) => a !== isClicked.filter((a) => a.user == "AI")[0].number);
        x = x.filter((a) => a !== isClicked.filter((a) => a.user == "AI")[1].number);
        if (x.length == 1 && x[0] === store + 1) {
            console.log('winner');
            gameOverModalFailed.classList.remove('hidden');
        }
    }
    return store;
};
