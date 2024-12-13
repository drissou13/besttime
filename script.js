const testButton = document.getElementById('test-button');
const result = document.getElementById('result');
const restartButton = document.getElementById('restart-button');

let startTime;
let timeout;
let bestTime = localStorage.getItem('bestTime') || null;

function updateBestTime(reactionTime) {
    if (!bestTime || reactionTime < bestTime) {
        bestTime = reactionTime;
        localStorage.setItem('bestTime', bestTime);
        result.textContent += ` (New Record!)`;
    }
}

function displayBestTime() {
    const bestTimeDisplay = document.getElementById('best-time');
    if (bestTime) {
        bestTimeDisplay.textContent = `Best Time: ${bestTime} ms`;
    } else {
        bestTimeDisplay.textContent = `Best Time: None`;
    }
}

function startTest() {
    result.textContent = '';
    testButton.textContent = 'Wait...';
    testButton.className = 'waiting';
    testButton.disabled = true;

    const delay = Math.random() * 3000 + 2000; // Random delay between 2-5 seconds

    timeout = setTimeout(() => {
        testButton.textContent = 'Click now!';
        testButton.className = 'ready';
        testButton.disabled = false;
        startTime = Date.now();
    }, delay);
}

function endTest() {
    const reactionTime = Date.now() - startTime;
    result.textContent = `Your reaction time is ${reactionTime} ms!`;
    testButton.disabled = true;
    testButton.textContent = 'Done';

    updateBestTime(reactionTime);
    displayBestTime();
    clearTimeout(timeout);
}

function restartTest() {
    startTest();
}

// Event listeners
testButton.addEventListener('click', endTest);
restartButton.addEventListener('click', restartTest);

// Display best time on page load
displayBestTime();
startTest();
