const fs = require('fs');
const lineReader = require('line-reader');

const filepath = './story-1.twee';

function getJsonFromLines(lines)
{
    const json = [];
    let isInPassage = false;
    let passage = null;

    lines.forEach(line=>{
        if(!isLineAPassageHeader(line)) {
            passage.lines.push(line)
            return;
        }

        if(passage) {
            json.push(passage);
        }

        isInPassage = true
        const {name, tags, metadata} = identifyPassageHeader(line);
        passage = {
            name,
            tags,
            metadata,
            lines: []
        };
    });

    json.push(passage);



    return JSON.stringify(json);
}

function identifyPassageHeader(line)
{
    const lineWithoutPrefix = line.replace('::', '').trim();

    const lineItems = lineWithoutPrefix.split(' ');

    let nameItems = [];
    let tags = [];
    let metadata = null;
    let isInTags = false;

    lineItems.forEach(item=>{
        if(item.startsWith('{') && item.endsWith('}')) {
            metadata = JSON.parse(item);
            return
        }

        if(item.startsWith('[')) {
            tags.push(item.replace('[', ''));
            isInTags = true;
            return
        }
        if(item.endsWith(']')) {
            tags.push(item.replace(']', ''));
            isInTags = false;
            return
        }

        if(isInTags) {
            tags.push(item);
            return;
        }

        nameItems.push(item);
    })

    return {
        name: nameItems.length ? nameItems.join(' ') : null,
        tags,
        metadata
    }
}

function isLineAPassageHeader(line)
{
    return line.startsWith('::')
}

module.exports = {
    isLineAPassageHeader,
    getJsonFromLines,
    identifyPassageHeader
}

