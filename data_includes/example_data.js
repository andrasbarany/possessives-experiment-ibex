//var shuffleSequence = seq(/*"intro",*/ sepWith("sep", seq("practice",
//                rshuffle("target"/*, "filler"*/))));
var shuffleSequence = seq(/*"intro",*/ seq("practice", rshuffle("target"/*, "filler"*/)));
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

    // These, without groups, show up for everyone.

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
    //
    // layout:
    // [["target", 1], ..., sentence from B]
    // [["target", 1], ..., sentence from C]
    //
    // layout: [["target", [2, 1]], ..., sentence from B]
    // layout: [["target", [2, 1]], ..., sentence from C]
    //
    // 01-16: B, C [Blocks 1, 2]
    // 01-08: C/3 [Block 3]

    [["target", 1], "AcceptabilityJudgment", {s: "Mari olvasott a költő minden versét."}],
    [["target", 1], "AcceptabilityJudgment", {s: "Mari nem olvasott a költő versét."}],

    [["target", [2, 1]], "AcceptabilityJudgment", {s: "Mari olvasta a költő minden versét."}],
    [["target", [2, 1]], "AcceptabilityJudgment", {s: "Mari nem olvasta a költő versét."}],

    [["target", [3, 1]], "AcceptabilityJudgment", {s: "Mari olvasott a költőnek minden versét."}],
    [["target", [3, 1]], "AcceptabilityJudgment", {s: "Mari nem olvasott a költőnek versét."}],
    [["target", [3, 1]], "AcceptabilityJudgment", {s: "Mari nem a költőnek olvasott versét."}], // C/3

    [["target", [4, 1]], "AcceptabilityJudgment", {s: "Mari olvasta a költőnek néhány versét."}],
    [["target", [4, 1]], "AcceptabilityJudgment", {s: "Mari nem olvasta a költőnek versét."}],
    [["target", [4, 1]], "AcceptabilityJudgment", {s: "Mari nem a költőnek olvasta versét."}], // C/3

    [["target", [5, 1]], "AcceptabilityJudgment", {s: "Péter ismert a szomszéd minden lányát."}],
    [["target", [5, 1]], "AcceptabilityJudgment", {s: "Péter nem ismert a szomszéd lányát."}],

    [["target", [6, 1]], "AcceptabilityJudgment", {s: "Péter ismerte a szomszéd minden lányát."}],
    [["target", [6, 1]], "AcceptabilityJudgment", {s: "Péter nem ismerte a szomszéd lányát."}],

    [["target", [7, 1]], "AcceptabilityJudgment", {s: "Péter ismert a szomszédnak minden lányát."}],
    [["target", [7, 1]], "AcceptabilityJudgment", {s: "Péter nem ismert a szomszédnak lányát."}],
    [["target", [7, 1]], "AcceptabilityJudgment", {s: "Péter nem a szomszédnak ismert lányát."}], // C/3

    [["target", [8, 1]], "AcceptabilityJudgment", {s: "Péter ismerte a szomszédnak minden lányát."}],
    [["target", [8, 1]], "AcceptabilityJudgment", {s: "Péter nem ismerte a szomszédnak lányát."}],
    [["target", [8, 1]], "AcceptabilityJudgment", {s: "Péter nem a szomszédnak ismerte lányát."}], //C/3

    [["target", [9, 1]], "AcceptabilityJudgment", {s: "Ádám keresett a festő minden tájképét."}],
    [["target", [9, 1]], "AcceptabilityJudgment", {s: "Ádám nem keresett a festő tájképét."}],

    [["target", [10, 1]], "AcceptabilityJudgment", {s: "Ádám kereste a festő minden tájképét."}],
    [["target", [10, 1]], "AcceptabilityJudgment", {s: "Ádám nem kereste a festő tájképét."}],

    [["target", [11, 1]], "AcceptabilityJudgment", {s: "Ádám keresett a festőnek minden tájképét."}],
    [["target", [11, 1]], "AcceptabilityJudgment", {s: "Ádám nem keresett a festőnek tájképét."}],
    [["target", [11, 1]], "AcceptabilityJudgment", {s: "Ádám nem a festőnek keresett tájképét."}], //C/3

    [["target", [12, 1]], "AcceptabilityJudgment", {s: "Ádám kereste a festőnek minden tájképét."}],
    [["target", [12, 1]], "AcceptabilityJudgment", {s: "Ádám nem kereste a festőnek tájképét."}],
    [["target", [12, 1]], "AcceptabilityJudgment", {s: "Ádám nem a festőnek kereste tájképét."}], //C/3

    [["target", [13, 1]], "AcceptabilityJudgment", {s: "Juli hallott a zenész minden dalát."}],
    [["target", [13, 1]], "AcceptabilityJudgment", {s: "Juli nem hallott a zenész dalát."}],

    [["target", [14, 1]], "AcceptabilityJudgment", {s: "Juli hallotta a zenész minden dalát."}],
    [["target", [14, 1]], "AcceptabilityJudgment", {s: "Juli nem hallotta a zenész dalát."}],

    [["target", [15, 1]], "AcceptabilityJudgment", {s: "Juli hallott a zenésznek minden dalát."}],
    [["target", [15, 1]], "AcceptabilityJudgment", {s: "Juli nem hallott a zenésznek dalát."}],
    [["target", [15, 1]], "AcceptabilityJudgment", {s: "Juli nem a zenésznek hallott dalát."}], //C/3

    [["target", [16, 1]], "AcceptabilityJudgment", {s: "Juli hallotta a zenésznek minden dalát."}],
    [["target", [16, 1]], "AcceptabilityJudgment", {s: "Juli nem hallotta a zenésznek dalát."}],
    [["target", [16, 1]], "AcceptabilityJudgment", {s: "Juli nem a zenésznek hallotta dalát."}], //C/3

    // 17-24: B/2, C/2 [Block 1]
    // 09-16: C/2 [Block 2]

    [["target", [17, 1]], "AcceptabilityJudgment", {s: "Mari a költőnek olvasott néhány versét."}],
    [["target", [17, 1]], "AcceptabilityJudgment", {s: "Mari a költőnek nem olvasott versét."}],
    [["target", [17, 1]], "AcceptabilityJudgment", {s: "Mari a költőnek nem olvasott versét."}],

    [["target", [18, 1]], "AcceptabilityJudgment", {s: "Mari a költőnek olvasta néhány versét."}],
    [["target", [18, 1]], "AcceptabilityJudgment", {s: "Mari a költőnek nem olvasta versét."}],
    [["target", [18, 1]], "AcceptabilityJudgment", {s: "Mari a költőnek nem olvasta versét."}],

    [["target", [19, 1]], "AcceptabilityJudgment", {s: "Péter a szomszédnak ismert minden lányát."}],
    [["target", [19, 1]], "AcceptabilityJudgment", {s: "Péter a szomszédnak nem ismert lányát."}],
    [["target", [19, 1]], "AcceptabilityJudgment", {s: "Péter a szomszédnak nem ismert lányát."}],

    [["target", [20, 1]], "AcceptabilityJudgment", {s: "Péter a szomszédnak ismerte minden lányát."}],
    [["target", [20, 1]], "AcceptabilityJudgment", {s: "Péter a szomszédnak nem ismerte lányát."}],
    [["target", [20, 1]], "AcceptabilityJudgment", {s: "Péter a szomszédnak nem ismerte lányát."}],

    [["target", [21, 1]], "AcceptabilityJudgment", {s: "Ádám a festőnek keresett néhány tájképét."}],
    [["target", [21, 1]], "AcceptabilityJudgment", {s: "Ádám a festőnek nem keresett tájképét."}],
    [["target", [21, 1]], "AcceptabilityJudgment", {s: "Ádám a festőnek nem keresett tájképét."}],

    [["target", [22, 1]], "AcceptabilityJudgment", {s: "Ádám a festőnek kereste néhány tájképét."}],
    [["target", [22, 1]], "AcceptabilityJudgment", {s: "Ádám a festőnek nem kereste tájképét."}],
    [["target", [22, 1]], "AcceptabilityJudgment", {s: "Ádám a festőnek nem kereste tájképét."}],

    [["target", [23, 1]], "AcceptabilityJudgment", {s: "Juli a zenésznek hallott minden dalát."}],
    [["target", [23, 1]], "AcceptabilityJudgment", {s: "Juli a zenésznek nem hallott dalát."}],
    [["target", [23, 1]], "AcceptabilityJudgment", {s: "Juli a zenésznek nem hallott dalát."}],

    [["target", [24, 1]], "AcceptabilityJudgment", {s: "Juli a zenésznek hallotta minden dalát."}],
    [["target", [24, 1]], "AcceptabilityJudgment", {s: "Juli a zenésznek nem hallotta dalát."}],
    [["target", [24, 1]], "AcceptabilityJudgment", {s: "Juli a zenésznek nem hallotta dalát."}],

    // 24-40: A [Blocks 1, 2]
    // 17-24: A, dative possessors [Block 3]

    [["target", [25, 1]], "AcceptabilityJudgment", {s: "Mari olvasott a költő versét."}],
    [["target", [25, 1]], "AcceptabilityJudgment", {s: "Mari olvasott a költő versét."}],

    [["target", [26, 1]], "AcceptabilityJudgment", {s: "Mari olvasta a költő versét."}],
    [["target", [26, 1]], "AcceptabilityJudgment", {s: "Mari olvasta a költő versét."}],

    [["target", [27, 1]], "AcceptabilityJudgment", {s: "Mari olvasott a költőnek versét."}],
    [["target", [27, 1]], "AcceptabilityJudgment", {s: "Mari olvasott a költőnek versét."}],
    [["target", [27, 1]], "AcceptabilityJudgment", {s: "Mari olvasott a költőnek versét."}], // C/2

    [["target", [28, 1]], "AcceptabilityJudgment", {s: "Mari olvasta a költőnek versét."}],
    [["target", [28, 1]], "AcceptabilityJudgment", {s: "Mari olvasta a költőnek versét."}],
    [["target", [28, 1]], "AcceptabilityJudgment", {s: "Mari olvasta a költőnek versét."}], // C/2

    [["target", [29, 1]], "AcceptabilityJudgment", {s: "Péter ismert a szomszéd lányát."}],
    [["target", [29, 1]], "AcceptabilityJudgment", {s: "Péter ismert a szomszéd lányát."}],

    [["target", [30, 1]], "AcceptabilityJudgment", {s: "Péter ismerte a szomszéd lányát."}],
    [["target", [30, 1]], "AcceptabilityJudgment", {s: "Péter ismerte a szomszéd lányát."}],

    [["target", [31, 1]], "AcceptabilityJudgment", {s: "Péter ismert a szomszédnak lányát."}],
    [["target", [31, 1]], "AcceptabilityJudgment", {s: "Péter ismert a szomszédnak lányát."}],
    [["target", [31, 1]], "AcceptabilityJudgment", {s: "Péter ismert a szomszédnak lányát."}], // C/2

    [["target", [32, 1]], "AcceptabilityJudgment", {s: "Péter ismerte a szomszédnak lányát."}],
    [["target", [32, 1]], "AcceptabilityJudgment", {s: "Péter ismerte a szomszédnak lányát."}],
    [["target", [32, 1]], "AcceptabilityJudgment", {s: "Péter ismerte a szomszédnak lányát."}], // C/2

    [["target", [33, 1]], "AcceptabilityJudgment", {s: "Ádám keresett a festő tájképét."}],
    [["target", [33, 1]], "AcceptabilityJudgment", {s: "Ádám keresett a festő tájképét."}],

    [["target", [34, 1]], "AcceptabilityJudgment", {s: "Ádám kereste a festő tájképét."}],
    [["target", [34, 1]], "AcceptabilityJudgment", {s: "Ádám kereste a festő tájképét."}],

    [["target", [35, 1]], "AcceptabilityJudgment", {s: "Ádám keresett a festőnek tájképét."}],
    [["target", [35, 1]], "AcceptabilityJudgment", {s: "Ádám keresett a festőnek tájképét."}],
    [["target", [35, 1]], "AcceptabilityJudgment", {s: "Ádám keresett a festőnek tájképét."}], // C/2

    [["target", [36, 1]], "AcceptabilityJudgment", {s: "Ádám kereste a festőnek tájképét."}],
    [["target", [36, 1]], "AcceptabilityJudgment", {s: "Ádám kereste a festőnek tájképét."}],
    [["target", [36, 1]], "AcceptabilityJudgment", {s: "Ádám kereste a festőnek tájképét."}], // C/2

    [["target", [37, 1]], "AcceptabilityJudgment", {s: "Juli hallott a zenész dalát."}],
    [["target", [37, 1]], "AcceptabilityJudgment", {s: "Juli hallott a zenész dalát."}],

    [["target", [38, 1]], "AcceptabilityJudgment", {s: "Juli hallotta a zenész dalát."}],
    [["target", [38, 1]], "AcceptabilityJudgment", {s: "Juli hallotta a zenész dalát."}],

    [["target", [39, 1]], "AcceptabilityJudgment", {s: "Juli hallott a zenésznek dalát."}],
    [["target", [39, 1]], "AcceptabilityJudgment", {s: "Juli hallott a zenésznek dalát."}],
    [["target", [39, 1]], "AcceptabilityJudgment", {s: "Juli hallott a zenésznek dalát."}], // C/2

    [["target", [40, 1]], "AcceptabilityJudgment", {s: "Juli hallotta a zenésznek dalát."}],
    [["target", [40, 1]], "AcceptabilityJudgment", {s: "Juli hallotta a zenésznek dalát."}],
    [["target", [40, 1]], "AcceptabilityJudgment", {s: "Juli hallotta a zenésznek dalát."}], // C/2

    // A2 shows up in all blocks. These do not have to be grouped.
    // 41-48: A/2 [Blocks 1, 2]
    // 25-32: A/2 [Block 3]

    ["target", "AcceptabilityJudgment", {s: "Mari a költőnek olvasott versét."}],
    ["target", "AcceptabilityJudgment", {s: "Mari a költőnek olvasta versét."}],
    ["target", "AcceptabilityJudgment", {s: "Péter  a szomszédnak ismert lányát."}],
    ["target", "AcceptabilityJudgment", {s: "Péter  a szomszédnak ismerte lányát."}],
    ["target", "AcceptabilityJudgment", {s: "Ádám a festőnek keresett tájképét."}],
    ["target", "AcceptabilityJudgment", {s: "Ádám a festőnek kereste tájképét."}],
    ["target", "AcceptabilityJudgment", {s: "Juli a zenésznek hallott dalát."}],
    ["target", "AcceptabilityJudgment", {s: "Juli a zenésznek hallotta dalát."}],

    // 41 filler sentences (?!)

    ["filler", "AcceptabilityJudgment", {s: "Egy könyvet adnak a gyerekek Marinak."}],
    ["filler", "AcceptabilityJudgment", {s: "Marinak adnak egy könyvet a gyerekek."}],
    ["filler", "AcceptabilityJudgment", {s: "Két gyerek ad egy könyvet Marinak."}],
    ["filler", "AcceptabilityJudgment", {s: "Megállnak a rendőrök a ház melett."}],
    ["filler", "AcceptabilityJudgment", {s: "A rendőrök a ház mellett álltak meg."}],

    ["filler", "AcceptabilityJudgment", {s: "Egy könyvet adnak a gyerekek Marinak."}],
    ["filler", "AcceptabilityJudgment", {s: "Marinak adnak egy könyvet a gyerekek."}],
    ["filler", "AcceptabilityJudgment", {s: "Két gyerek ad egy könyvet Marinak."}],
    ["filler", "AcceptabilityJudgment", {s: "Megállnak a rendőrök a ház melett."}],
    ["filler", "AcceptabilityJudgment", {s: "A rendőrök a ház mellett álltak meg."}],
    ["filler", "AcceptabilityJudgment", {s: "Elfutnak a kutyák Maritól."}],

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
    ["filler", "AcceptabilityJudgment", {s: "János megivott egy korsóval a vacsorán."}],
    ["filler", "AcceptabilityJudgment", {s: "Tegnap ment haza István az iskolából."}],

    ["filler", "AcceptabilityJudgment", {s: "Tegnap ment István haza az iskolából."}],
    ["filler", "AcceptabilityJudgment", {s: "Tegnap ment István az iskolából haza."}],
    ["filler", "AcceptabilityJudgment", {s: "Imre és Juli látta sajátmagát a tévében."}],
    ["filler", "AcceptabilityJudgment", {s: "Imre és Juli látta sajátmagukat a tévében."}],
    ["filler", "AcceptabilityJudgment", {s: "Imre és Juli látták sajátmagukat a tévében."}],

];
