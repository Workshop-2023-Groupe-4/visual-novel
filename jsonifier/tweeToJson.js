const fs = require('fs');
const lineReader = require('line-reader');

const passageLinkRegex = /\[\[(.+)->([\w.-]+)]]/gm;
const urlLinkRegex = /\[(.+)->([\w/.-]+)]/gm;

const h1Regex = /^# (.+)/gm;
const h1Substitution = '<h1>$1</h1>';

const h2Regex = /^## (.+)/gm;
const h2Substitution = '<h2>$1</h2>';

const h3Regex = /^### (.+)/gm;
const h3Substitution = '<h3>$1</h3>';

const h4Regex = /^#### (.+)/gm;
const h4Substitution = '<h4>$1</h4>';

const paperDialogRegex = /^@@([ a-zA-ZÀ-ÖÙ-öù-ÿ0-9]+): (.+)/gm;
const paperDialogSubstitution = '<div class="paper parallax" data-depth="0.50"><span>$1</span><p>$2</p></div>';

const thoughtRegex = /^@@ (.+)/gm;
const thoughtSubstitution = '<div class="thoughts"><p>$1</p></div>'

const heroDialogRegex = /^@\(([ a-zA-ZÀ-ÖÙ-öù-ÿ0-9]+)\): (.+)/gm;
const heroDialogSubstitution = '<div class="dialog" data-hero="true"><span>$1</span><p>$2</p></div>'

const dialogRegex = /^@([ a-zA-ZÀ-ÖÙ-öù-ÿ0-9]+): (.+)/gm;
const dialogSubstitution = '<div class="dialog" data-hero="false"><span>$1</span><p>$2</p></div>'

const italicRegex = /\/\/(.+)\/\//gm;
const italicSubstitution = '<i>$1</i>';

const boldRegex = /''(.+)''/gm;
const boldSubstitution = '<b>$1</b>';

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

        const {name, tags, metadata, isChapter, chapterData} = identifyPassageHeader(line);

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
            isChapter,
            chapterData,
            lines: []
        };
        if (namesUsed.includes(name)) {
            console.warn(name + ' is present multiple times')
        }
        namesUsed.push(name);
    });

    json.passages[passage.name] = passage;

    Object.values(json.passages).forEach(passage => {
        const {links, linesWithoutLinks} = extractLinksFromLines(passage.lines);

        passage.links = links;
        passage.lines = linesWithoutLinks
    })


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

        if (item.startsWith('[') && item.endsWith(']')) {
            tags.push(
                item.replace('[', '')
                    .replace(']', '')
            );
            isInTags = false;
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

    const name = nameItems.length ? nameItems.join(' ') : null;

    return {
        isChapter: isChapterFromName(name),
        chapterData: getChapterDataFromName(name),
        name,
        tags,
        metadata
    };
}

function isChapterFromName(name) {
    return name && name.startsWith('chapter-')
}

function getChapterDataFromName(name) {
    if (!name.startsWith('chapter-')) {
        return null
    }

    const [chapter, variant] = name.replace('chapter-', '').split('.')

    return {
        chapter, variant
    }
}

function isLineAPassageHeader(line) {
    return line.startsWith('::')
}

function formattedLine(line) {
    line = line.replace(h1Regex, h1Substitution);
    line = line.replace(h2Regex, h2Substitution);
    line = line.replace(h3Regex, h3Substitution);
    line = line.replace(h4Regex, h4Substitution);

    line = line.replace(paperDialogRegex, paperDialogSubstitution);
    line = line.replace(thoughtRegex, thoughtSubstitution);
    line = line.replace(heroDialogRegex, heroDialogSubstitution);
    line = line.replace(dialogRegex, dialogSubstitution);
    line = line.replace(italicRegex, italicSubstitution);
    line = line.replace(boldRegex, boldSubstitution);

    return line
}

function extractLinksFromLines(lines) {
    const links = [];
    const text = lines.join('\n');

    const textWithoutLinks = text.replace(passageLinkRegex, (match, $1, $2) => {
        links.push({
            text: $1,
            href: '#passage-' + $2
        })

        return ''
    }).replace(urlLinkRegex, (match, $1, $2) => {
        links.push({
            text: $1,
            href: $2
        })

        return ''
    });

    const linesWithoutLinks = textWithoutLinks.split('\n').map(line => line.trim()).filter(line => line !== '');

    return {
        links,
        linesWithoutLinks
    }
}

module.exports = {
    isLineAPassageHeader,
    getJsonFromLines,
    identifyPassageHeader,
    formattedLine,
    jsonizeStory,
    extractLinksFromLines,
}

