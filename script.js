const canvas = document.getElementById('canvas');
const body = document.getElementById('main');
ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let isDrawing = false;
let x = 0;
let y = 0;


canvas.addEventListener('click', () => {
    isDrawing = false
});

canvas.addEventListener('mousedown', (e) => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
});



canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  x = e.offsetX;
  y = e.offsetY;
});

    document.querySelector('.tool-box').addEventListener('click', e => {
        if(e.target.id === 'clear') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        if(e.target.id === 'grab') {
            canvas.style.cursor = 'grab';
        }
    }); 