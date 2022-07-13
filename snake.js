let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let grid = 16;
let count = 0;

let snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
}

let apple = {
    x: 320,
    y: 320
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
    requestAnimationFrame(loop);
    if (++count < 4) {
        return;
    }

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.height) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    context.fillStyle = 'green';

    snake.cells.forEach(function (cell, index) {
        // Чтобы создать эффект клеточек, делаем зелёные квадратики меньше на один пиксель, чтобы вокруг них образовалась чёрная граница
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        // Если змейка добралась до яблока...
        if (cell.x === apple.x && cell.y === apple.y) {
          // увеличиваем длину змейки
          snake.maxCells++;
          // Рисуем новое яблочко
          // Помним, что размер холста у нас 400x400, при этом он разбит на ячейки — 25 в каждую сторону
          apple.x = getRandomInt(0, 25) * grid;
          apple.y = getRandomInt(0, 25) * grid;
        }
    // Проверяем, не столкнулась ли змея сама с собой
    // Для этого перебираем весь массив и смотрим, есть ли у нас в массиве змейки две клетки с одинаковыми координатами 
    for (var i = index + 1; i < snake.cells.length; i++) {
        // Если такие клетки есть — начинаем игру заново
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          snake.x = 160;
          snake.y = 160;
          snake.cells = [];
          snake.maxCells = 4;
          snake.dx = grid;
          snake.dy = 0;
          // Ставим яблоко в случайное место
          apple.x = getRandomInt(0, 25) * grid;
          apple.y = getRandomInt(0, 25) * grid;
        }
      }
    });
}

document.addEventListener('keydown', function (e) {
    // Стрелка влево
    // Если нажата стрелка влево, и при этом змейка никуда не движется по горизонтали…
    if (e.which === 37 && snake.dx === 0) {
      // то даём ей движение по горизонтали, влево, а вертикальное — останавливаем
      snake.dx = -grid;
      snake.dy = 0;
    }
    // Стрелка вверх
    else if (e.which === 38 && snake.dy === 0) {
      snake.dy = -grid;
      snake.dx = 0;
    }
    // Стрелка вправо
    else if (e.which === 39 && snake.dx === 0) {
      snake.dx = grid;
      snake.dy = 0;
    }
    // Стрелка вниз
    else if (e.which === 40 && snake.dy === 0) {
      snake.dy = grid;
      snake.dx = 0;
    }
});                                             

const upBtn = document.getElementById('up');
upBtn.addEventListener('touchstart', function() {
    snake.dy = -grid;
    snake.dx = 0;
});
const leftBtn = document.getElementById('left');
upBtn.addEventListener('touchstart', function() {
    snake.dx = -grid;
    snake.dy = 0;
});
const rightBtn = document.getElementById('right');
upBtn.addEventListener('touchstart', function() {
    snake.dx = grid;
    snake.dy = 0;
});
const downBtn = document.getElementById('down');
upBtn.addEventListener('touchstart', function() {
    snake.dy = grid;
    snake.dx = 0;
});

requestAnimationFrame(loop);