const fs = require('fs');
const lineReader = require('line-reader');
const {getJsonFromLines} = require("./tweeToJson");

const input = './stories/amnesia.twee';
const output = './front/data/stories/amnesia.twee';

const lines = [];
lineReader.eachLine(input, function(line, last) {
    lines.push(line)
    if(last) {
        fs.writeFileSync(output, getJsonFromLines(lines))
    }
});


