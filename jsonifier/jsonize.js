const fs = require('fs');
const {jsonizeStory} = require("./tweeToJson");


const storiesInputFolder = './stories/';
const stories = fs.readdirSync(storiesInputFolder);

stories.forEach(storyFilename => {
    const storyName = storyFilename.replace('.twee', '');

    jsonizeStory(
        storiesInputFolder + storyFilename,
        './content/stories/' + storyName + '/story.json'
    )
})
