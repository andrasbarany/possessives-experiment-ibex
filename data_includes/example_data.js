var shuffleSequence = seq(/*"intro",*/ sepWith("sep", seq("practice", rshuffle("s1", "s2"))), sepWith("sep", rshuffle("f1", "f2")));
var practiceItemTypes = ["practice"];

var defaults = [
    "Separator", {
        transfer: 1000,
        normalMessage: "Please wait for the next sentence.",
        errorMessage: "Wrong. Please wait for the next sentence."
    },
    "DashedSentence", {
        mode: "self-paced reading",
    },
    "AcceptabilityJudgment", {
        as: ["1", "2", "3", "4", "5", "6", "7"],
        presentAsScale: true,
        instructions: "Use number keys or click boxes to answer.",
        leftComment: "(Bad)", rightComment: "(Good)"
    },
    "Question", {
        hasCorrect: true
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

    // New in Ibex 0.3-beta-9. You can now add a '__SendResults__' controller in your shuffle
    // sequence to send results before the experiment has finished. This is NOT intended to allow
    // for incremental sending of results -- you should send results exactly once per experiment.
    // However, it does permit additional messages to be displayed to participants once the
    // experiment itself is over. If you are manually inserting a '__SendResults__' controller into
    // the shuffle sequence, you must set the 'manualSendResults' configuration variable to 'true', since
    // otherwise, results are automatically sent at the end of the experiment.
    //
    //["sr", "__SendResults__", { }],

    ["sep", "Separator", { }],

    // New in Ibex 0.3-beta19. You can now determine the point in the experiment at which the counter
    // for latin square designs will be updated. (Previously, this was always updated upon completion
    // of the experiment.) To do this, insert the special '__SetCounter__' controller at the desired
    // point in your running order. If given no options, the counter is incremented by one. If given
    // an 'inc' option, the counter is incremented by the specified amount. If given a 'set' option,
    // the counter is set to the given number. (E.g., { set: 100 }, { inc: -1 })
    //
    //["setcounter", "__SetCounter__", { }],

    // NOTE: You could also use the 'Message' controller for the experiment intro (this provides a simple
    // consent checkbox).

    ["intro", "Form", {
        html: { include: "example_intro.html" },
        validators: {
            age: function (s) { if (s.match(/^\d+$/)) return true; else return "Bad value for \u2018age\u2019"; }
        }
    } ],

    //
    // Three practice items for self-paced reading (one with a comprehension question).
    //

    ["practice", "AcceptabilityJudgment", {s: "Ismerem Mari hugát."}],
    ["practice", "AcceptabilityJudgment", {s: "Péter látja az autót."}],
    ["practice", "AcceptabilityJudgment", {s: "Kereste Petőfinek egy könyvét."}],


    //
    // Two "real" (i.e. non-filler) self-paced reading items with corresponding acceptability judgment items.
    // There are two conditions.
    //

    // The first question will be chosen if the first sentence from the previous two items is chosen;
    // the second question will be chosen if the second sentence from the previous pair of items is chosen.
    ["s1", "AcceptabilityJudgment", {s: "Látunk Marinak egy nővérét."}],
    ["s2", "AcceptabilityJudgment", {s: "Péternek ismerek egy barátját."}],

    //
    // 10 self-paced-reading filler sentences.
    //
    
    ["f1", "AcceptabilityJudgment", {s: "Ismerem a nővérét."}],
    ["f2", "AcceptabilityJudgment", {s: "Péter haza ment."}],

];
