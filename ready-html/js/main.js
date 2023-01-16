const display = document.querySelector('.count-time').querySelector('b');

const countSec = document.querySelector('.count-game-count');
const answer = document.querySelector('.count');

const countName = document.querySelector('.countname');

const countRules = document.querySelector('.checkRules')

const counts = document.getElementById('count-count');

const timer = document.querySelector('.count-time')
const tryes = document.querySelector('.last-try');
const ul = tryes.querySelector('ul');
const lastTryTemplate = document.querySelector('#last-try-template');
const bTemp = lastTryTemplate.content.querySelector('li');
const record = document.querySelector('.record-value');
const recordTitle = document.querySelector('.record');
const countcounter = document.querySelector('.count-counter');
const presentCount = document.querySelector('.get-present-count');
const TIMEOUT = 15000;

let points = 0;
let recordDef = 0;
let startCountPresent = 0


const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const onCountRulesClick = (evt) =>{
    let target = evt.target.className;
    
    if(target == 'easy'){
        CountGame(1,10);
    }
    if(target == 'medium'){
        CountGame(10,100);
    }
    if(target == 'hard'){
        CountGame(100,500);
    }
    countRules.classList.add('hide');
    
    countSec.classList.remove('hide');
    
    timer.classList.remove('hide');
    tryes.classList.remove('hide');
    recordTitle.classList.remove('hide');
    countcounter.classList.remove('hide');
    time()
    counts.textContent = 0;
    
    
}


const letAnswers = (trueAnswer,min,max) =>{
    
    const li = answer.querySelectorAll('li');
    
    const answers = random(0,4);
    let array = [];
    let arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
    for(let i = 0; i<li.length; i++){
        if(i === answers){
            li[answers].textContent = trueAnswer;
            array.push(trueAnswer);
        }
        else{
            if(min == 1){
                const doNumber = () =>{
                    let num = random(0,arr.length);
                    if(num != trueAnswer && !array.includes(num)){
                        li[i].textContent = arr[num];
                        arr.splice(num,1);
                    }
                    else{
                        arr.splice(num, 1);
                        doNumber();
                    }
                }
                doNumber();
            }
            if(min == 10){
                li[i].textContent = random(Math.floor(trueAnswer * 0.5), Math.floor(trueAnswer*2));
            }
            if(min == 100){
                li[i].textContent = random(Math.floor(trueAnswer * 0.8), Math.floor(trueAnswer*1.2));
            }
        }
    }
    console.log(arr);

    const onAnswerClick = (evt) => {
        if(evt.target.textContent == trueAnswer){
            points++;
            counts.textContent = points;
            
            CountGame(min,max);
            answer.removeEventListener('click',onAnswerClick);
        }
    }

    answer.addEventListener('click',onAnswerClick);
}

const CountGame = (min, max) => {
    let firstNumber = random(min,max);
    let secondNumber = random(min,max);
    if(firstNumber ==secondNumber){
        CountGame(min,max);
    }
    let operation = random(0,2);
    if( operation === 0){
        countName.textContent = `${firstNumber} + ${secondNumber}`;
        letAnswers(firstNumber + secondNumber, min,max);
    }
    if( operation === 1){
        if(secondNumber > firstNumber){
            let a = firstNumber;
            firstNumber = secondNumber;
            secondNumber = a;
            
        }
        letAnswers(firstNumber - secondNumber,min,max);
        countName.textContent = `${firstNumber} - ${secondNumber}`;
    }
}

const setRules = () =>{
    points = 0;
    countRules.addEventListener('click', onCountRulesClick);
}

setRules();






const time = () =>{
    
    
    const startTIme = Date.now();
    
    display.textContent = formatTime(TIMEOUT);
    
    const interval = setInterval(() => {
        const delta = Date.now() - startTIme;
        display.textContent = formatTime(TIMEOUT - delta);
        
    }, 100);

    const timeout = setTimeout(() => {
        
        countName.textContent = 'Выбор уровня сложности';
        
        clearInterval(interval);
        clearTimeout(timeout);
        countSec.classList.add('hide');
        countcounter.classList.add('hide');
        timer.classList.add('hide');

        
        bTemp.textContent = 'Количество очков: '+parseInt(counts.textContent);
        startCountPresent+=parseInt(counts.textContent);
        presentCount.querySelector('b').textContent = startCountPresent + ' ';
        if(startCountPresent > 25){
            presentCount.textContent = 'Промокод на 26% скидку в читай-город: ОГОНЬКИ'
        }
        if (parseInt(counts.textContent) > recordDef){
            recordDef = parseInt(counts.textContent);
            record.textContent = recordDef
        }
        let temp = lastTryTemplate.content.cloneNode(true);
        ul.append(temp);
        countRules.classList.remove('hide');
        setRules();
    }, TIMEOUT);

}


function formatTime(ms){
    return Number.parseFloat(ms/1000).toFixed(2)
}

