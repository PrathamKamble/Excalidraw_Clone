const canvas = document.getElementById('canvas');
const body = document.getElementById('main');
const toolBtns = document.querySelectorAll(".tool");
const fillColor = document.querySelector(".fill-color");
const colorBtns = document.querySelectorAll(".stroke .option");
const colorPicker = document.querySelector("#color-picker")
ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// let isDrawing = false;
// let x = 0;
// let y = 0;


// canvas.addEventListener('click', () => {
//     isDrawing = false
// });

// canvas.addEventListener('mousedown', (e) => {
//     x = e.offsetX;
//     y = e.offsetY;
//     isDrawing = true;
// });



// canvas.addEventListener('mousemove', (e) => {
//     if (!isDrawing) return;
//     ctx.beginPath();
//     ctx.moveTo(x, y);
//     ctx.lineTo(e.offsetX, e.offsetY);
//     ctx.stroke();
//     x = e.offsetX;
//     y = e.offsetY;
// });

// document.querySelector('.tool-box').addEventListener('click', e => {
//     if (e.target.id === 'clear') {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//     }

//     if (e.target.id === 'grab') {
//         canvas.style.cursor = 'grab';
//     }
// });

let isDrawing = false;
let selectedTool = "pencil";
let strokeWidth = 50;
let prevMouseX;
let prevMouseY;
let snapshot;
let selectedColor = "#1e1e1e";

const drawRect = (e) => {
    if (!fillColor) {
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    canvas.style.cursor = 'crosshair';
}

const drawCircle = (e) => {
    ctx.beginPath();
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2)); // getting radius for circle according to mouse pointer

    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    canvas.style.cursor = 'crosshair';
}

const clear =() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX; // current mousex position
    prevMouseY = e.offsetY; // current mousey position
    ctx.beginPath(); // creating new path when drawing
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = strokeWidth;
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height); // passing canvas data will avoid the dragging image issue
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
}

const drawing = (e) => {
    if (!isDrawing) return;
    ctx.putImageData(snapshot, 0, 0); //adding copied canvas data on to this canvas
    
    if (selectedTool === "pencil") {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if (selectedTool === "square") {
        drawRect(e);
    } else if (selectedTool === "diamond") {
        drawRect(e);
    } else if (selectedTool === "circle") {
        drawCircle(e);
    } else if (selectedTool === "clear") {
        clear();
    }
};

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.add("selected");
        selectedTool = btn.id;
        console.log(selectedTool);
    });
});

colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});

canvas.addEventListener("mouseup", () => isDrawing = false);
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);