var shuffleSequence = seq(/*"intro",*/ sepWith("sep", seq("practice",
                rshuffle("target", "filler"))));
var practiceItemTypes = ["practice"];

var defaults = [
    "Separator", {
        transfer: 1000,
        normalMessage: "Please wait for the next sentence.",
        errorMessage: "Wrong. Please wait for the next sentence."
    },
    "AcceptabilityJudgment", {
        as: ["1", "2", "3", "4", "5", "6", "7"],
        presentAsScale: true,
        instructions: "Use number keys or click boxes to answer.",
        leftComment: "(Bad)", rightComment: "(Good)"
    },
    "Message", {
        hideProgressBar: true
    },
    "Form", {
        hideProgressBar: true,
        continueOnReturn: true,
        saveReactionTime: true
    }
];

var items = [

    ["sep", "Separator", { }],

    // New in Ibex 0.3-beta19. You can now determine the point in the
    // experiment at which the counter for latin square designs will be
    // updated. (Previously, this was always updated upon completion of the
    // experiment.) To do this, insert the special '__SetCounter__' controller
    // at the desired point in your running order. If given no options, the
    // counter is incremented by one. If given an 'inc' option, the counter is
    // incremented by the specified amount. If given a 'set' option, the
    // counter is set to the given number. (E.g., { set: 100 }, { inc: -1 })
    //
    //["setcounter", "__SetCounter__", { }],

    // NOTE: You could also use the 'Message' controller for the experiment
    // intro (this provides a simple consent checkbox).

    ["intro", "Form", {
        html: { include: "example_intro.html" },
        validators: {
            age: function (s) { if (s.match(/^\d+$/)) return true; else return "Bad value for \u2018age\u2019"; }
        }
    } ],

    // Three practice items for acceptability judgments. No groups necessary
    // here, everyone can can get the same sentences.

    ["practice", "AcceptabilityJudgment", {s: "Ismerem Mari hugát."}],
    ["practice", "AcceptabilityJudgment", {s: "Péter látja az autót."}],
    ["practice", "AcceptabilityJudgment", {s: "Kereste Petőfinek egy könyvét."}],

    // Real sentences. Here the grouping becomes important.

    // The first question will be chosen if the first sentence from the
    // previous two items is chosen; the second question will be chosen if the
    // second sentence from the previous pair of items is chosen.

    ["target", "AcceptabilityJudgment", {s: "Látunk Marinak egy nővérét."}],

    // Splitting the sentences up into groups. We are testing conditions across
    // groups of participants. This means that not all participants will see
    // the same examples, but we can compare results across participants.
    //
    // The idea is that there are three blocks of examples. Each participant
    // will see examples from one of these blocks and when all blocks have been
    // seen, the next participant gets the first block again. So for 5
    // participants R1-R5, R1-3 will see blocks B1-3, R4 will see B1, R5 will
    // see B2 etc.
    //
    // This is implemented by using the Latin square-aspect of ibex, more
    // specifically its group features.
    //
    // Group 1, for example, would have negation, the modifier néhány and the
    // modifier minden. Each participant would see one of these, the next
    // participant another one, and so on.

    [["target", [1, 1]], "AcceptabilityJudgment", {s: "Nem látunk Marinak egy nővérét."}],
    [["target", [1, 2]], "AcceptabilityJudgment", {s: "Látunk Marinak néhány nővérét."}],
    [["target", [1, 3]], "AcceptabilityJudgment", {s: "Látunk Marinak minden nővérét."}],

    [["target", [2, 1]], "AcceptabilityJudgment", {s: "Nem látunk Marinak egy nővérét."}],
    [["target", [2, 2]], "AcceptabilityJudgment", {s: "Látunk Marinak néhány nővérét."}],
    [["target", [2, 3]], "AcceptabilityJudgment", {s: "Látunk Marinak minden nővérét."}],

    // nn filler sentences; do they have to be part of a group?

    ["filler", "AcceptabilityJudgment", {s: "Egy könyvet adnak a gyerekek Marinak."}],
    ["filler", "AcceptabilityJudgment", {s: "Marinak adnak egy könyvet a gyerekek."}],
    ["filler", "AcceptabilityJudgment", {s: "Két gyerek ad egy könyvet Marinak."}],
    ["filler", "AcceptabilityJudgment", {s: "Megállnak a rendőrök a ház melett."}],
    ["filler", "AcceptabilityJudgment", {s: "A rendőrök a ház mellett álltak meg."}],
    ["filler", "AcceptabilityJudgment", {s: "Elfutnak a kutyák Maritól."}],
    ["filler", "AcceptabilityJudgment", {s: "A kutya Maritól futott el."}],
    ["filler", "AcceptabilityJudgment", {s: "Ádám megeszi a vacsoráját."}],
    ["filler", "AcceptabilityJudgment", {s: "Ádám megeszi a vacsorát."}],
    ["filler", "AcceptabilityJudgment", {s: "A koncertet az együttes befejezte."}],

    ["filler", "AcceptabilityJudgment", {s: "Két gyerek adnak egy könyvet Marinak."}],
    ["filler", "AcceptabilityJudgment", {s: "Marinak adnak két gyerek egy könyvet."}],
    ["filler", "AcceptabilityJudgment", {s: "A rendőr megállank ház."}],
    ["filler", "AcceptabilityJudgment", {s: "A kutya elfutnak Marinak."}],
    ["filler", "AcceptabilityJudgment", {s: "Elfutnak a kutya Maritól."}],
    ["filler", "AcceptabilityJudgment", {s: "Megállnak a rendőr a ház."}],
    ["filler", "AcceptabilityJudgment", {s: "Megállnak a ház melett a rendőr."}],
    ["filler", "AcceptabilityJudgment", {s: "Az együttes befejez a koncertet."}],
    ["filler", "AcceptabilityJudgment", {s: "A koncertet az együttes befejez."}],
    ["filler", "AcceptabilityJudgment", {s: "Ádám a megeszi vacsora."}],

    ["filler", "AcceptabilityJudgment", {s: "János ivott meg egy korsóval a vacsorán."}],
    ["filler", "AcceptabilityJudgment", {s: "János ivott egy korsóval meg a vacsorán."}],
    ["filler", "AcceptabilityJudgment", {s: "János ivott egy korsóval a vacsorán meg."}],

    ["filler", "AcceptabilityJudgment", {s: "Tegnap ment haza István az iskolából."}],
    ["filler", "AcceptabilityJudgment", {s: "Tegnap ment István haza az iskolából."}],
    ["filler", "AcceptabilityJudgment", {s: "Tegnap ment István az iskolából haza."}],

    ["filler", "AcceptabilityJudgment", {s: "Imre és Juli látta sajátmagát a tévében."}],
    ["filler", "AcceptabilityJudgment", {s: "Imre és Juli látta sajátmagukat a tévében."}],
    ["filler", "AcceptabilityJudgment", {s: "Imre és Juli látták sajátmagukat a tévében."}],

];
