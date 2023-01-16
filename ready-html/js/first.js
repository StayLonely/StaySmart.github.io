const display = document.querySelector('.reaction-time').querySelector('b');
const circle = document.querySelector('#reaction-circle');
const counts = document.getElementById('reaction-count');
const button = document.querySelector('.reaction-start');
const timer = document.querySelector('.reaction-time')
const tryes = document.querySelector('.last-try');
const ul = tryes.querySelector('ul');
const lastTryTemplate = document.querySelector('#last-try-template');
const bTemp = lastTryTemplate.content.querySelector('li');
const record = document.querySelector('.record-value');
const recordTitle = document.querySelector('.record');
const reactioncounterTitle = document.querySelector('.reaction-counter');
const presentCount = document.querySelector('.get-present-count');
const presentTitle = document.querySelector('.get-present');

const TIMEOUT = 15000;

let recordDef = 0;
let startCountPresent = 0

button.addEventListener('click', function(){
    button.classList.add('hide');
    circle.classList.remove('hide');
    timer.classList.remove('hide');
    tryes.classList.remove('hide');
    recordTitle.classList.remove('hide')
    reactioncounterTitle.classList.remove('hide')

    presentCount.classList.remove('hide')
    presentTitle.classList.remove('hide')

    time()
    counts.textContent = 0;

})

circle.addEventListener('click', onClick)
    

function onClick (){
    counts.textContent++;
    randomPos(200,450);
    randomWH(50,70);
}

const time = () =>{
    
    
    const startTIme = Date.now();
    
    display.textContent = formatTime(TIMEOUT);
    
    const interval = setInterval(() => {
        const delta = Date.now() - startTIme;
        display.textContent = formatTime(TIMEOUT - delta);
        
    }, 100);

    const timeout = setTimeout(() => {
        reactioncounterTitle.classList.add('hide')
        timer.classList.add('hide')
        
        display.textContent = 'вышло';
        clearInterval(interval);
        clearTimeout(timeout);
        circle.classList.add('hide');
        button.classList.remove('hide');
        bTemp.textContent = 'Количество очков: '+parseInt(counts.textContent);
        startCountPresent+=parseInt(counts.textContent);
        presentCount.querySelector('b').textContent = startCountPresent + ' ';
        if(startCountPresent > 50){
            presentCount.textContent = 'Промокод на 26% скидку в читай-город: ОГОНЬКИ'
        }
        if (parseInt(counts.textContent) > recordDef){
            recordDef = parseInt(counts.textContent);
            record.textContent = recordDef
        }
        let temp = lastTryTemplate.content.cloneNode(true);
        ul.append(temp);
    }, TIMEOUT);

}


function formatTime(ms){
    return Number.parseFloat(ms/1000).toFixed(2)
}

const randomPos = (min, max) =>{
    let randomTop = Math.random() * (max - min) + min;
    circle.style.top = randomTop +'px';
    let randomLeft = Math.random() * (max - min) + min;
    circle.style.left = randomLeft +'px';
}
const randomWH = (min, max) =>{
    let random =  Math.random() * (max - min) + min;
    circle.style.width = random + 'px';
    circle.style.height = random + 'px';
    
}