var squares_array = []

window.addEventListener("load", () => {
    document.getElementById('prg').value = 0;


    document.getElementById('prg').addEventListener('input', (ev) => {
        let newVal = ev.target.value;
        // console.log(newVal, squares_array.length);

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