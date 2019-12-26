import { writeFile } from "./fileHandler";

// https://github.com/tobiastoft/SymbolicDisarray/blob/master/SymbolicDisarray.pde
const plotterDimensions: {xMin: number, yMin: number, xMax:number, yMax:number} = {
    xMin: 170,
    yMin: 602,
    xMax: 15370,
    yMax: 10602,
};

(async () => {

    const label: string = "Symbolic Disarray";

    const grid: {rows: number, columns: number} = {
        rows: 22,
        columns: 12
    };
    const current: {row: number, column: number} = {
        row: 0,
        column: 0
    };

    const hpglArray: string[] = [];

    hpglArray.push(`IN;`);
    hpglArray.push(`SP1;`);

    // draw extreme limits in blue
    // https://djipco.github.io/hpgl/hpgl.js.html#line416
    hpglArray.push(`SP5;`);
    hpglArray.push(`PU0,0;`);
    hpglArray.push(`EA16158,11040;`);

    // draw page size in green dotted
    hpglArray.push(`SP3;`);
    hpglArray.push(`LT2;`);
    hpglArray.push(`PU${plotterDimensions.xMin},${plotterDimensions.yMin};`);
    hpglArray.push(`EA${plotterDimensions.xMax},${plotterDimensions.yMax};`);

    hpglArray.push(`SP1;`);
    hpglArray.push(`LT;`);

    // get into position
    // const pos = (plotterDimensions.yMax - plotterDimensions.yMin) / 2;
    // hpglArray.push(`PU${plotterDimensions.xMin},${1550};`);

    // const y = mapRange(80, 0, plotterDimensions.xMax, plotterDimensions.yMin, plotterDimensions.yMax);
    // hpglArray.push(`PU${plotterDimensions.xMax},${y};`);
    //
    // hpglArray.push(`SI0.14,0.14;`);
    // hpglArray.push(`LB${label}${String.fromCharCode(0x03)}`);

    while (current.row < grid.rows && current.column < grid.columns) {
        draw(current.column, current.row, hpglArray);
        if (current.column < grid.columns) {
            current.row++;
            if (current.row >= grid.rows) {
                current.column++;
                current.row = 0;
            }
        }
    }
    writeFile(hpglArray);

})().catch(error => {console.error(`Bang! ${error}`)});

function draw(column, row, hpglArray: string[]) {
    console.log(column, row);

    const startX = 650;
    const startY = 650;

    const x = startX * (row + 1);
    const y = startY * (column + 1);

    drawShape(x, y, hpglArray);
}

function drawShape(xPos: number, yPos: number, hpglArray: string[]) {
    hpglArray.push(`ER${xPos},${yPos};`);
    hpglArray.push(`PU;`);

    // points.add( new PVector(1,0) );
    // points.add( new PVector(1,1) );
    // points.add( new PVector(0,1) );
    // points.add( new PVector(0,0) );
    // points.add( new PVector(1,0) );
    // PD 0,0, 0,500, 500,500, 500,0, 0,0;


}

function mapRange(value, istart, istop, ostart, ostop) {
    return Math.round(ostart + (ostop - ostart) * ((value - istart) / (istop - istart)));
}
