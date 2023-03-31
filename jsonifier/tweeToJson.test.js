const {identifyPassageHeader, isLineAPassageHeader, getJsonFromLines} = require("./tweeToJson");
const assert = require('assert').strict;

describe('function identifyPassageHeader', function () {
    it('should return passage name from line', function () {
        const simple = ':: An overgrown path';
        const tags = ':: An overgrown path [forest spooky]';
        const metadata = ':: An overgrown path {"position":"600,400","size":"100,200"}';
        const full = ':: An overgrown path [forest spooky] {"position":"600,400","size":"100,200"}';

        assert.equal(identifyPassageHeader(simple).name, 'An overgrown path')
        assert.equal(identifyPassageHeader(tags).name, 'An overgrown path')
        assert.equal(identifyPassageHeader(metadata).name, 'An overgrown path')
        assert.equal(identifyPassageHeader(full).name, 'An overgrown path')
    })

    it('should return passage tags from line', function () {
        const simple = ':: An overgrown path';
        const tags = ':: An overgrown path [forest spooky]';
        const metadata = ':: An overgrown path {"position":"600,400","size":"100,200"}';
        const full = ':: An overgrown path [forest spooky] {"position":"600,400","size":"100,200"}';

        assert.equal(JSON.stringify(identifyPassageHeader(simple).tags), JSON.stringify([]))
        assert.equal(JSON.stringify(identifyPassageHeader(tags).tags), JSON.stringify(['forest', 'spooky']))
        assert.equal(JSON.stringify(identifyPassageHeader(metadata).tags), JSON.stringify([]))
        assert.equal(JSON.stringify(identifyPassageHeader(full).tags), JSON.stringify(['forest', 'spooky']))
    })

    it('should return passage metadata from line', function () {
        const simple = ':: An overgrown path';
        const tags = ':: An overgrown path [forest spooky]';
        const metadata = ':: An overgrown path {"position":"600,400","size":"100,200"}';
        const full = ':: An overgrown path [forest spooky] {"position":"600,400","size":"100,200"}';

        assert.equal(identifyPassageHeader(simple).metadata, null)
        assert.equal(identifyPassageHeader(tags).metadata, null)
        assert.equal(JSON.stringify(identifyPassageHeader(metadata).metadata), JSON.stringify({"position":"600,400","size":"100,200"}))
        assert.equal(JSON.stringify(identifyPassageHeader(full).metadata), JSON.stringify({"position":"600,400","size":"100,200"}))
    })
})

describe('function isLineAPassageHeader', function () {
    it('should return true if line begins with "::"', function () {
        const line = ':: An overgrown path [forest spooky] {"position":"600,400","size":"100,200"}';

        assert.equal(isLineAPassageHeader(line), true)
    })

    it('should return false if line doesn\'t begins with "::"', function () {
        const line = '//\'\'Image face à face avec son amie\'\'//';

        assert.equal(isLineAPassageHeader(line), false)
    })
})

describe('function getJsonFromLines', function () {
    it('should return valid json from twee lines', function () {
        const lines = [
            ':: StoryTitle',
            'Histoire amnésie',
            "",
            "",
            "",
            ':: StoryData',
            '{',
            '    "ifid": "70EA29AA-352A-417D-B70E-35692C303992",',
            '    "format": "Harlowe",',
            '    "format-version": "3.3.5",',
            '    "start": "1.0",',
            '    "zoom": 1',
            '}',
            ':: 1.0 {"position":"425,350","size":"100,100"}',
            "//''Image face à face avec son amie''//",
            '<img src="../front/static/assets/illustrations/seq1.svg" width="256" height="256">',
            "",
            "",
            "",
            "[[Suivant->1.1]]",
            ':: 1.1 {"position":"550,350","size":"100,100"}',
            "//''Image face à face avec son amie''//",
            '<img src="../front/static/assets/illustrations/seq1.svg" width="256" height="256">',
            "",
            "",
            "— Dis Dian, tu es déjà partie dans le pays de tes parents ?",
            "",
            "— Oui ! On essaie d’y aller tous les ans… bon, avec le covid, ça a été pas mal compromis…",
        ]

        const expectedJson = {
            data: {
                title: 'Histoire amnésie',
                start: '1.0',
            },
            passages: {
                '1.0': {
                    name: '1.0',
                    tags: [],
                    metadata: {position: "425,350", size: "100,100"},
                    lines: [
                        "//''Image face à face avec son amie''//",
                        '<img src="../front/static/assets/illustrations/seq1.svg" width="256" height="256">',
                        "",
                        "",
                        "",
                        "[[Suivant->1.1]]"
                    ]
                },
                '1.1': {
                    name: '1.1',
                    tags: [],
                    metadata: {position: "550,350", size: "100,100"},
                    lines: [
                        "//''Image face à face avec son amie''//",
                        '<img src="../front/static/assets/illustrations/seq1.svg" width="256" height="256">',
                        "",
                        "",
                        "— Dis Dian, tu es déjà partie dans le pays de tes parents ?",
                        "",
                        "— Oui ! On essaie d’y aller tous les ans… bon, avec le covid, ça a été pas mal compromis…",
                    ]
                }
            }
        }

        assert.equal(getJsonFromLines(lines), JSON.stringify(expectedJson))
    });
})

