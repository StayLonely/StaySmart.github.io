const display = document.querySelector('.color-time').querySelector('b');
const colorSec = document.querySelector('.color-game-colors');
const colors = document.querySelectorAll('.color');
const colorName = document.querySelector('.colorname');
const counts = document.getElementById('color-count');
const button = document.querySelector('.color-start');
const timer = document.querySelector('.color-time')
const tryes = document.querySelector('.last-try');
const ul = tryes.querySelector('ul');
const lastTryTemplate = document.querySelector('#last-try-template');
const bTemp = lastTryTemplate.content.querySelector('li');
const record = document.querySelector('.record-value');
const recordTitle = document.querySelector('.record');
const colorcounter = document.querySelector('.color-counter');
const presentCount = document.querySelector('.get-present-count');
const TIMEOUT = 15000;

let recordDef = 0;
let startCountPresent = 0





const random = (v) => {
    return Math.floor(Math.random() * (v))
}

const randomColor = () => {

    const colorValue = ['#ff3d3d', 'white', 'Orange' ,'#ff70cf', 'Lime' ,'Yellow' , 'Aqua'];
const colorValueTranslate = ['КРАСНЫЙ', 'БЕЛЫЙ' , 'ОРАНЖЕВЫЙ' , 'РОЗОВЫЙ' , ' ЗЕЛЁНЫЙ' , 'ЖЁЛТЫЙ' , 'ГОЛУБОЙ'];
    
    let randomColorwhat = random(colorValueTranslate.length)
    colorName.textContent = colorValueTranslate[randomColorwhat];

    colorValueTranslate.splice(randomColorwhat,1);
    let a = Math.floor(Math.random() *3);
    for(let i = 0; i<colors.length;i++){
        if(i=== a){
            let ran = random(colorValue.length)
            colors[a].style.color = colorValue[ran];
            colorValue.splice(randomColorwhat,1);
            colors[a].textContent = colorName.textContent;
            
        }
        else{
            let ran = random(colorValue.length)
            colors[i].style.color = colorValue[ran];
            colorValue.splice(ran,1);
            let textRan = random(colorValueTranslate.length);
            colors[i].textContent = colorValueTranslate[textRan];
            colorValueTranslate.splice(textRan,1)
        }
    }
    
    
}


button.addEventListener('click', function(){
    button.classList.add('hide');
    colorSec.classList.remove('hide');
    
    timer.classList.remove('hide');
    tryes.classList.remove('hide');
    recordTitle.classList.remove('hide');
    colorcounter.classList.remove('hide');
    time()
    counts.textContent = 0;
    randomColor();
})

colorSec.addEventListener("click", function (e) {
    if (colorName.textContent === e.target.textContent){
        counts.textContent++;
        randomColor()
    }
    });



const time = () =>{
    
    
    const startTIme = Date.now();
    
    display.textContent = formatTime(TIMEOUT);
    
    const interval = setInterval(() => {
        const delta = Date.now() - startTIme;
        display.textContent = formatTime(TIMEOUT - delta);
        
    }, 100);

    const timeout = setTimeout(() => {
        
        display.textContent = 'вышло';
        colorName.textContent = '';
        clearInterval(interval);
        clearTimeout(timeout);
        colorSec.classList.add('hide');
        colorcounter.classList.add('hide');
        timer.classList.add('hide');
        button.classList.remove('hide');
        bTemp.textContent = 'Количество очков: '+parseInt(counts.textContent);
        startCountPresent+=parseInt(counts.textContent);
        presentCount.querySelector('b').textContent = startCountPresent + ' ';
        if(startCountPresent > 25){
            presentCount.textContent = 'Промокод на 40% скидку в my-shop.ru: SORRY'
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

