const originTextArea  = document.querySelector('#origin-text'),
      resetButton     = document.querySelector('#reset'),
      timeClock       = document.querySelector('#timer'),
      typedTextArea   = document.querySelector('#typed-text');

let timer    = 0,
    active   = false,
    interval = null;

function initTest() {
    if (typedTextArea.value.length === 0 && !active) {
        active = true;
        interval = window.setInterval(count, 10);
    }
}

function compareTypedToOrigin() {
    let typedText     = typedTextArea.value,
        originText    = originTextArea.value,
        originSegment = originTextArea.value.substring(0, typedText.length);
    
    if (typedText === originText) {
        window.clearInterval(interval);
        typedTextArea.style.borderColor = '#8fbc8f';
    } else if (typedText === originSegment) {
        typedTextArea.style.borderColor = '#8f94bc';
    } else {
        typedTextArea.style.borderColor = '#ffa07d';
    }
}

function count(forward = true) {
    let minutes    = Math.floor(timer / 100 / 60),
        seconds    = Math.floor(timer / 100) - (minutes * 60),
        hundredths = timer - (seconds * 100) - (minutes * 60 * 100);
    
    [minutes, seconds, hundredths] = [minutes, seconds, hundredths].map(
        t => (t < 10) ? `0${t}` : t
    );
    
    timeClock.textContent = `${minutes}:${seconds}:${hundredths}`;
    if (forward) timer++;
}

function reset() {
    window.clearInterval(interval);
    timer = 0;
    active = false;
    count(forward = false);
    originTextArea.value = '';
    typedTextArea.value = '';
    typedTextArea.style.borderColor = '#888888';
}

resetButton.addEventListener('click', reset);
typedTextArea.addEventListener('keypress', initTest);
typedTextArea.addEventListener('keyup', compareTypedToOrigin);