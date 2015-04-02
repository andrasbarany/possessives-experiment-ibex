var shuffleSequence = seq(/*"intro",*/ sepWith("sep", seq("practice", rshuffle("target"))), sepWith("sep", rshuffle("filler")));
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

    // The first question will be chosen if the first sentence from the previous two items is chosen;
    // the second question will be chosen if the second sentence from the previous pair of items is chosen.

    ["target", "AcceptabilityJudgment", {s: "Látunk Marinak egy nővérét."}],
    ["target", "AcceptabilityJudgment", {s: "Péternek ismerek egy barátját."}],

    // nn filler sentences; do they have to be part of a group?

    ["filler", "AcceptabilityJudgment", {s: "Ismerem a nővérét."}],
    ["filler", "AcceptabilityJudgment", {s: "Péter haza ment."}],

];
