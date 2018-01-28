var body = document.querySelector('body');
var btnStart = document.getElementById('start');
var btnStop = document.getElementById('stop');
var select = document.getElementById('changeBackground');
var average = document.getElementById('average');
var para = document.getElementById('para');
var start = new Date();
var stop = new Date();
var timeStart, timeStop, time, sum, srednia;
var firstShot = 1;
var timeArray = [];
var stop1 = false;
var tooFast = false;

btnStart.addEventListener('click', startTime);
btnStop.addEventListener('click', stopTime);

function changeColor() {
    var choice = select.value;
    if (choice == 'red') {
        body.style.background = 'red';
    } else if (choice == 'green') {
        body.style.background = 'green';
    } else if (choice == 'blue') {
        body.style.background = 'blue';
    }
    start = new Date();
    timeStart = start.getTime();
    tooFast = true;
};

function startTime() {
    setTimeout(changeColor, rand(1000, 2000));
    stop1 = true;
};

function countTime() {
    time = (timeStop - timeStart) / 1000;
    if (time < 0.1) {
        alert('Twój czas reakcji to ' + time + ' s!' + 'Doskonale!')
    } else if (time > 0.1 && time < 0.2) {
        alert('Twój czas reakcji to ' + time + ' s!' + ' Bardzo dobrze!')
    } else if (time > 0.2 && time < 0.3) {
        alert('Twój czas reakcji to ' + time + ' s!' + ' Dobrze!')
    } else if (time > 0.3 && time < 0.5) {
        alert('Twój czas reakcji to ' + time + ' s!' + ' Średnio!')
    } else if (time > 0.5 && time < 1) {
        alert('Twój czas reakcji to ' + time + ' s!' + ' Słabooooo!')
    } else if (time > 1) {
        alert('Twój czas reakcji to ' + time + ' s!' + ' Zaspałeś!')
    }

    if (firstShot === 1) {
        para.textContent = 'Twoje rezultaty to: ';
    }
    para.textContent += time + ' s, ';

    firstShot++;

    timeArray.push(time);
    sum = timeArray.reduce((a, b) => a + b, 0);
    srednia = sum / timeArray.length;
    average.textContent = 'Twoja srednia to ' + Math.round(srednia * 1000) / 1000 + ' s';
};

function stopTime() {
    var choice = select.value;
    if (stop1 && tooFast) {
        stop = new Date();
        timeStop = stop.getTime();
        countTime();
        select.value = 'white';
        body.style.background = "url('dark_embroidery.png')";
    } else if (choice == 'white') {
        alert('Wybierz kolor i wcisnij Start!');
    } else if (!stop1) {
        alert('Wcisnij Start!');
    } else if (!tooFast) {
        alert('Nie oszukuj! Wybierz kolor jeszcze raz i naciśnij start');
        select.value = 'white';
        body.style.background = "url('dark_embroidery.png')";
    }
    stop1 = false;
    tooFast = false;
}


function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

document.getElementById('instruction').addEventListener('click', function () {
    var modalContainer = document.getElementById('modalContainer');
    modalContainer.style.display = 'block';
});

document.getElementById('remove').addEventListener('click', function () {
    var modalContainer = document.getElementById('modalContainer');
    modalContainer.style.display = 'none';
});

window.addEventListener('click', function (e) {
    var modalContainer = document.getElementById('modalContainer');
    if (e.target == modalContainer) {
        modalContainer.style.display = 'none';
    }
});
