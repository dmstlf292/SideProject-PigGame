'use strict';

// Selection elements 
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');//html p의 클래스
const score1El = document.getElementById('score--1');//html p의 클래스
const current0El = document.getElementById('current--0');//player 1
const current1El = document.getElementById('current--1');//player 2

const diceEl = document.querySelector('.dice')//html의 dice 클래스 
const btnNew = document.querySelector('.btn--new');//html
const btnRoll = document.querySelector('.btn--roll');//html
const btnHold = document.querySelector('.btn--hold');//html


//변수 4개를 outside에 empty variables 로 "콤마를 이용하여" 변수 선언해주기(아무런 값이 없는 상태로!)
//그리고 밑에 선언한 필드명은 중복되므로 다 삭제해야한다!!!(const init function에 선언되어 있는 변수들!!)
let scores, currentScore, activePlayer, playing;



//starting conditions
//새로 시작하는 버튼 기능들
const init = function () {
    //score0El.textContent = 0;
    // score1El.textContent = 0;

    scores = [0, 0];//player1 & player2 전부 score point가 0부터 시작한다는 뜻!!배열!!!!
    currentScore = 0;// 반드시 이벤트 밖에 선언되어야 한다. 아니면 버튼 클릭할때마다 score가 0이 되기 때문
    activePlayer = 0;
    playing = true;//es para terminar cuando alguien se gane y bloquear el juego

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');

    player0E1.classList.remove('player--winner');
    player1E1.classList.remove('player--winner');
    player0E1.classList.add('player--active');
    player1E1.classList.remove('player--active');//여기는 왜 위 처럼 add로 안바꿔줌??
};
//새로운 게임 시작 버튼 클릭시 제일 처음 화면과 같이 똑같이 세팅해주는 작업
//제일 처음 오픈했을경우와 똑같이 세팅해줘야함 =>즉, 주사위 숫자가 랜덤으로 화면에 보이게 세팅하기
init();

const switchPlayer = function () {
    document.getElementById('current--${activePlayer}').textContent = 0;//여기도 점수 0으로 다시 셋팅
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};


//Rolling dice functionality
btnRoll.addEventListener('click', function () {

    if (playing) {// 여기서 playing ===true 라고 할 필요가 없다. playing 그 자체가 boolean=true 이라서!!! 

        //when we are playing -------------------------------------------------------------
        //1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1 //1~6 까지 랜덤


        //2. Display dice
        //게임이 시작되면 화면상 주사위가 나타나게 하는 기능!!!
        diceEl.classList.remove('hidden');
        diceEl.src = 'dice-${dice}.png';//주사위 사진 총 6개를 선언

        //3. Check for rolled 1 : if true
        if (dice != 1) {
            //Add dice to current score
            currentScore += dice; //= currentScore = currentScore + dice;랑 같은 구문
            document.getElementById('current--${activePlayer}').textContent = currentScore;
            // current0El.textContent = currentScore;//change later!
        } else {
            //switch to next player
            switchPlayer();
            //if the active player is 0, 
            //then we want the new activePlayer to be 1 and else it should be 0.

        }
    }
});

//Hold button 활성화 하기!!!!!
//hold 버튼 누를시 총 점수는 화면에 보여지되, currnet point는 0로 변한다!
// 하지만 주사위의 숫자가 0이 나오지 않는 이상, current 점수는 계속 증가한다!
btnHold.addEventListener('click', function () {

    if (playing) {
        //1. Add current score to oactive player's score
        scores[activePlayer] += currentScore;
        // 예시 :  scores[1] = scores[1] + currentScore; 
        document.getElementById('score--${activePlayer}').textContent = scores[activePlayer];

        //2. Check if player's score is >=20 ---> va a cambiarse el color como negro cuando alguien se gana.
        if (scores[activePlayer] >= 20) {
            //Finishe the game
            playing = false;
            //여기에 이거 추가(remove대신 add로 수정함) --> 누군가가 게임에서 이긴후, 주사위가 화면에서 사라지는 기능!!!
            diceEl.classList.add('hidden');
            document.querySelector('.player--${activePlayer}').classList.add('player--winner');
            document.querySelector('.player--${activePlayer}').classList.remove('player--active');

        } else {
            //Switch to the next player
            switchPlayer();
        }
    }
});

//게임 리셋하고 새로 시작하는 버튼 기능넣기
btnNew = addEventListener('click', init);//위에 선언해준 기능을 그냥 불러오기만 해서 코드 줄이기!!
