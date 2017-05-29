const originText  = document.querySelector('#origin-text'),
      resetButton = document.querySelector('#reset'),
      timeClock   = document.querySelector('#timer'),
      typedText   = document.querySelector('#typed-text');

let timer = 0;

function initTest() {
    let enteredText = typedText.value;
    if (enteredText.length === 0) {
        window.setInterval(count, 10);
    }
}

function compareOrigin() {
    //
}

function count() {
    let minutes = Math.floor(timer / 100 / 60),
        seconds = Math.floor(timer / 100) - (minutes * 60),
        hundredths = timer - (seconds * 100) - (minutes * 60 * 100);
    
    [minutes, seconds, hundredths] = [minutes, seconds, hundredths].map(
        t => (t < 10) ? `0${t}` : t
    );
    
    timeClock.innerHTML = `${minutes}:${seconds}:${hundredths}`;
    timer++;
}

function reset() {
    timer = 0;
}

resetButton.addEventListener('click', reset);
typedText.addEventListener('keypress', initTest);
typedText.addEventListener('keyup', compareOrigin);