import { Graphics } from 'pixi.js';
export interface ICellContructor {
    grid: Cell[][];
    col: number;
    row: number;
    color?: string;
    x: number;
    y: number;
    w: number;
    h: number;
}
export interface INeighbors {
    all: Cell[];
    top: {
        left: Cell;
        center: Cell;
        right: Cell;
    };
    center: {
        left: Cell;
        self: Cell;
        right: Cell;
    };
    bottom: {
        left: Cell;
        center: Cell;
        right: Cell;
    };
}
export declare class Cell extends Graphics {
    readonly grid: Cell[][];
    col: number;
    row: number;
    private _neighborhood;
    constructor(obj: ICellContructor);
    countActiveNeighbors(): number;
    neighborhood(): INeighbors;
}
