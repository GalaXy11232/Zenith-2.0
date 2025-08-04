var squares_array = []
const ANIMATION_DELAY = 2
const INIT_SQ_NUM = 5

window.addEventListener("load", () => {
    let storageSqNum = JSON.parse(localStorage.getItem(STORAGE_ENTRYNAME))['sqNum'];;
    document.getElementById('prg').value = storageSqNum
    document.getElementById('square-setting').textContent = storageSqNum;
    for (let i = 0; i < storageSqNum; i++) spawnSquare();


    document.getElementById('prg').addEventListener('input', (ev) => {
        let newVal = ev.target.value;
        document.getElementById('square-setting').textContent = newVal;
        
        // update localStorage
        let storageDict = JSON.parse(localStorage.getItem(STORAGE_ENTRYNAME));
        storageDict['sqNum'] = newVal;
        localStorage.setItem(STORAGE_ENTRYNAME, JSON.stringify(storageDict));

        // squares must be removed
        if (newVal < squares_array.length) {
            let diff = Math.abs(squares_array.length - newVal);
            for (let i = 0; i < diff; i++) remove_square_last();
        }

        // squares must be added
        else if (newVal > squares_array.length) {
            let diff = Math.abs(squares_array.length - newVal);
            for (let i = 0; i < diff; i++) spawnSquare();
        }
    });
})


function squareRandomizePos(crtSqr) {
    crtSqr.style.top = `${Math.round(Math.random() * window.innerHeight)}px`;
    crtSqr.style.left = `${Math.round(Math.random() * window.innerWidth)}px`;
}


function spawnSquare() { 
    let square = document.createElement('div');
    square.setAttribute('class', 'animSquare');

    let delay_time;
    try { delay_time = `${Number(squares_array[squares_array.length - 1].style.animationDelay.slice(0, -1)) + ANIMATION_DELAY}s`; }
    catch { delay_time = `0s`; }

    square.style.animationDelay = delay_time;

    squareRandomizePos(square);
    square.addEventListener('animationiteration', () => { squareRandomizePos(square); });

    document.getElementsByClassName('entranceBG')[0].appendChild(square);
    squares_array.push(square);
    
}

function remove_square_last() {
    let popped = squares_array[squares_array.length - 1];
    document.getElementsByClassName('entranceBG')[0].removeChild(popped);
    squares_array.pop();
}