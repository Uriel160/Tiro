const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 250; // Ajuste para que el ancho sea de 250px
canvas.height = 175; // El canvas ocupa el 70% de 250px (altura de 175px)

let score = 0;
let timeLeft = 30;
let targetX, targetY, targetRadius = 12; // Blanco ajustado para 250px
let gameActive = false;
let intervalId;
const scoreDisplay = document.getElementById('scoreValue');
const timeDisplay = document.getElementById('timeValue');
const startButton = document.getElementById('startButton');

// Función para dibujar el blanco
function drawTarget() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
    targetX = Math.random() * (canvas.width - targetRadius * 2) + targetRadius;
    targetY = Math.random() * (canvas.height - targetRadius * 2) + targetRadius;

    ctx.beginPath();
    ctx.arc(targetX, targetY, targetRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ff0000';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.stroke();
}

// Función para detectar los clics o toques en el blanco
function checkHit(x, y) {
    const distance = Math.sqrt((x - targetX) ** 2 + (y - targetY) ** 2);
    if (distance <= targetRadius) {
        score++;
        scoreDisplay.textContent = score;
        drawTarget(); // Muestra el siguiente blanco
    }
}

// Manejar clics del mouse
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    checkHit(mouseX, mouseY);
});

// Manejar toques en pantallas táctiles
canvas.addEventListener('touchstart', (event) => {
    const rect = canvas.getBoundingClientRect();
    const touchX = event.touches[0].clientX - rect.left;
    const touchY = event.touches[0].clientY - rect.top;
    checkHit(touchX, touchY);
});

// Función para comenzar el juego
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    gameActive = true;
    startButton.disabled = true;
    drawTarget(); // Dibuja el primer blanco
    intervalId = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(intervalId);
            gameActive = false;
            startButton.disabled = false;
            alert(`¡Se acabó el tiempo! Puntos: ${score}`);
        }
    }, 1000);
}

// Botón para iniciar el juego
startButton.addEventListener('click', startGame);
