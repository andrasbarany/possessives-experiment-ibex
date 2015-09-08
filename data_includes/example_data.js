// This defines the sequence of elements. We start of with the introduction
// form, and then we have a sequence that has three practice sentences and then
// randomly selects elements from among the targets (...startsWith("t")...) and
// fillers.

var shuffleSequence = /*seq("intro", */seq("practice",
            rshuffle(startsWith("t-"), startsWith("f-")),
            rshuffle(startsWith("tc-"), startsWith("fc-")));//);

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
    "ForcedQuestion", {
        presentAsScale: false,
        instructions: "Válasszon egy mondatot."
    },
    "Question", {
        instructions: "Válasszon egy mondatot."
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

    ["practice", "AcceptabilityJudgment", {s: "Marinak több testvére van.", q: "Ismerem Mari egy hugát."}],
    ["practice", "AcceptabilityJudgment", {s: "Az utcán sétaltak.",         q: "Laci látja az autót."}],
    ["practice", "AcceptabilityJudgment", {s: "Mi történt?",                q: "Péter mentek haza."}],

    // These, without groups, show up for everyone.

    // ["target", "AcceptabilityJudgment", {s: "Látunk Marinak egy nővérét."}],

    // Két blokkunk van ebben a felmérésben (2015 szeptember)
    // Blokk A: 5 AJ, 10 FC, 20 FC, 10 AJ, plusz fillerek
    // Blokk B: 5 AJ, 10 FC, 20 FC, 10 AJ, plusz fillerek
    //
    // [["...", 1], A]
    // [["...", 1], B]
    //
    // [["...", [2, 1], A]
    // [["...", [2, 1], B]
    //
    // 01-05: Acceptability judgments.

    [["t-A1-pet-nom-def", 1], "AcceptabilityJudgment",  {s: "Péter gyakran járt a szomszédékhoz.", q: "Ismerte a szomszéd nővérét."}],
    [["t-A1-pet-nom-ind", [2, 1]], "AcceptabilityJudgment",  {s: "Péter gyakran járt a szomszédékhoz.", q: "Ismerte a szomszéd egy nővérét."}],
    [["t-A1-pet-dat-nil", [3, 1]], "AcceptabilityJudgment",  {s: "Péter gyakran járt a szomszédékhoz.", q: "Ismerte a szomszédnak nővérét."}],
    [["t-A1-pet-dat-def", [4, 1]], "AcceptabilityJudgment",  {s: "Péter gyakran járt a szomszédékhoz.", q: "Ismerte a szomszédnak a nővérét."}],
    [["t-A1-pet-dat-ind", [5, 1]], "AcceptabilityJudgment",  {s: "Péter gyakran járt a szomszédékhoz.", q: "Ismerte a szomszédnak egy nővérét."}],

    [["t-B1-mar-nom-def", 1], "AcceptabilityJudgment",  {s: "Mari imádja a magyar irodalmat.", q: "Olvasta Petőfi versét."}],
    [["t-B1-mar-nom-ind", [2, 1]], "AcceptabilityJudgment",  {s: "Mari imádja a magyar irodalmat.", q: "Olvasta Petőfi egy versét."}],
    [["t-B1-mar-dat-nil", [3, 1]], "AcceptabilityJudgment",  {s: "Mari imádja a magyar irodalmat.", q: "Olvasta Petőfinek versét."}],
    [["t-B1-mar-dat-def", [4, 1]], "AcceptabilityJudgment",  {s: "Mari imádja a magyar irodalmat.", q: "Olvasta Petőfinek a versét."}],
    [["t-B1-mar-dat-ind", [5, 1]], "AcceptabilityJudgment",  {s: "Mari imádja a magyar irodalmat.", q: "Olvasta Petőfinek egy versét."}],

    // 06-15: Forced choice, kontextus nélkül.

    [["tc-A2-pet-fc-0", [6, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd nővérét."        , "Ismerte a szomszédnak nővérét."            ]}] ,
    [["tc-A2-pet-fc-1", [7, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd nővérét."        , "Ismerte a szomszédnak a nővérét."          ]}] ,
    [["tc-A2-pet-fc-2", [8, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd nővérét."        , "Ismerte a szomszédnak egy nővérét."        ]}] ,
    [["tc-A2-pet-fc-3", [9, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd nővérét."        , "Ismerte a szomszéd egy nővérét."           ]}] ,
    [["tc-A2-pet-fc-4", [10, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd egy nővérét."    , "Ismerte a szomszédnak nővérét."        ]}]     ,
    [["tc-A2-pet-fc-5", [11, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd egy nővérét."    , "Ismerte a szomszédnak egy nővérét."    ]}]     ,
    [["tc-A2-pet-fc-6", [12, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd egy nővérét."    , "Ismerte a szomszédnak a nővérét."      ]}]     ,
    [["tc-A2-pet-fc-7", [13, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszédnak a nővérét."   , "Ismerte a szomszédnak nővérét."       ]}]      ,
    [["tc-A2-pet-fc-8", [14, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszédnak a nővérét."   , "Ismerte a szomszédnak egy nővérét."   ]}]      ,
    [["tc-A2-pet-fc-9", [15, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszédnak egy nővérét." , "Ismerte a szomszédnak nővérét."     ]}]        ,

    [["tc-B2-mar-fc-0", [6, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi versét."      , "Olvasta Petőfi egy versét."                     ]}] ,
    [["tc-B2-mar-fc-1", [7, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi versét."      , "Olvasta Petőfinek versét."                      ]}] ,
    [["tc-B2-mar-fc-2", [8, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi versét."      , "Olvasta Petőfinek a versét."                    ]}] ,
    [["tc-B2-mar-fc-3", [9, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi versét."      , "Olvasta Petőfinek egy versét."                  ]}] ,
    [["tc-B2-mar-fc-4", [10, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi egy versét."  , "Olvasta Petőfinek versét."                      ]}] ,
    [["tc-B2-mar-fc-5", [11, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi egy versét."  , "Olvasta Petőfinek a versét."                    ]}] ,
    [["tc-B2-mar-fc-6", [12, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi egy versét."  , "Olvasta Petőfinek egy versét."                  ]}] ,
    [["tc-B2-mar-fc-7", [13, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfinek versét."   , "Olvasta Petőfinek a versét."                    ]}] ,
    [["tc-B2-mar-fc-8", [14, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfinek versét."   , "Olvasta Petőfinek egy versét."                  ]}] ,
    [["tc-B2-mar-fc-9", [15, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfinek a versét." , "Olvasta Petőfinek egy versét."                  ]}] ,

    // 16-35: Forced choice kontextussal. Egy határozott, egy határozatlan.
    //

    [["tc-A3-pet-fc-def-0", [16, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de egy tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő egy tájképét."     , "Péter látta a költő tájképet."            ]}]   ,
    [["tc-A3-pet-fc-def-1", [17, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de egy tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő egy tájképét."     , "Péter látta a költőnek tájképet."         ]}]   ,
    [["tc-A3-pet-fc-def-2", [18, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de egy tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő egy tájképét."     , "Péter látta a költőnek egy tájképet."     ]}]   ,
    [["tc-A3-pet-fc-def-3", [19, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de egy tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő egy tájképét."     , "Péter látta a költőnek a tájképet."       ]}]   ,
    [["tc-A3-pet-fc-def-4", [20, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de egy tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő tájképet."         , "Péter látta a költőnek tájképet."       ]}]     ,
    [["tc-A3-pet-fc-def-5", [21, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de egy tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő tájképet."         , "Péter látta a költőnek egy tájképet."       ]}] ,
    [["tc-A3-pet-fc-def-6", [22, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de egy tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő tájképet."         , "Péter látta a költőnek a tájképet."       ]}]   ,
    [["tc-A3-pet-fc-def-7", [23, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de egy tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költőnek tájképet."      , "Péter látta a költőnek egy tájképet."       ]}] ,
    [["tc-A3-pet-fc-def-8", [24, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de egy tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költőnek tájképet."      , "Péter látta a költőnek a tájképet."       ]}]   ,
    [["tc-A3-pet-fc-def-9", [25, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de egy tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költőnek egy tájképet."  , "Péter látta a költőnek a tájképet."       ]}]   ,

    [["tc-A3-pet-fc-ind-0", [26, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de több tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő egy tájképét."     , "Péter látta a költő tájképet."            ]}]   ,
    [["tc-A3-pet-fc-ind-1", [27, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de több tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő egy tájképét."     , "Péter látta a költőnek tájképet."         ]}]   ,
    [["tc-A3-pet-fc-ind-2", [28, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de több tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő egy tájképét."     , "Péter látta a költőnek egy tájképet."     ]}]   ,
    [["tc-A3-pet-fc-ind-3", [29, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de több tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő egy tájképét."     , "Péter látta a költőnek a tájképet."       ]}]   ,
    [["tc-A3-pet-fc-ind-4", [30, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de több tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő tájképet."         , "Péter látta a költőnek tájképet."       ]}]     ,
    [["tc-A3-pet-fc-ind-5", [31, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de több tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő tájképet."         , "Péter látta a költőnek egy tájképet."       ]}] ,
    [["tc-A3-pet-fc-ind-6", [32, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de több tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő tájképet."         , "Péter látta a költőnek a tájképet."       ]}]   ,
    [["tc-A3-pet-fc-ind-7", [33, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de több tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költőnek tájképet."      , "Péter látta a költőnek egy tájképet."       ]}] ,
    [["tc-A3-pet-fc-ind-8", [34, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de több tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költőnek tájképet."      , "Péter látta a költőnek a tájképet."       ]}]   ,
    [["tc-A3-pet-fc-ind-9", [35, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de több tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költőnek egy tájképet."  , "Péter látta a költőnek a tájképet."       ]}]   ,

    [["tc-B3-mar-fc-def-0", [16, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő egy versét."    , "Mari olvasta a festő versét."            ]}]   ,
    [["tc-B3-mar-fc-def-1", [17, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő egy versét."    , "Mari olvasta a festőnek versét."         ]}]   ,
    [["tc-B3-mar-fc-def-2", [18, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő egy versét."    , "Mari olvasta a festőnek egy versét."     ]}]   ,
    [["tc-B3-mar-fc-def-3", [19, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő egy versét."    , "Mari olvasta a festőnek a versét."       ]}]   ,
    [["tc-B3-mar-fc-def-4", [20, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő versét."        , "Mari olvasta a festőnek versét."       ]}]     ,
    [["tc-B3-mar-fc-def-5", [21, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő versét."        , "Mari olvasta a festőnek egy versét."       ]}] ,
    [["tc-B3-mar-fc-def-6", [22, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő versét."        , "Mari olvasta a festőnek a versét."       ]}]   ,
    [["tc-B3-mar-fc-def-7", [23, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festőnek versét."     , "Mari olvasta a festőnek egy versét."       ]}] ,
    [["tc-B3-mar-fc-def-8", [24, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festőnek versét."     , "Mari olvasta a festőnek a versét."       ]}]   ,
    [["tc-B3-mar-fc-def-9", [25, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festőnek egy versét." , "Mari olvasta a festőnek a versét."       ]}]   ,

    [["tc-B3-mar-fc-ind-0", [26, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de több verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő egy versét."    , "Mari olvasta a festő versét."            ]}]   ,
    [["tc-B3-mar-fc-ind-1", [27, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de több verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő egy versét."    , "Mari olvasta a festőnek versét."         ]}]   ,
    [["tc-B3-mar-fc-ind-2", [28, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de több verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő egy versét."    , "Mari olvasta a festőnek egy versét."     ]}]   ,
    [["tc-B3-mar-fc-ind-3", [29, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de több verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő egy versét."    , "Mari olvasta a festőnek a versét."       ]}]   ,
    [["tc-B3-mar-fc-ind-4", [30, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de több verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő versét."        , "Mari olvasta a festőnek versét."       ]}]     ,
    [["tc-B3-mar-fc-ind-5", [31, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de több verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő versét."        , "Mari olvasta a festőnek egy versét."       ]}] ,
    [["tc-B3-mar-fc-ind-6", [32, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de több verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő versét."        , "Mari olvasta a festőnek a versét."       ]}]   ,
    [["tc-B3-mar-fc-ind-7", [33, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de több verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festőnek versét."     , "Mari olvasta a festőnek egy versét."       ]}] ,
    [["tc-B3-mar-fc-ind-8", [34, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de több verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festőnek versét."     , "Mari olvasta a festőnek a versét."       ]}]   ,
    [["tc-B3-mar-fc-ind-9", [35, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de több verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festőnek egy versét." , "Mari olvasta a festőnek a versét."       ]}]   ,

    // 36-45: 10 AJ kontextussal. Egy határozott, egy határozatlan.

    [["t-A4-pet-nom-def", [36, 1]], "AcceptabilityJudgment",  {s: "Schmitt Anna ismert költő, de egy tájképet is festett.", q: "Péter látta a költő tájképét."}],
    [["t-A4-pet-nom-ind", [37, 1]], "AcceptabilityJudgment",  {s: "Schmitt Anna ismert költő, de egy tájképet is festett.", q: "Péter látta a költő egy tájképét."}],
    [["t-A4-pet-dat-nil", [38, 1]], "AcceptabilityJudgment",  {s: "Schmitt Anna ismert költő, de egy tájképet is festett.", q: "Péter látta a költőnek tájképét."}],
    [["t-A4-pet-dat-def", [39, 1]], "AcceptabilityJudgment",  {s: "Schmitt Anna ismert költő, de egy tájképet is festett.", q: "Péter látta a költőnek egy tájképét."}],
    [["t-A4-pet-dat-ind", [40, 1]], "AcceptabilityJudgment",  {s: "Schmitt Anna ismert költő, de egy tájképet is festett.", q: "Péter látta a költőnek a tájképét."}],

    [["t-A5-pet-nom-def", [41, 1]], "AcceptabilityJudgment",  {s: "Schmitt Anna ismert költő, de több tájképet is festett.", q: "Péter látta a költő tájképét."}],
    [["t-A5-pet-nom-ind", [42, 1]], "AcceptabilityJudgment",  {s: "Schmitt Anna ismert költő, de több tájképet is festett.", q: "Péter látta a költő egy tájképét."}],
    [["t-A5-pet-dat-nil", [43, 1]], "AcceptabilityJudgment",  {s: "Schmitt Anna ismert költő, de több tájképet is festett.", q: "Péter látta a költőnek tájképét."}],
    [["t-A5-pet-dat-def", [44, 1]], "AcceptabilityJudgment",  {s: "Schmitt Anna ismert költő, de több tájképet is festett.", q: "Péter látta a költőnek egy tájképét."}],
    [["t-A5-pet-dat-ind", [45, 1]], "AcceptabilityJudgment",  {s: "Schmitt Anna ismert költő, de több tájképet is festett.", q: "Péter látta a költőnek a tájképét."}],

    [["t-B4-mar-nom-def", [36, 1]], "AcceptabilityJudgment",  {s: "Kovács János híres festő, de több verset is írt.", q: "Mari olvasta a festő versét."}],
    [["t-B4-mar-nom-ind", [37, 1]], "AcceptabilityJudgment",  {s: "Kovács János híres festő, de több verset is írt.", q: "Mari olvasta a festő egy versét."}],
    [["t-B4-mar-dat-nil", [38, 1]], "AcceptabilityJudgment",  {s: "Kovács János híres festő, de több verset is írt.", q: "Mari olvasta a festőnek versét."}],
    [["t-B4-mar-dat-def", [39, 1]], "AcceptabilityJudgment",  {s: "Kovács János híres festő, de több verset is írt.", q: "Mari olvasta a festőnek egy versét."}],
    [["t-B4-mar-dat-ind", [40, 1]], "AcceptabilityJudgment",  {s: "Kovács János híres festő, de több verset is írt.", q: "Mari olvasta a festőnek a versét."}],

    [["t-B5-mar-nom-def", [41, 1]], "AcceptabilityJudgment",  {s: "Kovács János híres festő, de több verset is írt.", q: "Mari olvasta a festő versét."}],
    [["t-B5-mar-nom-ind", [42, 1]], "AcceptabilityJudgment",  {s: "Kovács János híres festő, de több verset is írt.", q: "Mari olvasta a festő egy versét."}],
    [["t-B5-mar-dat-nil", [43, 1]], "AcceptabilityJudgment",  {s: "Kovács János híres festő, de több verset is írt.", q: "Mari olvasta a festőnek versét."}],
    [["t-B5-mar-dat-def", [44, 1]], "AcceptabilityJudgment",  {s: "Kovács János híres festő, de több verset is írt.", q: "Mari olvasta a festőnek egy versét."}],
    [["t-B5-mar-dat-ind", [45, 1]], "AcceptabilityJudgment",  {s: "Kovács János híres festő, de több verset is írt.", q: "Mari olvasta a festőnek a versét."}],

    // fillers: 30 AJ, 50 FC (27 kontextussal, 23 kontextus nélkül)

    ["f-01", "AcceptabilityJudgment", {s: "Ma van az osztályfőnök születésnapja.",                   q: "Két gyerek adnak egy könyvet Marinak."}],
    ["f-02", "AcceptabilityJudgment", {s: "Ma az osztáylfőnök születésnapja van.",                   q: "Marinak adnak két gyerek egy könyvet."}],
    ["f-03", "AcceptabilityJudgment", {s: "Tíz óra után már tilos zajt csinálni.",                   q: "A koncert az együttes befejez."}],
    ["f-04", "AcceptabilityJudgment", {s: "Tíz óra után már tilos zajt csinálni.",                   q: "Az együttes befejez a koncertet."}],
    ["f-05", "AcceptabilityJudgment", {s: "Ismerem ezt a kóbor kutyát.",                             q: "A kutya elfutott Marinak."}],

    ["f-06", "AcceptabilityJudgment", {s: "Ismerem ezt a kóbor kutyát.",                             q: "Elfutnak a kutya Maritól."}],
    ["f-07", "AcceptabilityJudgment", {s: "Minden házkutatás úgyanúgy kezdődik.",                    q: "Megállnak a rendőr a ház."}],
    ["f-08", "AcceptabilityJudgment", {s: "Minden házkutatás úgyanúgy kezdődik.",                    q: "A rendőr megállnak ház melett."}],
    ["f-09", "AcceptabilityJudgment", {s: "Ma pörköltet főztem.",                                    q: "Ádám megeszi vacsora biztosan. "}],
    ["f-10", "AcceptabilityJudgment", {s: "Ma pörköltet főztem.",                                    q: "A vacsoráját biztosan Ádám megeszi."}],

    ["f-11", "AcceptabilityJudgment", {s: "Tudom, hogy kit kérdezzek meg, hogy milyen az új sör.",   q: "János ivott egy korsóval meg tegnap este."}],
    ["f-12", "AcceptabilityJudgment", {s: "Tudom, hogy kit kérdezzek meg, hogy milyen az új sör.",   q: "János ivott egy korsóval tegnap este meg."}],
    ["f-13", "AcceptabilityJudgment", {s: "Biztos hallottad a hírt.",                                q: "Tegnap ment a nagyfőnök haza a börtönből."}],
    ["f-14", "AcceptabilityJudgment", {s: "Biztos hallottad a hírt.",                                q: "Tegnap ment a nagyfőnök a börtönből haza."}],
    ["f-15", "AcceptabilityJudgment", {s: "A macskánk már nem tudott egyedül bejönni.",              q: "Cirmi nagyobb volt mint a macskaajtó széles."}],

    ["f-16", "AcceptabilityJudgment", {s: "A gimiben nekem voltak a legfurcsább barátaim.",          q: "Péter szélesebb volt mint Csaba magas."}],
    ["f-17", "AcceptabilityJudgment", {s: "Nem éri meg feladni az árut.",                            q: "A bélyeg drágább mint amilyen nehéz a csomag."}],
    ["f-18", "AcceptabilityJudgment", {s: "Én mindig vonattal utazom.",                              q: "A benzin drágább mint amilyen gyors az auto."}],
    ["f-19", "AcceptabilityJudgment", {s: "Biztos hallotad a hírt.",                                 q: "Tegnap ment haza a nagyfőnök a börtőnből."}],
    ["f-20", "AcceptabilityJudgment", {s: "Tudom, hogy kit kérdezzek meg, hogy milyen az új sör.",   q: "János ivott meg egy korsóval tegnap este."}],

    ["f-21", "AcceptabilityJudgment", {s: "Ma van az osztályfőnök születésnapja.",                   q: "Egy könyvet adnak a gyerekek Marinak."}],
    ["f-22", "AcceptabilityJudgment", {s: "Ma az osztályfőnök születésnapja van.",                   q: "Marinak adnak egy könyvet a gyerekek."}],
    ["f-23", "AcceptabilityJudgment", {s: "Ma van a ballagás, az ünnepségre mindent megszerveztek.", q: "Két gyerek ad egy könyvet Marinak."}],
    ["f-24", "AcceptabilityJudgment", {s: "Tíz óra után már tilos zajt csinálni.",                   q: "Az együttes befelyezi a koncertet."}],
    ["f-25", "AcceptabilityJudgment", {s: "Ismerem ezt a kóbor kutyát.",                             q: "A kutya Maritól futott el."}],

    ["f-26", "AcceptabilityJudgment", {s: "Ismerem ezt a kóbor kutyát.",                             q: "Maritól futott el a kutya."}],
    ["f-27", "AcceptabilityJudgment", {s: "Minden házkutatás ugyanúgy kezdődik.",                    q: "Megállnak a rendőrök a ház mellett."}],
    ["f-28", "AcceptabilityJudgment", {s: "Minden házkutatás ugyanúgy kezdődik.",                    q: "A rendőrök a ház mellett álltak meg."}],
    ["f-29", "AcceptabilityJudgment", {s: "Ma pörköltet főztem.",                                    q: "Ádám biztosan megeszi a vacsoráját."}],
    ["f-30", "AcceptabilityJudgment", {s: "Ma pörköltet főztem.",                                    q: "Ádám megeszi a vacsorát, az biztos."}],

    ["fc-01", "ForcedQuestion" , {s: "Néhány barátom a rádiónál dolgozik, de nincs állandó feladatuk." , q: "Melyik mondat helyesebb?" , as: ["Géza olvasta fel ma a híreket.",  "Géza olvasta ma a híreket fel."  ]}]   ,
    ["fc-02", "ForcedQuestion" , {s: "Néhány barátom a rádiónál dolgozik, de nincs állandó feladatuk." , q: "Melyik mondat helyesebb?" , as: ["Géza olvasta ma fel a híreket.",  "Géza olvasta ma a híreket fel."  ]}]   ,
    ["fc-03", "ForcedQuestion" , {s: "Néhány barátom a rádiónál dolgozik, de nincs állandó feladatuk." , q: "Melyik mondat helyesebb?" , as: ["Géza olvasta ma fel a híreket.",  "Géza olvasta fel ma a híreket."  ]}]   ,
    ["fc-04", "ForcedQuestion" , {s: "Néhány barátom a rádiónál dolgozik, de nincs állandó feladatuk." , q: "Melyik mondat helyesebb?" , as: ["Géza olvasta fel ma a híreket.",  "Géza olvasta a híreket ma fel."  ]}]   ,
    ["fc-05", "ForcedQuestion" , {s: "Néhány barátom a rádiónál dolgozik, de nincs állandó feladatuk." , q: "Melyik mondat helyesebb?" , as: ["Géza olvasta ma fel a híreket.",  "Géza olvasta a híreket ma fel."  ]}]     ,
    ["fc-06", "ForcedQuestion" , {s: "Néhány barátom a rádiónál dolgozik, de nincs állandó feladatuk." , q: "Melyik mondat helyesebb?" , as: ["Géza olvasta fel ma a híreket.",  "Géza olvasta a híreket fel ma."  ]}] ,
    ["fc-07", "ForcedQuestion" , {s: "Néhány barátom a rádiónál dolgozik, de nincs állandó feladatuk." , q: "Melyik mondat helyesebb?" , as: ["Géza olvasta ma fel a híreket.",  "Géza olvasta a híreket fel ma."  ]}]   ,
    ["fc-08", "ForcedQuestion" , {s: "Néhány barátom a rádiónál dolgozik, de nincs állandó feladatuk." , q: "Melyik mondat helyesebb?" , as: ["Géza olvasta a híreket ma fel.",  "Géza olvasta a híreket fel ma."  ]}] ,
    ["fc-09", "ForcedQuestion" , {s: "Néhány barátom a rádiónál dolgozik, de nincs állandó feladatuk." , q: "Melyik mondat helyesebb?" , as: ["Géza olvasta fel a híreket ma.",  "Géza olvasta ma a híreket fel."  ]}]   ,

    ["fc-10", "ForcedQuestion" , {s: "A barátaim mindig befogadnak kóbor állatokat, ma is ez történt." , q: "Melyik mondat helyesebb?" , as: ["János vitte haza a cicákat a pályaudvarról.",  "János vitte a cicákat haza a pályaudvarról."]}]   ,
    ["fc-11", "ForcedQuestion" , {s: "A barátaim mindig befogadnak kóbor állatokat, ma is ez történt." , q: "Melyik mondat helyesebb?" , as: ["János vitte haza a cicákat a pályaudvarról.",  "János vitte a cicákat a pályaudvarról haza."]}]   ,
    ["fc-12", "ForcedQuestion" , {s: "A barátaim mindig befogadnak kóbor állatokat, ma is ez történt." , q: "Melyik mondat helyesebb?" , as: ["János vitte a cicákat haza a pályaudvarról.",  "János vitte a cicákat a pályaudvarról haza."]}]   ,

    ["fc-13", "ForcedQuestion" , {s: "A szomszédnak megint vannak macskái, de nem tudom honnan szerezték őket." , q: "Melyik mondat helyesebb?" , as: ["János vitte haza a cicákat a pályaudvarról.",  "János vitte a cicákat haza a pályaudvarról."]}]   ,
    ["fc-14", "ForcedQuestion" , {s: "A szomszédnak megint vannak macskái, de nem tudom honnan szerezték őket." , q: "Melyik mondat helyesebb?" , as: ["János vitte haza a cicákat a pályaudvarról.",  "János vitte a cicákat a pályaudvarról haza."]}]   ,
    ["fc-15", "ForcedQuestion" , {s: "A szomszédnak megint vannak macskái, de nem tudom honnan szerezték őket." , q: "Melyik mondat helyesebb?" , as: ["János vitte a cicákat haza a pályaudvarról.",  "János vitte a cicákat a pályaudvarról haza."]}]   ,

    ["fc-16", "ForcedQuestion" , {s: "A hétvégen az emberek sok állatot ott hagytak a pályaudvaron, de nem tudom aztán mi lett velük." , q: "Melyik mondat helyesebb?" , as: ["János vitte haza a cicákat a pályaudvarról.",  "János vitte a cicákat haza a pályaudvarról."]}]   ,
    ["fc-17", "ForcedQuestion" , {s: "A hétvégen az emberek sok állatot ott hagytak a pályaudvaron, de nem tudom aztán mi lett velük." , q: "Melyik mondat helyesebb?" , as: ["János vitte haza a cicákat a pályaudvarról.",  "János vitte a cicákat a pályaudvarról haza."]}]   ,
    ["fc-18", "ForcedQuestion" , {s: "A hétvégen az emberek sok állatot ott hagytak a pályaudvaron, de nem tudom aztán mi lett velük." , q: "Melyik mondat helyesebb?" , as: ["János vitte a cicákat haza a pályaudvarról.",  "János vitte a cicákat a pályaudvarról haza."]}]   ,

    ["fc-19", "ForcedQuestion" , {s: "Tudom, hogy Tamás hirtelen híres lett, de nem tudom míert." , q: "Melyik mondat helyesebb?" , as: ["Tamás hívta meg az angol herceget vacsorára.",  "Tamás hívta az angol herceget meg vacsorára."]}]   ,
    ["fc-20", "ForcedQuestion" , {s: "Tudom, hogy Tamás hirtelen híres lett, de nem tudom míert." , q: "Melyik mondat helyesebb?" , as: ["Tamás hívta meg az angol herceget vacsorára.",  "Tamás hívta vacsorára meg az angol herceget."]}]   ,
    ["fc-21", "ForcedQuestion" , {s: "Tudom, hogy Tamás hirtelen híres lett, de nem tudom míert." , q: "Melyik mondat helyesebb?" , as: ["Tamás hívta vacsorára meg az angol herceget.",  "Tamás hívta az angol herceget meg vacsorára."]}]   ,

    ["fc-22", "ForcedQuestion" , {s: "Tudom, hogy egy híres ember volt Tamásnál, de nem tudom ki." , q: "Melyik mondat helyesebb?" , as: ["Tamás hívta meg az angol herceget vacsorára.",  "Tamás hívta az angol herceget meg vacsorára."]}]   ,
    ["fc-23", "ForcedQuestion" , {s: "Tudom, hogy egy híres ember volt Tamásnál, de nem tudom ki." , q: "Melyik mondat helyesebb?" , as: ["Tamás hívta meg az angol herceget vacsorára.",  "Tamás hívta vacsorára meg az angol herceget."]}]   ,
    ["fc-24", "ForcedQuestion" , {s: "Tudom, hogy egy híres ember volt Tamásnál, de nem tudom ki." , q: "Melyik mondat helyesebb?" , as: ["Tamás hívta vacsorára meg az angol herceget.",  "Tamás hívta az angol herceget meg vacsorára."]}]   ,

    ["fc-25", "ForcedQuestion" , {s: "Tudom, hogy egy híres ember volt Tamásnál, de nem tudom miért." , q: "Melyik mondat helyesebb?" , as: ["Tamás hívta meg az angol herceget vacsorára.",  "Tamás hívta az angol herceget meg vacsorára."]}]   ,
    ["fc-26", "ForcedQuestion" , {s: "Tudom, hogy egy híres ember volt Tamásnál, de nem tudom miért." , q: "Melyik mondat helyesebb?" , as: ["Tamás hívta meg az angol herceget vacsorára.",  "Tamás hívta vacsorára meg az angol herceget."]}]   ,
    ["fc-27", "ForcedQuestion" , {s: "Tudom, hogy egy híres ember volt Tamásnál, de nem tudom miért." , q: "Melyik mondat helyesebb?" , as: ["Tamás hívta vacsorára meg az angol herceget.",  "Tamás hívta az angol herceget meg vacsorára."]}],

    ["fc-28", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Felmondtak János és Béla."        , "Felmondott János és Béla."            ]}] ,
    ["fc-29", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Felmondtak János és a kollégái.", "Felmondott János és a kollégái."       ]}] ,
    ["fc-30", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Felmondtak János és a kollégái.", "Felmondtak a kollégái és János."       ]}] ,
    ["fc-31", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Felmondtak János és a kollégái.", "Felmondott a kollégái és János."       ]}] ,
    ["fc-32", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Felmondott János és a kollégái.", "Felmondtak a kollégái és János."   ]}]     ,
    ["fc-33", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Felmondott János és a kollégái.", "Felmondott a kollégái és János."   ]}]     ,
    ["fc-34", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Felmondtak a kollégái és János.", "Felmondott a kollégái és János."   ]}]     ,
    ["fc-35", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Elutaztak a nővéremék és a barátjuk.", "Elutazott a nővéremék és a barátjuk."]}]      ,
    ["fc-36", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Elutaztak a nővéremék és a barátjuk.", "Elutaztak a barátjuk és a nővéremék."]}]      ,
    ["fc-37", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Elutaztak a nővéremék és a barátjuk.", "Elutazott a barátjuk és a nővéremék."]}]        ,
    ["fc-38", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Elutazott a nővéremék és a barátjuk.", "Elutaztak a barátjuk és a nővéremék."]}] ,
    ["fc-39", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Elutazott a nővéremék és a barátjuk.", "Elutazott a barátjuk és a nővéremék."]}] ,
    ["fc-41", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Elutaztak a barátjuk és a nővéremék.", "Elutazott a barátjuk és a nővéremék."]}] ,
    ["fc-42", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Meglátogattak János, Béla és a feleségeik.", "Meglátogatott János, Béla és a feleségeik."]}],
    ["fc-43", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Meglátogattak János, Béla és a feleségeik.", "Meglátogatott János, Béla és a feleségük."]}],
    ["fc-44", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Meglátogattak János, Béla és a feleségeik.", "Meglátogattak, a feleségeik, és János és Béla.]}],
    ["fc-45", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Meglátogattak János, Béla és a feleségeik.", "Meglátogatott, a feleségeik, és János, és Béla]}],
    ["fc-46", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Meglátogattak János, Béla és a feleségeik.", "Meglátogatott, a feleségük, és János, és Béla.]}],
    ["fc-47", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Meglátogattak János, Béla és a feleségeik.", "Meglátogattak, a feleségük, és János és Béla."]}],
    ["fc-48", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Meglátogattak, a feleségeik, és János és Béla", "Meglátogatott, a feleségeik, és János, és Béla.]}],
    ["fc-49", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Meglátogattak, a feleségeik, és János és Béla", "Meglátogatott, a feleségük, és János, és Béla."]}],
    ["fc-50", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Meglátogattak, a feleségeik, és János és Béla", "Meglátogatott, a feleségük, és János, és Béla."]}]

];
