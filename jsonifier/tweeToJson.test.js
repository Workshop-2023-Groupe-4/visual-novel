const {
    identifyPassageHeader,
    isLineAPassageHeader,
    getJsonFromLines,
    formattedLine,
    extractLinksFromLines
} = require("./tweeToJson");
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
        assert.equal(JSON.stringify(identifyPassageHeader(metadata).metadata), JSON.stringify({
            "position": "600,400",
            "size": "100,200"
        }))
        assert.equal(JSON.stringify(identifyPassageHeader(full).metadata), JSON.stringify({
            "position": "600,400",
            "size": "100,200"
        }))
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
    it('should return trimed json from twee lines', function () {
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
            "Image face à face avec son amie",
            '<img src="../front/static/assets/illustrations/seq1.svg" width="256" height="256">',
            "",
            "",
            "",
            ':: 1.1 {"position":"550,350","size":"100,100"}',
            "Image face à face avec son amie",
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
                        "Image face à face avec son amie",
                        '<img src="../front/static/assets/illustrations/seq1.svg" width="256" height="256">',
                    ],
                    links: [],
                },
                '1.1': {
                    name: '1.1',
                    tags: [],
                    metadata: {position: "550,350", size: "100,100"},
                    lines: [
                        "Image face à face avec son amie",
                        '<img src="../front/static/assets/illustrations/seq1.svg" width="256" height="256">',
                        "— Dis Dian, tu es déjà partie dans le pays de tes parents ?",
                        "— Oui ! On essaie d’y aller tous les ans… bon, avec le covid, ça a été pas mal compromis…",
                    ],
                    links: [],
                }
            }
        }

        assert.equal(getJsonFromLines(lines), JSON.stringify(expectedJson))
    });
})

describe('function formattedLine', function () {
    it('should identity paper dialog', function () {
        const line = "@@Dian: Dian réveille toi !";

        assert.equal(formattedLine(line), '<div class="paper parallax" data-depth="0.50"><span>Dian</span><p>Dian réveille toi !</p></div>')
    })

    it('should identity hero dialog', function () {
        const line = "@(Dian): (elle réfléchit) Coucou (elle s'avance) ça va?";

        assert.equal(formattedLine(line), '<div class="dialog" data-hero="true"><span>Dian</span><p>(elle réfléchit) Coucou (elle s\'avance) ça va?</p></div>')
    })

    it('should identity dialog', function () {
        const line = "@Infirmière scolaire: (elle réfléchit) Coucou (elle s'avance) ça va?";

        assert.equal(formattedLine(line), '<div class="dialog" data-hero="false"><span>Infirmière scolaire</span><p>(elle réfléchit) Coucou (elle s\'avance) ça va?</p></div>')
    })

    it('should identity thoughts', function () {
        const line = "@@ Je n’en suis plus si sûre...";

        assert.equal(formattedLine(line), '<div class="thoughts"><p>Je n’en suis plus si sûre...</p></div>')
    })

    it('should identify bold text', function () {
        const line = "''Image de la classe''";
        assert.equal(formattedLine(line), '<b>Image de la classe</b>')
    })

    it('should identify italic text', function () {
        const line = "//Image de la classe//";
        assert.equal(formattedLine(line), '<i>Image de la classe</i>')
    })

    it('should identify italic in bold text', function () {
        const line = "''//Image de la classe//''";
        assert.equal(formattedLine(line), '<b><i>Image de la classe</i></b>')
    })

    it('should identify bold in italic text', function () {
        const line = "//''Image de la classe''//";
        assert.equal(formattedLine(line), '<i><b>Image de la classe</b></i>')
    })
})

describe('function extractLinksFromLines', function () {
    it('should return links lists in order', function () {
        const lines = [
            'qsldjqskldjqd',
            'qsdjqskd',
            'sqds [[Suivant->1.1]]',
            'zdqsd',
            '[[Non ! Tout va bien, pardon.->1.2]]',
        ];

        const {links} = extractLinksFromLines(lines);

        assert.equal(links.length, 2);
        assert.equal(JSON.stringify(links[0]), JSON.stringify({text: 'Suivant', href: '1.1'}));
        assert.equal(JSON.stringify(links[1]), JSON.stringify({text: 'Non ! Tout va bien, pardon.', href: '1.2'}));
    })

    it('should return lines without links', function () {
        const linesWithLinks = [
            'line 1',
            'line 2',
            'line 3 [[Suivant->1.1]]',
            'line 4',
            '[[Non ! Tout va bien, pardon.->1.2]]',
        ];

        const expectedLines = [
            'line 1',
            'line 2',
            'line 3',
            'line 4',
        ];

        const {linesWithoutLinks} = extractLinksFromLines(linesWithLinks);

        assert.equal(JSON.stringify(linesWithoutLinks), JSON.stringify(expectedLines));
    })
})

