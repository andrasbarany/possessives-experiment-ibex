// This defines the sequence of elements. We start of with the introduction
// form, and then we have a sequence that has three practice sentences and then
// randomly selects elements from among the targets (...startsWith("t")...) and
// fillers.

var shuffleSequence = seq("intro", seq("practice", rshuffle(startsWith("t"), startsWith("f"))));

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

    // The following 16 sentences are category "A": obj vs sbj agreement with
    // dative vs nominative possessors, a kind of baseline. These do not have
    // have number (e.g. [2, 1]) because they do not belong to a subgroup of
    // participants: everyone will see these.
    //
    // 1-16

    [["t-A1-mar-nom-sbj"], "AcceptabilityJudgment", {s: "Mari olvasott a költő versét."}],
    [["t-A1-mar-nom-obj"], "AcceptabilityJudgment", {s: "Mari olvasta a költő versét."}],
    [["t-A1-mar-dat-sbj"], "AcceptabilityJudgment", {s: "Mari olvasott a költőnek versét."}],
    [["t-A1-mar-dat-obj"], "AcceptabilityJudgment", {s: "Mari olvasta a költőnek versét."}],

    [["t-A1-pet-nom-sbj"], "AcceptabilityJudgment", {s: "Péter ismert a szomszéd lányát."}],
    [["t-A1-pet-nom-obj"], "AcceptabilityJudgment", {s: "Péter ismerte a szomszéd lányát."}],
    [["t-A1-pet-dat-sbj"], "AcceptabilityJudgment", {s: "Péter ismert a szomszédnak lányát."}],
    [["t-A1-pet-dat-obj"], "AcceptabilityJudgment", {s: "Péter ismerte a szomszédnak lányát."}],

    [["t-A1-ada-nom-sbj"], "AcceptabilityJudgment", {s: "Ádám keresett a festő tájképét."}],
    [["t-A1-ada-nom-obj"], "AcceptabilityJudgment", {s: "Ádám kereste a festő tájképét."}],
    [["t-A1-ada-dat-sbj"], "AcceptabilityJudgment", {s: "Ádám keresett a festőnek tájképét."}],
    [["t-A1-ada-dat-obj"], "AcceptabilityJudgment", {s: "Ádám kereste a festőnek tájképét."}],

    [["t-A1-jul-nom-sbj"], "AcceptabilityJudgment", {s: "Juli hallott a zenész dalát."}],
    [["t-A1-jul-nom-obj"], "AcceptabilityJudgment", {s: "Juli hallotta a zenész dalát."}],
    [["t-A1-jul-dat-sbj"], "AcceptabilityJudgment", {s: "Juli hallott a zenésznek dalát."}],
    [["t-A1-jul-dat-obj"], "AcceptabilityJudgment", {s: "Juli hallotta a zenésznek dalát."}],

    // Here, the two groups of participants diverge in the sentences that they
    // get. Both start out with the 16 sentences from "A" above, but the
    // following are different. Group 1 gets B and B/2: null possessors and
    // null possessors with modifiers, each with subject and object agreement.
    // These are shown in the first line of each 2-line paragraph.
    //
    // In the second line are sentences from C and D: null possessors with
    // negation (C) and null plural possessors (D).

    [["t-B1-mar-nil-sbj", [17, 1]], "AcceptabilityJudgment", {s: "Mari olvasott versét."}],
    [["t-C1-mar-nil-sbj", [17, 1]], "AcceptabilityJudgment", {s: "Mari nem olvasott versét."}],

    [["t-B1-mar-nil-obj", [18, 1]], "AcceptabilityJudgment", {s: "Mari olvasta versét."}],
    [["t-C1-mar-nil-obj", [18, 1]], "AcceptabilityJudgment", {s: "Mari nem olvasta versét."}],

    [["t-B1-pet-nil-sbj", [19, 1]], "AcceptabilityJudgment", {s: "Péter ismert lányát."}],
    [["t-C1-pet-nil-sbj", [19, 1]], "AcceptabilityJudgment", {s: "Péter nem ismert lányát."}],

    [["t-B1-pet-nil-obj", [20, 1]], "AcceptabilityJudgment", {s: "Péter ismerte lányát."}],
    [["t-C1-pet-nil-obj", [20, 1]], "AcceptabilityJudgment", {s: "Péter nem ismerte lányát."}],

    [["t-B1-ada-nil-sbj", [21, 1]], "AcceptabilityJudgment", {s: "Ádám keresett tájképét."}],
    [["t-C1-ada-nil-sbj", [21, 1]], "AcceptabilityJudgment", {s: "Ádám nem keresett tájképét."}],

    [["t-B1-ada-nil-obj", [22, 1]], "AcceptabilityJudgment", {s: "Ádám kereste tájképét."}],
    [["t-C1-ada-nil-obj", [22, 1]], "AcceptabilityJudgment", {s: "Ádám nem keresete tájképét."}],

    [["t-B1-jul-nil-sbj", [23, 1]], "AcceptabilityJudgment", {s: "Juli hallott dalát."}],
    [["t-C1-jul-nil-sbj", [23, 1]], "AcceptabilityJudgment", {s: "Juli nem hallott dalát."}],

    [["t-B1-jul-nil-obj", [24, 1]], "AcceptabilityJudgment", {s: "Juli hallotta dalát."}],
    [["t-C1-jul-nil-obj", [24, 1]], "AcceptabilityJudgment", {s: "Juli nem hallotta dalát."}],

    // The two groups continue with the final blocks: B/2, null possessors and néhány, and
    // D, null plural possessors.

    [["t-B2-mar-nil-sbj", [17, 1]], "AcceptabilityJudgment", {s: "Mari olvasott néhány versét."}],
    [["t-D1-mar-nil-sbj", [17, 1]], "AcceptabilityJudgment", {s: "Mari olvasott versüket."}],

    [["t-B2-mar-nil-obj", [18, 1]], "AcceptabilityJudgment", {s: "Mari olvasta néhány versét."}],
    [["t-D1-mar-nil-obj", [18, 1]], "AcceptabilityJudgment", {s: "Mari olvasta versüket."}],

    [["t-B2-pet-nil-sbj", [19, 1]], "AcceptabilityJudgment", {s: "Péter ismert néhány lányát."}],
    [["t-D1-pet-nil-sbj", [19, 1]], "AcceptabilityJudgment", {s: "Péter ismert lányukat."}],

    [["t-B2-pet-nil-obj", [20, 1]], "AcceptabilityJudgment", {s: "Péter ismerte néhány lányát."}],
    [["t-D1-pet-nil-obj", [20, 1]], "AcceptabilityJudgment", {s: "Péter ismerte lányukat."}],

    [["t-B2-ada-nil-sbj", [21, 1]], "AcceptabilityJudgment", {s: "Ádám keresett néhány tájképét."}],
    [["t-D1-ada-nil-sbj", [21, 1]], "AcceptabilityJudgment", {s: "Ádám keresett tájképüket."}],

    [["t-B2-ada-nil-obj", [22, 1]], "AcceptabilityJudgment", {s: "Ádám kereste néhány tájképét."}],
    [["t-D1-ada-nil-obj", [22, 1]], "AcceptabilityJudgment", {s: "Ádám keresete tájképüket."}],

    [["t-B2-jul-nil-sbj", [23, 1]], "AcceptabilityJudgment", {s: "Juli hallott néhány dalát."}],
    [["t-D1-jul-nil-sbj", [23, 1]], "AcceptabilityJudgment", {s: "Juli hallott dalukat."}],

    [["t-B2-jul-nil-obj", [24, 1]], "AcceptabilityJudgment", {s: "Juli hallotta néhány dalát."}],
    [["t-D1-jul-nil-obj", [24, 1]], "AcceptabilityJudgment", {s: "Juli hallotta dalukat."}],


    // 30 filler sentences (?!)

    ["f01", "AcceptabilityJudgment", {s: "Egy könyvet adnak a gyerekek Marinak."}],
    ["f02", "AcceptabilityJudgment", {s: "Marinak adnak egy könyvet a gyerekek."}],
    ["f03", "AcceptabilityJudgment", {s: "Két gyerek ad egy könyvet Marinak."}],
    ["f04", "AcceptabilityJudgment", {s: "Megállnak a rendőrök a ház melett."}],
    ["f05", "AcceptabilityJudgment", {s: "A rendőrök a ház mellett álltak meg."}],

    ["f06", "AcceptabilityJudgment", {s: "Egy könyvet adnak a gyerekek Marinak."}],
    ["f07", "AcceptabilityJudgment", {s: "Marinak adnak egy könyvet a gyerekek."}],
    ["f08", "AcceptabilityJudgment", {s: "Két gyerek ad egy könyvet Marinak."}],
    ["f09", "AcceptabilityJudgment", {s: "Megállnak a rendőrök a ház melett."}],
    ["f10", "AcceptabilityJudgment", {s: "A rendőrök a ház mellett álltak meg."}],

    ["f11", "AcceptabilityJudgment", {s: "Elfutnak a kutyák Maritól."}],
    ["f12", "AcceptabilityJudgment", {s: "Egy könyvet adnak a gyerekek Marinak."}],
    ["f13", "AcceptabilityJudgment", {s: "Marinak adnak egy könyvet a gyerekek."}],
    ["f14", "AcceptabilityJudgment", {s: "Két gyerek ad egy könyvet Marinak."}],
    ["f15", "AcceptabilityJudgment", {s: "Megállnak a rendőrök a ház melett."}],

    ["f16", "AcceptabilityJudgment", {s: "A rendőrök a ház mellett álltak meg."}],
    ["f17", "AcceptabilityJudgment", {s: "Elfutnak a kutyák Maritól."}],
    ["f18", "AcceptabilityJudgment", {s: "A kutya Maritól futott el."}],
    ["f19", "AcceptabilityJudgment", {s: "Ádám megeszi a vacsoráját."}],
