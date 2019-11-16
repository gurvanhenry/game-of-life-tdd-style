import { expect } from "chai";

import { Grid, isAliveCell, getNbAliveNeighbors, getSizeX, getSizeY, nextGeneration } from "../src/GameOfLife";

describe('GameOfLife', () => {

  describe('Grid', () => {
    it('should be a boolean[][]', () => {
      const grid: Grid = [[false]];
    });
  });

  describe('getSizeX', () => {
    it('should return 0', () => {
      const grid: Grid = [[]];
      expect(getSizeX(grid)).to.equal(0);
    });
    it('should return 1', () => {
      const grid: Grid = [
        [true],
        [true],
      ];
      expect(getSizeX(grid)).to.equal(1);
    });
  });

  describe('getSizeY', () => {
    it('should return 0', () => {
      const grid: Grid = [];
      expect(getSizeY(grid)).to.equal(0);
    });
    it('should return 2', () => {
      const grid: Grid = [
        [true],
        [true],
      ];
      expect(getSizeY(grid)).to.equal(2);
    });
  });

  describe('isAliveCell', () => {
    it('should return true', () => {
      const grid: Grid = [[true]];
      expect(isAliveCell(grid, 0, 0)).to.equal(true);
    });
    it('should return false', () => {
      const grid: Grid = [[false]];
      expect(isAliveCell(grid, 0, 0)).to.equal(false);
    });
    it('should return false (out of grid)', () => {
      const grid: Grid = [[]];
      expect(isAliveCell(grid, -1, -1)).to.equal(false);
      expect(isAliveCell(grid, 2, 2)).to.equal(false);
    });
  });

  describe('getNbAliveNeighbors', () => {
    it('should return 0', () => {
      const grid: Grid = [[]];
      const nbNeighbors = getNbAliveNeighbors(grid, 0, 0);
      expect(nbNeighbors).to.equal(0);
    });
    it('should return 0', () => {
      const grid: Grid = [[false]];
      const nbNeighbors = getNbAliveNeighbors(grid, 0, 0);
      expect(nbNeighbors).to.equal(0);
    });
    it('should return 3', () => {
      const grid: Grid = [
        [true, true, true],
        [false, false, false],
        [false, false, false],
      ];
      const nbNeighbors = getNbAliveNeighbors(grid, 1, 1);
      expect(nbNeighbors).to.equal(3);
    });
    it('should return 8', () => {
      const grid: Grid = [
        [true, true, true],
        [true, false, true],
        [true, true, true],
      ];
      const nbNeighbors = getNbAliveNeighbors(grid, 1, 1);
      expect(nbNeighbors).to.equal(8);
    });
    describe('edges', () => {
      it('should return 3', () => {
        const grid: Grid = [
          [true, true],
          [true, true],
        ];
        const nbNeighbors = getNbAliveNeighbors(grid, 0, 0);
        expect(nbNeighbors).to.equal(3);
      });
      it('should return 3', () => {
        const grid: Grid = [
          [true, true],
          [true, true],
        ];
        const nbNeighbors = getNbAliveNeighbors(grid, 0, 1);
        expect(nbNeighbors).to.equal(3);
      });
      it('should return 3', () => {
        const grid: Grid = [
          [true, true],
          [true, true],
        ];
        const nbNeighbors = getNbAliveNeighbors(grid, 1, 1);
        expect(nbNeighbors).to.equal(3);
      });
      it('should return 3', () => {
        const grid: Grid = [
          [true, true],
          [true, true],
        ];
        const nbNeighbors = getNbAliveNeighbors(grid, 1, 0);
        expect(nbNeighbors).to.equal(3);
      });
    });
  });

  describe('nextGeneration', () => {
    it('should take a grid as argument', () => {
      const grid: Grid = [[]];
      nextGeneration(grid);
    });
    it('should return a Grid', () => {
      const grid: Grid = [[]];
      const newGrid: Grid = nextGeneration(grid);
    });
    describe('1x1', () => {
      it('should stay died', () => {
        const grid: Grid = [[false]];
        const newGrid = nextGeneration(grid);
        expect(newGrid).to.deep.equal(grid);
      });
    });

    describe('3x3', () => {
      it('under-population (<2 neighbor) => die', () => {
        const grid: Grid = [
          [false, false, false],
          [false, true, false],
          [false, false, false],
        ];
        const newGrid = nextGeneration(grid);
        expect(newGrid).to.deep.equal([
          [false, false, false],
          [false, false, false],
          [false, false, false],
        ]);
      });
      it('survival (=2 neighbor)', () => {
        const grid: Grid = [
          [true, false, false],
          [false, true, false],
          [false, false, true],
        ];
        const newGrid = nextGeneration(grid);
        expect(newGrid).to.deep.equal([
          [false, false, false],
          [false, true, false],
          [false, false, false],
        ]);
      });
      it('survival (=3 neighbor)', () => {
        const grid: Grid = [
          [false, false, false],
          [true, true, true],
          [false, true, false],
        ];
        const newGrid = nextGeneration(grid);
        expect(newGrid).to.deep.equal([
          [false, true, false],
          [true, true, true],
          [true, true, true],
        ]);
      });
      it('overcrowding (>3 neighbor)', () => {
        const grid: Grid = [
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ];
        const newGrid = nextGeneration(grid);
        expect(newGrid).to.deep.equal([
          [true, false, true],
          [false, false, false],
          [true, false, true],
        ]);
      });
      it('reproduction (=3 neighbor)', () => {
        const grid: Grid = [
          [false, false, false],
          [true, false, true],
          [false, true, false],
        ];
        const newGrid = nextGeneration(grid);
        expect(newGrid).to.deep.equal([
          [false, false, false],
          [false, true, false],
          [false, true, false],
        ]);
      });
    });
  });
});