const arrayToTxtFile = require("array-to-txt-file");

export function writeFile(hpglArray: string[]) {
    hpglArray.push(`PU;`);
    arrayToTxtFile(hpglArray, "./output/output.hpgl", function (err) {

    });
}
