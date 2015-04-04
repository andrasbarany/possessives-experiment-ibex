// This defines the sequence of elements. We start of with the introduction
// form, and then we have a sequence that has three practice sentences and then
// randomly selects elements from among the targets (...startsWith("t")...) and
// fillers.

var shuffleSequence = seq("intro", seq("practice", rshuffle(startsWith("t")/*, "filler"*/)));

var practiceItemTypes = ["practice"];

var defaults = [
/*    "Separator", {
        transfer: 0,
        normalMessage: "Please wait for the next sentence.",
        errorMessage: "Wrong. Please wait for the next sentence."
    }, */
    "Separator", {
        transfer: 500,
        normalMessage: "",
        errorMessage: ""
    },
    "AcceptabilityJudgment", {
        as: ["1", "2", "3", "4", "5", "6", "7"],
        presentAsScale: true,
        instructions: "Kattintson egy számra.",
        leftComment: "(Természetellenes)", rightComment: "(Természetes)"
    },
    "Message", {
        hideProgressBar: true
    },
    "Form", {
        hideProgressBar: true,
        continueOnReturn: true,
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
    ["practice", "AcceptabilityJudgment", {s: "Laci látja az autót."}],
    ["practice", "AcceptabilityJudgment", {s: "Péter mentek haza."}],

    // These, without groups, show up for everyone.

    // ["target", "AcceptabilityJudgment", {s: "Látunk Marinak egy nővérét."}],

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

    [["t-B1-mar-nom-sbj", 1], "AcceptabilityJudgment", {s: "Mari olvasott a költő minden versét."}],
    [["t-C1-mar-nom-sbj", 1], "AcceptabilityJudgment", {s: "Mari nem olvasott a költő versét."}],
    [["sep", 1], "Separator", {transfer: 0}],

    [["t-B1-mar-nom-obj", [2, 1]], "AcceptabilityJudgment", {s: "Mari olvasta a költő minden versét."}],
    [["t-C1-mar-nom-obj", [2, 1]], "AcceptabilityJudgment", {s: "Mari nem olvasta a költő versét."}],
    [["sep", [2, 1]], "Separator", {transfer: 0}],

    [["t-B1-mar-dat-sbj", [3, 1]], "AcceptabilityJudgment", {s: "Mari olvasott a költőnek minden versét."}],
    [["t-C1-mar-dat-sbj", [3, 1]], "AcceptabilityJudgment", {s: "Mari nem olvasott a költőnek versét."}],
    [["t-C3-mar-ext-sbj", [3, 1]], "AcceptabilityJudgment", {s: "Mari nem a költőnek olvasott versét."}], // C/3

    [["t-B1-mar-dat-obj", [4, 1]], "AcceptabilityJudgment", {s: "Mari olvasta a költőnek néhány versét."}],
    [["t-C1-mar-dat-obj", [4, 1]], "AcceptabilityJudgment", {s: "Mari nem olvasta a költőnek versét."}],
    [["t-C3-mar-ext-obj", [4, 1]], "AcceptabilityJudgment", {s: "Mari nem a költőnek olvasta versét."}], // C/3

    [["t-B1-pet-nom-sbj", [5, 1]], "AcceptabilityJudgment", {s: "Péter ismert a szomszéd minden lányát."}],
    [["t-C1-pet-nom-sbj", [5, 1]], "AcceptabilityJudgment", {s: "Péter nem ismert a szomszéd lányát."}],
    [["sep", [5, 1]], "Separator", {transfer: 0}],

    [["t-B1-pet-nom-obj", [6, 1]], "AcceptabilityJudgment", {s: "Péter ismerte a szomszéd minden lányát."}],
    [["t-C1-pet-nom-obj", [6, 1]], "AcceptabilityJudgment", {s: "Péter nem ismerte a szomszéd lányát."}],
    [["sep", [6, 1]], "Separator", {transfer: 0}],

    [["t-B1-pet-dat-sbj", [7, 1]], "AcceptabilityJudgment", {s: "Péter ismert a szomszédnak minden lányát."}],
    [["t-C1-pet-dat-sbj", [7, 1]], "AcceptabilityJudgment", {s: "Péter nem ismert a szomszédnak lányát."}],
    [["t-C3-pet-ext-sbj", [7, 1]], "AcceptabilityJudgment", {s: "Péter nem a szomszédnak ismert lányát."}], // C/3

    [["t-B1-pet-dat-obj", [8, 1]], "AcceptabilityJudgment", {s: "Péter ismerte a szomszédnak minden lányát."}],
    [["t-C1-pet-dat-obj", [8, 1]], "AcceptabilityJudgment", {s: "Péter nem ismerte a szomszédnak lányát."}],
    [["t-C3-pet-ext-obj", [8, 1]], "AcceptabilityJudgment", {s: "Péter nem a szomszédnak ismerte lányát."}], //C/3

    [["t-B1-ada-nom-sbj", [9, 1]], "AcceptabilityJudgment", {s: "Ádám keresett a festő minden tájképét."}],
    [["t-C1-ada-nom-sbj", [9, 1]], "AcceptabilityJudgment", {s: "Ádám nem keresett a festő tájképét."}],
    [["sep", [9, 1]], "Separator", {transfer: 0}],

    [["t-B1-ada-nom-obj", [10, 1]], "AcceptabilityJudgment", {s: "Ádám kereste a festő minden tájképét."}],
    [["t-C1-ada-nom-obj", [10, 1]], "AcceptabilityJudgment", {s: "Ádám nem kereste a festő tájképét."}],
    [["sep", [10, 1]], "Separator", {transfer: 0}],

    [["t-B1-ada-dat-sbj", [11, 1]], "AcceptabilityJudgment", {s: "Ádám keresett a festőnek minden tájképét."}],
    [["t-C1-ada-dat-sbj", [11, 1]], "AcceptabilityJudgment", {s: "Ádám nem keresett a festőnek tájképét."}],
    [["t-C3-ada-ext-sbj", [11, 1]], "AcceptabilityJudgment", {s: "Ádám nem a festőnek keresett tájképét."}], //C/3

    [["t-B1-ada-dat-obj", [12, 1]], "AcceptabilityJudgment", {s: "Ádám kereste a festőnek minden tájképét."}],
    [["t-C1-ada-dat-obj", [12, 1]], "AcceptabilityJudgment", {s: "Ádám nem kereste a festőnek tájképét."}],
    [["t-C3-ada-ext-obj", [12, 1]], "AcceptabilityJudgment", {s: "Ádám nem a festőnek kereste tájképét."}], //C/3

    [["t-B1-jul-nom-sbj", [13, 1]], "AcceptabilityJudgment", {s: "Juli hallott a zenész minden dalát."}],
    [["t-C1-jul-nom-sbj", [13, 1]], "AcceptabilityJudgment", {s: "Juli nem hallott a zenész dalát."}],
    [["sep", [13, 1]], "Separator", {transfer: 0}],

    [["t-B1-jul-nom-obj", [14, 1]], "AcceptabilityJudgment", {s: "Juli hallotta a zenész minden dalát."}],
    [["t-C1-jul-nom-obj", [14, 1]], "AcceptabilityJudgment", {s: "Juli nem hallotta a zenész dalát."}],
    [["sep", [14, 1]], "Separator", {transfer: 0}],

    [["t-B1-jul-dat-sbj", [15, 1]], "AcceptabilityJudgment", {s: "Juli hallott a zenésznek minden dalát."}],
    [["t-C1-jul-dat-sbj", [15, 1]], "AcceptabilityJudgment", {s: "Juli nem hallott a zenésznek dalát."}],
    [["t-C3-jul-ext-sbj", [15, 1]], "AcceptabilityJudgment", {s: "Juli nem a zenésznek hallott dalát."}], //C/3

    [["t-B1-jul-dat-obj", [16, 1]], "AcceptabilityJudgment", {s: "Juli hallotta a zenésznek minden dalát."}],
    [["t-C1-jul-dat-obj", [16, 1]], "AcceptabilityJudgment", {s: "Juli nem hallotta a zenésznek dalát."}],
    [["t-C3-jul-ext-obj", [16, 1]], "AcceptabilityJudgment", {s: "Juli nem a zenésznek hallotta dalát."}], //C/3

    // 17-24: B/2, C/2 [Block 1]
    // 09-16: C/2 [Block 2]

    [["t-B2-mar-ext-sbj", [17, 1]], "AcceptabilityJudgment", {s: "Mari a költőnek olvasott néhány versét."}],
    [["t-C2-mar-ext-sbj", [17, 1]], "AcceptabilityJudgment", {s: "Mari a költőnek nem olvasott versét."}],
    [["t-C2-mar-ext-sbj", [17, 1]], "AcceptabilityJudgment", {s: "Mari a költőnek nem olvasott versét."}],

    [["t-B2-mar-ext-obj", [18, 1]], "AcceptabilityJudgment", {s: "Mari a költőnek olvasta néhány versét."}],
    [["t-C2-mar-ext-obj", [18, 1]], "AcceptabilityJudgment", {s: "Mari a költőnek nem olvasta versét."}],
    [["t-C2-mar-ext-obj", [18, 1]], "AcceptabilityJudgment", {s: "Mari a költőnek nem olvasta versét."}],

    [["t-B2-pet-ext-sbj", [19, 1]], "AcceptabilityJudgment", {s: "Péter a szomszédnak ismert minden lányát."}],
    [["t-C2-pet-ext-sbj", [19, 1]], "AcceptabilityJudgment", {s: "Péter a szomszédnak nem ismert lányát."}],
    [["t-C2-pet-ext-sbj", [19, 1]], "AcceptabilityJudgment", {s: "Péter a szomszédnak nem ismert lányát."}],

    [["t-B2-pet-ext-obj", [20, 1]], "AcceptabilityJudgment", {s: "Péter a szomszédnak ismerte minden lányát."}],
    [["t-C2-pet-ext-obj", [20, 1]], "AcceptabilityJudgment", {s: "Péter a szomszédnak nem ismerte lányát."}],
    [["t-C2-pet-ext-obj", [20, 1]], "AcceptabilityJudgment", {s: "Péter a szomszédnak nem ismerte lányát."}],

    [["t-B2-ada-ext-sbj", [21, 1]], "AcceptabilityJudgment", {s: "Ádám a festőnek keresett néhány tájképét."}],
    [["t-C2-ada-ext-sbj", [21, 1]], "AcceptabilityJudgment", {s: "Ádám a festőnek nem keresett tájképét."}],
    [["t-C2-ada-ext-sbj", [21, 1]], "AcceptabilityJudgment", {s: "Ádám a festőnek nem keresett tájképét."}],

    [["t-B2-ada-ext-obj", [22, 1]], "AcceptabilityJudgment", {s: "Ádám a festőnek kereste néhány tájképét."}],
    [["t-C2-ada-ext-obj", [22, 1]], "AcceptabilityJudgment", {s: "Ádám a festőnek nem kereste tájképét."}],
    [["t-C2-ada-ext-obj", [22, 1]], "AcceptabilityJudgment", {s: "Ádám a festőnek nem kereste tájképét."}],

    [["t-B2-jul-ext-sbj", [23, 1]], "AcceptabilityJudgment", {s: "Juli a zenésznek hallott minden dalát."}],
    [["t-C2-jul-ext-sbj", [23, 1]], "AcceptabilityJudgment", {s: "Juli a zenésznek nem hallott dalát."}],
    [["t-C2-jul-ext-sbj", [23, 1]], "AcceptabilityJudgment", {s: "Juli a zenésznek nem hallott dalát."}],

    [["t-B2-jul-ext-obj", [24, 1]], "AcceptabilityJudgment", {s: "Juli a zenésznek hallotta minden dalát."}],
    [["t-C2-jul-ext-obj", [24, 1]], "AcceptabilityJudgment", {s: "Juli a zenésznek nem hallotta dalát."}],
    [["t-C2-jul-ext-obj", [24, 1]], "AcceptabilityJudgment", {s: "Juli a zenésznek nem hallotta dalát."}],

    // 24-40: A [Blocks 1, 2]
    // 17-32: A, dative possessors and A/3 [Block 3]

    [["t-A1-mar-nom-sbj", [25, 1]], "AcceptabilityJudgment", {s: "Mari olvasott a költő versét."}],
    [["t-A1-mar-nom-sbj", [25, 1]], "AcceptabilityJudgment", {s: "Mari olvasott a költő versét."}],
    [["t-A3-mar-fin-sbj", [25, 1]], "AcceptabilityJudgment", {s: "Mari olvasott versét a költőnek."}], // A/3

    [["t-A1-mar-nom-obj", [26, 1]], "AcceptabilityJudgment", {s: "Mari olvasta a költő versét."}],
    [["t-A1-mar-nom-obj", [26, 1]], "AcceptabilityJudgment", {s: "Mari olvasta a költő versét."}],
    [["t-A3-mar-fin-obj", [26, 1]], "AcceptabilityJudgment", {s: "Mari olvasta versét a költőnek."}], // A/3

    [["t-A1-mar-dat-sbj", [27, 1]], "AcceptabilityJudgment", {s: "Mari olvasott a költőnek versét."}],
    [["t-A1-mar-dat-sbj", [27, 1]], "AcceptabilityJudgment", {s: "Mari olvasott a költőnek versét."}],
    [["t-A1-mar-dat-sbj", [27, 1]], "AcceptabilityJudgment", {s: "Mari olvasott a költőnek versét."}],

    [["t-A1-mar-dat-obj", [28, 1]], "AcceptabilityJudgment", {s: "Mari olvasta a költőnek versét."}],
    [["t-A1-mar-dat-obj", [28, 1]], "AcceptabilityJudgment", {s: "Mari olvasta a költőnek versét."}],
    [["t-A1-mar-dat-obj", [28, 1]], "AcceptabilityJudgment", {s: "Mari olvasta a költőnek versét."}],

    [["t-A1-pet-nom-sbj", [29, 1]], "AcceptabilityJudgment", {s: "Péter ismert a szomszéd lányát."}],
    [["t-A1-pet-nom-sbj", [29, 1]], "AcceptabilityJudgment", {s: "Péter ismert a szomszéd lányát."}],
    [["t-A3-pet-fin-sbj", [29, 1]], "AcceptabilityJudgment", {s: "Péter ismert lányát a szomszédnak."}], // A/3

    [["t-A1-pet-nom-obj", [30, 1]], "AcceptabilityJudgment", {s: "Péter ismerte a szomszéd lányát."}],
    [["t-A1-pet-nom-obj", [30, 1]], "AcceptabilityJudgment", {s: "Péter ismerte a szomszéd lányát."}],
    [["t-A3-pet-fin-obj", [30, 1]], "AcceptabilityJudgment", {s: "Péter ismerte lányát a szomszédnak."}], // A/3

    [["t-A1-pet-dat-sbj", [31, 1]], "AcceptabilityJudgment", {s: "Péter ismert a szomszédnak lányát."}],
    [["t-A1-pet-dat-sbj", [31, 1]], "AcceptabilityJudgment", {s: "Péter ismert a szomszédnak lányát."}],
    [["t-A1-pet-dat-sbj", [31, 1]], "AcceptabilityJudgment", {s: "Péter ismert a szomszédnak lányát."}],

    [["t-A1-pet-dat-obj", [32, 1]], "AcceptabilityJudgment", {s: "Péter ismerte a szomszédnak lányát."}],
    [["t-A1-pet-dat-obj", [32, 1]], "AcceptabilityJudgment", {s: "Péter ismerte a szomszédnak lányát."}],
    [["t-A1-pet-dat-obj", [32, 1]], "AcceptabilityJudgment", {s: "Péter ismerte a szomszédnak lányát."}],

    [["t-A1-ada-nom-sbj", [33, 1]], "AcceptabilityJudgment", {s: "Ádám keresett a festő tájképét."}],
    [["t-A1-ada-nom-sbj", [33, 1]], "AcceptabilityJudgment", {s: "Ádám keresett a festő tájképét."}],
    [["t-A3-ada-fin-sbj", [33, 1]], "AcceptabilityJudgment", {s: "Ádám keresett tájképét a festőnek."}], // A/3

    [["t-A1-ada-nom-obj", [34, 1]], "AcceptabilityJudgment", {s: "Ádám kereste a festő tájképét."}],
    [["t-A1-ada-nom-obj", [34, 1]], "AcceptabilityJudgment", {s: "Ádám kereste a festő tájképét."}],
    [["t-A3-ada-fin-obj", [34, 1]], "AcceptabilityJudgment", {s: "Ádám kereste tájképét  a festőnek."}], // A/3

    [["t-A1-ada-dat-sbj", [35, 1]], "AcceptabilityJudgment", {s: "Ádám keresett a festőnek tájképét."}],
    [["t-A1-ada-dat-sbj", [35, 1]], "AcceptabilityJudgment", {s: "Ádám keresett a festőnek tájképét."}],
    [["t-A1-ada-dat-sbj", [35, 1]], "AcceptabilityJudgment", {s: "Ádám keresett a festőnek tájképét."}],

    [["t-A1-ada-dat-obj", [36, 1]], "AcceptabilityJudgment", {s: "Ádám kereste a festőnek tájképét."}],
    [["t-A1-ada-dat-obj", [36, 1]], "AcceptabilityJudgment", {s: "Ádám kereste a festőnek tájképét."}],
    [["t-A1-ada-dat-obj", [36, 1]], "AcceptabilityJudgment", {s: "Ádám kereste a festőnek tájképét."}],

    [["t-A1-jul-nom-sbj", [37, 1]], "AcceptabilityJudgment", {s: "Juli hallott a zenész dalát."}],
    [["t-A1-jul-nom-sbj", [37, 1]], "AcceptabilityJudgment", {s: "Juli hallott a zenész dalát."}],
    [["t-A3-jul-fin-sbj", [37, 1]], "AcceptabilityJudgment", {s: "Juli hallott dalát a zenésznek."}], // A/3

    [["t-A1-jul-nom-obj", [38, 1]], "AcceptabilityJudgment", {s: "Juli hallotta a zenész dalát."}],
    [["t-A1-jul-nom-obj", [38, 1]], "AcceptabilityJudgment", {s: "Juli hallotta a zenész dalát."}],
    [["t-A3-jul-fin-obj", [38, 1]], "AcceptabilityJudgment", {s: "Juli hallotta dalát a zenésznek."}], // A/3

    [["t-A1-jul-dat-sbj", [39, 1]], "AcceptabilityJudgment", {s: "Juli hallott a zenésznek dalát."}],
    [["t-A1-jul-dat-sbj", [39, 1]], "AcceptabilityJudgment", {s: "Juli hallott a zenésznek dalát."}],
    [["t-A1-jul-dat-sbj", [39, 1]], "AcceptabilityJudgment", {s: "Juli hallott a zenésznek dalát."}],

    [["t-A1-jul-dat-obj", [40, 1]], "AcceptabilityJudgment", {s: "Juli hallotta a zenésznek dalát."}],
    [["t-A1-jul-dat-obj", [40, 1]], "AcceptabilityJudgment", {s: "Juli hallotta a zenésznek dalát."}],
    [["t-A1-jul-dat-obj", [40, 1]], "AcceptabilityJudgment", {s: "Juli hallotta a zenésznek dalát."}],

    // A2 shows up in all blocks. These do not have to be grouped.
    // 41-48: A/2 [Blocks 1, 2]
    // 32-40: A/2 [Block 3]

    ["t-A2-mar-ext-sbj", "AcceptabilityJudgment", {s: "Mari a költőnek olvasott versét."}],
    ["t-A2-mar-ext-obj", "AcceptabilityJudgment", {s: "Mari a költőnek olvasta versét."}],

    ["t-A2-pet-ext-sbj", "AcceptabilityJudgment", {s: "Péter  a szomszédnak ismert lányát."}],
    ["t-A2-pet-ext-obj", "AcceptabilityJudgment", {s: "Péter  a szomszédnak ismerte lányát."}],

    ["t-A2-ada-ext-sbj", "AcceptabilityJudgment", {s: "Ádám a festőnek keresett tájképét."}],
    ["t-A2-ada-ext-obj", "AcceptabilityJudgment", {s: "Ádám a festőnek kereste tájképét."}],

    ["t-A2-jul-ext-sbj", "AcceptabilityJudgment", {s: "Juli a zenésznek hallott dalát."}],
    ["t-A2-jul-ext-obj", "AcceptabilityJudgment", {s: "Juli a zenésznek hallotta dalát."}],

    // 30 filler sentences (?!)

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

/*    ["filler", "AcceptabilityJudgment", {s: "Ádám a megeszi vacsora."}],
    ["filler", "AcceptabilityJudgment", {s: "János ivott meg egy korsóval a vacsorán."}],
    ["filler", "AcceptabilityJudgment", {s: "János ivott egy korsóval meg a vacsorán."}],
    ["filler", "AcceptabilityJudgment", {s: "János ivott egy korsóval a vacsorán meg."}],
    ["filler", "AcceptabilityJudgment", {s: "János megivott egy korsóval a vacsorán."}],

    ["filler", "AcceptabilityJudgment", {s: "Tegnap ment haza István az iskolából."}],
    ["filler", "AcceptabilityJudgment", {s: "Tegnap ment István haza az iskolából."}],
    ["filler", "AcceptabilityJudgment", {s: "Tegnap ment István az iskolából haza."}],
    ["filler", "AcceptabilityJudgment", {s: "Imre és Juli látta sajátmagát a tévében."}],
    ["filler", "AcceptabilityJudgment", {s: "Imre és Juli látta sajátmagukat a tévében."}],

    ["filler", "AcceptabilityJudgment", {s: "Imre és Juli látták sajátmagukat a tévében."}], */

];