/*  ["f31", "AcceptabilityJudgment", {s: "Ádám megeszi a vacsorát."}],

    ["f32", "AcceptabilityJudgment", {s: "A koncertet az együttes befejezte."}],
    ["f33", "AcceptabilityJudgment", {s: "Két gyerek adnak egy könyvet Marinak."}],
    ["f34", "AcceptabilityJudgment", {s: "Marinak adnak két gyerek egy könyvet."}],
    ["f35", "AcceptabilityJudgment", {s: "A rendőr megállank ház."}],
    ["f36", "AcceptabilityJudgment", {s: "A kutya elfutnak Marinak."}],

    ["f37", "AcceptabilityJudgment", {s: "Elfutnak a kutya Maritól."}],
    ["f38", "AcceptabilityJudgment", {s: "Megállnak a rendőr a ház."}],
    ["f39", "AcceptabilityJudgment", {s: "Megállnak a ház melett a rendőr."}],
    ["f40", "AcceptabilityJudgment", {s: "Az együttes befejez a koncertet."}],
    ["f41", "AcceptabilityJudgment", {s: "A koncertet az együttes befejez."}], */

    ["f20", "AcceptabilityJudgment", {s: "Ádám a megeszi vacsora."}],
    ["f21", "AcceptabilityJudgment", {s: "János ivott meg egy korsóval a vacsorán."}],
    ["f22", "AcceptabilityJudgment", {s: "János ivott egy korsóval meg a vacsorán."}],
    ["f23", "AcceptabilityJudgment", {s: "János ivott egy korsóval a vacsorán meg."}],
    ["f24", "AcceptabilityJudgment", {s: "János megivott egy korsóval a vacsorán."}],

    ["f25", "AcceptabilityJudgment", {s: "Tegnap ment haza István az iskolából."}],
    ["f26", "AcceptabilityJudgment", {s: "Tegnap ment István haza az iskolából."}],
    ["f27", "AcceptabilityJudgment", {s: "Tegnap ment István az iskolából haza."}],
    ["f28", "AcceptabilityJudgment", {s: "Imre és Juli látta sajátmagát a tévében."}],
    ["f29", "AcceptabilityJudgment", {s: "Imre és Juli látta sajátmagukat a tévében."}],

    ["f30", "AcceptabilityJudgment", {s: "Imre és Juli látták sajátmagukat a tévében."}]

];
