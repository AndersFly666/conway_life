import { Cell } from "./cell";

export class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cells = [];
  }

  initGrid() {
    this.forEach((x, y) => {
      const cell = new Cell(x ,y);
      this.cells.push(cell);
    });
  }

  forEach(callback) {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        callback(i, j);
      }
    }
  }

  getCell(x, y) {
    return this.cells.find(cell => cell.checkCoords(x, y));
  }
}
