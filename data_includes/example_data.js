// This defines the sequence of elements. We start of with the introduction
// form, and then we have a sequence that has three practice sentences and then
// randomly selects elements from among the targets (...startsWith("t")...) and
// fillers.

var shuffleSequence = /*seq("intro", */seq("practice", rshuffle(startsWith("t"), startsWith("f")));//);

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

    [["t-A2-pet-fc-0", [6, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd nővérét."        , "Ismerte a szomszédnak nővérét."            ]}] ,
    [["t-A2-pet-fc-1", [7, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd nővérét."        , "Ismerte a szomszédnak a nővérét."          ]}] ,
    [["t-A2-pet-fc-2", [8, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd nővérét."        , "Ismerte a szomszédnak egy nővérét."        ]}] ,
    [["t-A2-pet-fc-3", [9, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd nővérét."        , "Ismerte a szomszéd egy nővérét."           ]}] ,
    [["t-A2-pet-fc-4", [10, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd egy nővérét."    , "Ismerte a szomszédnak nővérét."        ]}]     ,
    [["t-A2-pet-fc-5", [11, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd egy nővérét."    , "Ismerte a szomszédnak egy nővérét."    ]}]     ,
    [["t-A2-pet-fc-6", [12, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd egy nővérét."    , "Ismerte a szomszédnak a nővérét."      ]}]     ,
    [["t-A2-pet-fc-7", [13, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszédnak a nővérét."   , "Ismerte a szomszédnak nővérét."       ]}]      ,
    [["t-A2-pet-fc-8", [14, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszédnak a nővérét."   , "Ismerte a szomszédnak egy nővérét."   ]}]      ,
    [["t-A2-pet-fc-9", [15, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszédnak egy nővérét." , "Ismerte a szomszédnak nővérét."     ]}]        ,

    [["t-B2-mar-fc-0", [6, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi versét."      , "Olvasta Petőfi egy versét."                     ]}] ,
    [["t-B2-mar-fc-1", [7, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi versét."      , "Olvasta Petőfinek versét."                      ]}] ,
    [["t-B2-mar-fc-2", [8, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi versét."      , "Olvasta Petőfinek a versét."                    ]}] ,
    [["t-B2-mar-fc-3", [9, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi versét."      , "Olvasta Petőfinek egy versét."                  ]}] ,
    [["t-B2-mar-fc-4", [10, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi egy versét."  , "Olvasta Petőfinek versét."                      ]}] ,
    [["t-B2-mar-fc-5", [11, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi egy versét."  , "Olvasta Petőfinek a versét."                    ]}] ,
    [["t-B2-mar-fc-6", [12, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi egy versét."  , "Olvasta Petőfinek egy versét."                  ]}] ,
    [["t-B2-mar-fc-7", [13, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfinek versét."   , "Olvasta Petőfinek a versét."                    ]}] ,
    [["t-B2-mar-fc-8", [14, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfinek versét."   , "Olvasta Petőfinek egy versét."                  ]}] ,
    [["t-B2-mar-fc-9", [15, 1]], "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfinek a versét." , "Olvasta Petőfinek egy versét."                  ]}] ,

    // 16-35: Forced choice kontextussal. Egy határozott, egy határozatlan.
    //

    [["t-A3-pet-fc-def-0", [16, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de egy tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő egy tájképét."     , "Péter látta a költő tájképet."            ]}]   ,
    [["t-A3-pet-fc-def-1", [17, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de egy tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő egy tájképét."     , "Péter látta a költőnek tájképet."         ]}]   ,
    [["t-A3-pet-fc-def-2", [18, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de egy tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő egy tájképét."     , "Péter látta a költőnek egy tájképet."     ]}]   ,
    [["t-A3-pet-fc-def-3", [19, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de egy tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő egy tájképét."     , "Péter látta a költőnek a tájképet."       ]}]   ,
    [["t-A3-pet-fc-def-4", [20, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de egy tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő tájképet."         , "Péter látta a költőnek tájképet."       ]}]     ,
    [["t-A3-pet-fc-def-5", [21, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de egy tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő tájképet."         , "Péter látta a költőnek egy tájképet."       ]}] ,
    [["t-A3-pet-fc-def-6", [22, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de egy tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő tájképet."         , "Péter látta a költőnek a tájképet."       ]}]   ,
    [["t-A3-pet-fc-def-7", [23, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de egy tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költőnek tájképet."      , "Péter látta a költőnek egy tájképet."       ]}] ,
    [["t-A3-pet-fc-def-8", [24, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de egy tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költőnek tájképet."      , "Péter látta a költőnek a tájképet."       ]}]   ,
    [["t-A3-pet-fc-def-9", [25, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de egy tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költőnek egy tájképet."  , "Péter látta a költőnek a tájképet."       ]}]   ,

    [["t-A3-pet-fc-ind-0", [26, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de több tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő egy tájképét."     , "Péter látta a költő tájképet."            ]}]   ,
    [["t-A3-pet-fc-ind-1", [27, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de több tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő egy tájképét."     , "Péter látta a költőnek tájképet."         ]}]   ,
    [["t-A3-pet-fc-ind-2", [28, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de több tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő egy tájképét."     , "Péter látta a költőnek egy tájképet."     ]}]   ,
    [["t-A3-pet-fc-ind-3", [29, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de több tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő egy tájképét."     , "Péter látta a költőnek a tájképet."       ]}]   ,
    [["t-A3-pet-fc-ind-4", [30, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de több tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő tájképet."         , "Péter látta a költőnek tájképet."       ]}]     ,
    [["t-A3-pet-fc-ind-5", [31, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de több tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő tájképet."         , "Péter látta a költőnek egy tájképet."       ]}] ,
    [["t-A3-pet-fc-ind-6", [32, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de több tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költő tájképet."         , "Péter látta a költőnek a tájképet."       ]}]   ,
    [["t-A3-pet-fc-ind-7", [33, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de több tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költőnek tájképet."      , "Péter látta a költőnek egy tájképet."       ]}] ,
    [["t-A3-pet-fc-ind-8", [34, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de több tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költőnek tájképet."      , "Péter látta a költőnek a tájképet."       ]}]   ,
    [["t-A3-pet-fc-ind-9", [35, 1]], "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de több tájképet is festett." , q: "Melyik mondat helyesebb?" , as: ["Péter látta a költőnek egy tájképet."  , "Péter látta a költőnek a tájképet."       ]}]   ,

    [["t-B3-mar-fc-def-0", [16, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő egy versét."    , "Mari olvasta a festő versét."            ]}]   ,
    [["t-B3-mar-fc-def-1", [17, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő egy versét."    , "Mari olvasta a festőnek versét."         ]}]   ,
    [["t-B3-mar-fc-def-2", [18, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő egy versét."    , "Mari olvasta a festőnek egy versét."     ]}]   ,
    [["t-B3-mar-fc-def-3", [19, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő egy versét."    , "Mari olvasta a festőnek a versét."       ]}]   ,
    [["t-B3-mar-fc-def-4", [20, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő versét."        , "Mari olvasta a festőnek versét."       ]}]     ,
    [["t-B3-mar-fc-def-5", [21, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő versét."        , "Mari olvasta a festőnek egy versét."       ]}] ,
    [["t-B3-mar-fc-def-6", [22, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő versét."        , "Mari olvasta a festőnek a versét."       ]}]   ,
    [["t-B3-mar-fc-def-7", [23, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festőnek versét."     , "Mari olvasta a festőnek egy versét."       ]}] ,
    [["t-B3-mar-fc-def-8", [24, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festőnek versét."     , "Mari olvasta a festőnek a versét."       ]}]   ,
    [["t-B3-mar-fc-def-9", [25, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festőnek egy versét." , "Mari olvasta a festőnek a versét."       ]}]   ,

    [["t-B3-mar-fc-ind-0", [26, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de több verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő egy versét."    , "Mari olvasta a festő versét."            ]}]   ,
    [["t-B3-mar-fc-ind-1", [27, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de több verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő egy versét."    , "Mari olvasta a festőnek versét."         ]}]   ,
    [["t-B3-mar-fc-ind-2", [28, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de több verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő egy versét."    , "Mari olvasta a festőnek egy versét."     ]}]   ,
    [["t-B3-mar-fc-ind-3", [29, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de több verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő egy versét."    , "Mari olvasta a festőnek a versét."       ]}]   ,
    [["t-B3-mar-fc-ind-4", [30, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de több verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő versét."        , "Mari olvasta a festőnek versét."       ]}]     ,
    [["t-B3-mar-fc-ind-5", [31, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de több verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő versét."        , "Mari olvasta a festőnek egy versét."       ]}] ,
    [["t-B3-mar-fc-ind-6", [32, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de több verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő versét."        , "Mari olvasta a festőnek a versét."       ]}]   ,
    [["t-B3-mar-fc-ind-7", [33, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de több verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festőnek versét."     , "Mari olvasta a festőnek egy versét."       ]}] ,
    [["t-B3-mar-fc-ind-8", [34, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de több verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festőnek versét."     , "Mari olvasta a festőnek a versét."       ]}]   ,
    [["t-B3-mar-fc-ind-9", [35, 1]], "ForcedQuestion" , {s: "Kovács János híres festő, de több verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festőnek egy versét." , "Mari olvasta a festőnek a versét."       ]}]   ,

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

/*    [["sep", [41, 1]], "Separator", {transfer: 0}],
    [["sep", [41, 1]], "Separator", {transfer: 0}],
    [["tf39", [41, 1]], "AcceptabilityJudgment", {s: "Mennyit ittak a vacsorán?", q: "János ivott meg egy korsóval a vacsorán."}],

    [["sep", [42, 1]], "Separator", {transfer: 0}],
    [["sep", [42, 1]], "Separator", {transfer: 0}],
    [["tf40", [42, 1]], "AcceptabilityJudgment", {s: "Mennyit ittak a vacsorán?", q: "János ivott egy korsóval meg a vacsorán."}],

    [["sep", [43, 1]], "Separator", {transfer: 0}],
    [["sep", [43, 1]], "Separator", {transfer: 0}],
    [["tf41", [43, 1]], "AcceptabilityJudgment", {s: "Mennyit ittak a vacsorán?", q: "János ivott egy korsóval a vacsorán meg."}],

    [["sep", [44, 1]], "Separator", {transfer: 0}],
    [["sep", [44, 1]], "Separator", {transfer: 0}],
    [["tf42", [44, 1]], "AcceptabilityJudgment", {s: "Hol volt István?", q: "Tegnap ment haza István az iskolából."}],

    [["sep", [45, 1]], "Separator", {transfer: 0}],
    [["sep", [45, 1]], "Separator", {transfer: 0}],
    [["tf43", [45, 1]], "AcceptabilityJudgment", {s: "Hol volt István?", q: "Tegnap ment István haza az iskolából."}],

    [["sep", [46, 1]], "Separator", {transfer: 0}],
    [["sep", [46, 1]], "Separator", {transfer: 0}],
    [["tf44", [46, 1]], "AcceptabilityJudgment", {s: "Hol volt István?", q: "Tegnap ment István az iskolából haza."}],

    [["sep", [47, 1]], "Separator", {transfer: 0}],
    [["sep", [47, 1]], "Separator", {transfer: 0}],
    [["tf45", [47, 1]], "AcceptabilityJudgment", {s: "Együtt nézték a híradót.", q: "Imre és Juli látta sajátmagát a tévében."}],

    [["sep", [48, 1]], "Separator", {transfer: 0}],
    [["sep", [48, 1]], "Separator", {transfer: 0}],
    [["tf46", [48, 1]], "AcceptabilityJudgment", {s: "Együtt nézték a híradót.", q: "Imre és Juli látta sajátmagukat a tévében."}],

    // fillers

    ["f01", "AcceptabilityJudgment", {s: "Ma van az osztályfőnök születésnapja.",                   q: "Két gyerek adnak egy könyvet Marinak."}],
    ["f02", "AcceptabilityJudgment", {s: "Ma az osztáylfőnök születésnapja van.",                   q: "Marinak adnak két gyerek egy könyvet."}],
    ["f03", "AcceptabilityJudgment", {s: "Tíz óra után már tilos zajt csinálni.",                   q: "A koncert az együttes befejez."}],
    ["f04", "AcceptabilityJudgment", {s: "Tíz óra után már tilos zajt csinálni.",                   q: "Az együttes befejez a koncertet."}],
    ["f05", "AcceptabilityJudgment", {s: "Ismerem ezt a kóbor kutyát.",                             q: "A kutya elfutott Marinak."}],

    ["f06", "AcceptabilityJudgment", {s: "Ismerem ezt a kóbor kutyát.",                             q: "Elfutnak a kutya Maritól."}],
    ["f07", "AcceptabilityJudgment", {s: "Minden házkutatás úgyanúgy kezdődik.",                    q: "Megállnak a rendőr a ház."}],
    ["f08", "AcceptabilityJudgment", {s: "Minden házkutatás úgyanúgy kezdődik.",                    q: "A rendőr megállnak ház melett."}],
    ["f09", "AcceptabilityJudgment", {s: "Ma pörköltet föztem.",                                    q: "Ádám megeszi vacsora biztosan. "}],
    ["f10", "AcceptabilityJudgment", {s: "Ma pörköltet föztem.",                                    q: "A vacsoráját biztosan Ádám megeszi."}],

    ["f11", "AcceptabilityJudgment", {s: "Tudom, hogy kit kérdezzek meg, hogy milyen az új sör.",   q: "János ivott egy korsóval meg tegnap este."}],
    ["f12", "AcceptabilityJudgment", {s: "Tudom, hogy kit kérdezzek meg, hogy milyen az új sör.",   q: "János ivott egy korsóval tegnap este meg."}],
    ["f13", "AcceptabilityJudgment", {s: "Biztos hallottad a hírt.",                                q: "Tegnap ment a nagyfőnök haza a börtönből."}],
    ["f14", "AcceptabilityJudgment", {s: "Biztos hallottad a hírt.",                                q: "Tegnap ment a nagyfőnök a börtönből haza."}],
    ["f15", "AcceptabilityJudgment", {s: "A macskánk már nem tudott egyedül bejönni.",              q: "Cirmi nagyobb volt mint a macskaajtó széles."}],

    ["f16", "AcceptabilityJudgment", {s: "A gimiben nekem voltak a legfurcsább barátaim.",          q: "Péter szélesebb volt mint Csaba magas."}],
    ["f17", "AcceptabilityJudgment", {s: "Nem éri meg feladni az árut.",                            q: "A bélyeg drágább mint amilyen nehéz a csomag."}],
    ["f18", "AcceptabilityJudgment", {s: "Én mindig vonattal utazom.",                              q: "A benzin drágább mint amilyen gyors az auto."}],
    ["f19", "AcceptabilityJudgment", {s: "Biztos hallotad a hírt.",                                 q: "Tegnap ment haza a nagyfőnök a börtőnből."}],
    ["f20", "AcceptabilityJudgment", {s: "Tudom, hogy kit kérdezzek meg, hogy milyen az új sör.",   q: "János ivott meg egy korsóval tegnap este."}],

    ["f21", "AcceptabilityJudgment", {s: "Ma van az osztályfőnök születésnapja.",                   q: "Egy könyvet adnak a gyerekek Marinak."}],
    ["f22", "AcceptabilityJudgment", {s: "Ma az osztályfőnök születésnapja van.",                   q: "Marinak adnak egy könyvet a gyerekek."}],
    ["f23", "AcceptabilityJudgment", {s: "Ma van a ballagás, az ünnepségre mindent megszerveztek.", q: "Két gyerek ad egy könyvet Marinak."}],
    ["f24", "AcceptabilityJudgment", {s: "Tíz óra után már tilos zajt csinálni.",                   q: "Az együttes befelyezi a koncertet."}],
    ["f25", "AcceptabilityJudgment", {s: "Ismerem ezt a kóbor kutyát.",                             q: "A kutya Maritól futott el."}],

    ["f26", "AcceptabilityJudgment", {s: "Ismerem ezt a kóbor kutyát.",                             q: "Maritól futott el a kutya."}],
    ["f27", "AcceptabilityJudgment", {s: "Minden házkutatás ugyanúgy kezdődik.",                    q: "Megállnak a rendőrök a ház mellett."}],
    ["f28", "AcceptabilityJudgment", {s: "Minden házkutatás ugyanúgy kezdődik.",                    q: "A rendőrök a ház mellett álltak meg."}],
    ["f29", "AcceptabilityJudgment", {s: "Ma pörköltet föztem.",                                    q: "Ádám biztosan megeszi a vacsoráját."}],
    ["f30", "AcceptabilityJudgment", {s: "Ma pörköltet föztem.",                                    q: "Ádám megeszi a vacsorát, az biztos."}], */

];
