class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cells = [];

    this.init();
  }

  init() {
    this.forEach((x, y) => {
      const cell = new Cell(x ,y);
      this.cells.push(cell);
    });
  }

  forEach(callback) {
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        callback(i, j);
      }
    }
  }

  getCell(x, y) {
    return this.cells.find(cell => cell.checkCoords(x, y));
  }

  setCell(newCell) {
    const index = this.cells.findIndex(cell => cell.checkCoords(newCell.x, newCell.y));
    this.cells[index] = newCell;
  }

  toString() {
    let str = '';
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        const cell = this.getCell(i, j);
        if (cell.isAlive) {
          str += 'x';
        } else {
          str += 'o';
        }
      }
      str += '\n';
    }
    return str;
  }

  countNeighbours(cell) {
    let count = 0;
    const { x, y } = cell;
    const startX = x > 0 ? x - 1 : x;
    const endX = x < this.width - 1 ? x + 1 : x;
    const startY = y > 0 ? y - 1 : y;
    const endY = y < this.height - 1 ? y + 1 : y;

    for (let j = startY; j <= endY; j++) {
      for (let i = startX; i <= endX; i++) {
        const neighbour = this.getCell(i, j);
        if (neighbour.isAlive && neighbour !== cell) {
          count++;
        }
      }
    }

    return count;
  }

  /**
   * count neighbours and react accordingly
   * @param {Cell} cell 
   * @returns {Cell} updated cell
   */
  getUpdatedCell(cell) {
    const neighboursCount = this.countNeighbours(cell);
    
    // Any alive cell...
    if (cell.isAlive) {
      /**
       * ... with two or three live neighbors lives
       * ... with fewer than two or with more than three live neighbors dies 
       **/
      const stillAlive = neighboursCount === 2 || neighboursCount === 3; 
      
      return new Cell(cell.x, cell.y, stillAlive);
    } 
    
    // Any dead cell with exactly three live neighbors becomes a live cell
    const isAlive = neighboursCount === 3;
    return new Cell(cell.x, cell.y, isAlive);
  }
}
