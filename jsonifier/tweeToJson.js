const fs = require('fs');
const lineReader = require('line-reader');

function jsonizeStory(tweeInputPath, jsonOutputPath) {
    const lines = [];
    lineReader.eachLine(tweeInputPath, function (line, last) {
        lines.push(line)
        if (last) {
            fs.writeFileSync(jsonOutputPath, getJsonFromLines(lines))
        }
    });
}

function getJsonFromLines(lines) {
    const namesUsed = [];
    const json = {
        data: {
            title: null,
            start: null,
        },
        passages: {},
    };
    let isInPassage = false;
    let isInStoryTitle = false;
    let isInStoryData = false;
    let storyDataJson = "";
    let passage = null;

    lines.forEach(line => {
        if (isInStoryTitle) {
            json.data.title = line;
            isInStoryTitle = false;
            return;
        }

        if (isInStoryData) {
            storyDataJson += line;

            if (line === "}") {
                isInStoryData = false;

                const storyData = JSON.parse(storyDataJson);

                json.data.start = storyData.start;
            }
            return;
        }

        if (!isLineAPassageHeader(line)) {
            if (!passage) {
                return
            }

            if (line === "") {
                return
            }

            passage.lines.push(formattedLine(line));
            return;
        }

        if (passage) {
            json.passages[passage.name] = passage;
        }

        const {name, tags, metadata} = identifyPassageHeader(line);

        if (name === "StoryTitle") {
            isInStoryTitle = true;
            return;
        }

        if (name === "StoryData") {
            isInStoryData = true;
            return;
        }

        isInPassage = true;
        passage = {
            name,
            tags,
            metadata,
            lines: []
        };
        if (namesUsed.includes(name)) {
            console.warn(name + ' is present multiple times')
        }
        namesUsed.push(name);
    });

    json.passages[passage.name] = passage;


    return JSON.stringify(json);
}

function identifyPassageHeader(line) {
    const lineWithoutPrefix = line.replace('::', '').trim();

    const lineItems = lineWithoutPrefix.split(' ');

    let nameItems = [];
    let tags = [];
    let metadata = null;
    let isInTags = false;

    lineItems.forEach(item => {
        if (item.startsWith('{') && item.endsWith('}')) {
            metadata = JSON.parse(item);
            return
        }

        if (item.startsWith('[')) {
            tags.push(item.replace('[', ''));
            isInTags = true;
            return
        }
        if (item.endsWith(']')) {
            tags.push(item.replace(']', ''));
            isInTags = false;
            return
        }

        if (isInTags) {
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

function isLineAPassageHeader(line) {
    return line.startsWith('::')
}

function formattedLine(line) {
    const linkRegex = /\[\[(.+)->(.+)]]/gm
    const linkSubstitution = '<a href="#passage-$2">$1</a>';

    line = line.replace(linkRegex, linkSubstitution);

    const italicRegex = /\/\/(.+)\/\//gm;
    const italicSubstitution = '<i>$1</i>';

    line = line.replace(italicRegex, italicSubstitution);

    const boldRegex = /''(.+)''/gm;
    const boldSubstitution = '<b>$1</b>';

    line = line.replace(boldRegex, boldSubstitution);

    return line
}

module.exports = {
    isLineAPassageHeader,
    getJsonFromLines,
    identifyPassageHeader,
    formattedLine,
    jsonizeStory
}

