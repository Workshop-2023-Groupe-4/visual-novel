const fs = require('fs');
const lineReader = require('line-reader');
const {getJsonFromLines} = require("./tweeToJson");

const filepath = './story-1.twee';

const lines = [];
lineReader.eachLine(filepath, function(line, last) {
    lines.push(line)
    if(last) {
        fs.writeFileSync('./story-1.json', getJsonFromLines(lines))
    }
});


