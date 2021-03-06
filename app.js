(function() {
  const cellSize = 10;
  const boardWidth = 640;
  const boardHeight = 480;

  const world = new World(Math.ceil(boardWidth / cellSize), Math.ceil(boardHeight / cellSize));

  let gridCanvas, gridCtx, cellsCanvas, 
      cellsCtx, intervalHandler, startBtn, stopBtn;

  const boardConfig = {
    width: boardWidth,
    height: boardHeight,
    padding: cellSize,
  };

  window.onload = function() {
    startBtn = document.getElementById('start');
    stopBtn = document.getElementById('stop');

    gridCanvas = document.getElementById('grid');
    gridCtx = gridCanvas.getContext('2d');
    cellsCanvas = document.getElementById('cells');
    cellsCtx = cellsCanvas.getContext('2d');

    drawBoard(gridCtx, boardConfig);
    
    startBtn.onclick = function() {
      intervalHandler =  start(cellsCtx, boardConfig);
    };

    stopBtn.onclick = function() {
      clearInterval(intervalHandler);
    };

    cellsCanvas.onclick = function(e) {
      const topOffset = 50;
      const leftOffset = 400;
      const { padding } = boardConfig;
      const { clientX, clientY } = e;
      const { grid } = world;

      const x = Math.ceil((clientX - leftOffset - padding) / padding) - 1; 
      const y = Math.ceil((clientY - topOffset - padding) / padding) - 1;
      
      const cell = grid.getCell(x, y);
      cell.isAlive = !cell.isAlive;
      
      cell.isAlive ? drawCell(cellsCtx, x, y) : clearCell(cellsCtx, x, y);
    };
  };

  function drawBoard(context, boardConfig) {
    const { width, height, padding } = boardConfig;

    for (let x = 0; x <= width; x += padding) {
        context.moveTo(0.5 + x + padding, padding);
        context.lineTo(0.5 + x + padding, height + padding);
    }
    
    for (let x = 0; x <= height; x += padding) {
        context.moveTo(padding, 0.5 + x + padding);
        context.lineTo(width + padding, 0.5 + x + padding);
    }
    
    context.strokeStyle = "black";
    context.stroke();
  }

  function drawCells(ctx, boardConfig) {
    const { grid } = world;
    const { width, height, padding } = boardConfig;

    ctx.clearRect(0, 0, width, height);

    grid.forEach((x, y) => {
      const cell = grid.getCell(x, y);
      if (cell.isAlive) {
        const coordX = x * padding + 3;
        const coordY = y * padding + 3;
        ctx.fillRect(coordX, coordY, padding - 5, padding - 5);
      }
    })
  }

  function drawCell(ctx, x, y) {
    const coordX = x * cellSize + 3;
    const coordY = y * cellSize + 3;
    ctx.fillRect(coordX, coordY, cellSize - 5, cellSize - 5);
  }

  function clearCell(ctx, x, y) {
    const coordX = x * cellSize + 3;
    const coordY = y * cellSize + 3;
    ctx.clearRect(coordX, coordY, cellSize - 5, cellSize - 5);
  }

  function start(ctx, config) {
    return setInterval(() => {
      drawCells(ctx, config);
      world.tick();
    }, 60);
  }
})();
