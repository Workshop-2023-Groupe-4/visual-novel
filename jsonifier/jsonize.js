const fs = require('fs');
const {jsonizeStory} = require("./tweeToJson");


const storiesInputFolder = './stories/';
const storiesOutputFolder = './data/stories/';
const stories = fs.readdirSync(storiesInputFolder);

stories.forEach(storyFilename => {
    jsonizeStory(
        storiesInputFolder + storyFilename,
        storiesOutputFolder + storyFilename.replace('.twee', '.json')
    )
})
