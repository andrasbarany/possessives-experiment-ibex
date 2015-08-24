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
    // We have three different blocks.
    //
    // Block 1: A (16) + A2 (16) + B (8) = 40 + 30 filler
    // Block 2: A (16) + B2 (16) + B (8) = 40 + 30 filler
    // Block 3: A/dat (8) * 4 = 32 + 46 filler
    //
    // ["...", 1], A]
    // ["...", 1], A]
    // ["...", 1], A/dat]
    //
    // ["...", [2, 1], A]
    // ["...", [2, 1], A]
    // ["...", [2, 1], A/dat]
    //
    // 01-16: Acceptability judgments.

    ["t-A1-pet-nom-sbj-1", "AcceptabilityJudgment",  {s: "Péter gyakran járt a szomszédékhoz.", q: "Ismerte a szomszéd nővérét."}],
    ["t-A1-pet-nom-ind-1", "AcceptabilityJudgment",  {s: "Péter gyakran járt a szomszédékhoz.", q: "Ismerte a szomszéd egy nővérét."}],
    ["t-A1-pet-dat-non-1", "AcceptabilityJudgment",  {s: "Péter gyakran járt a szomszédékhoz.", q: "Ismerte a szomszédnak nővérét."}],
    ["t-A1-pet-dat-def-1", "AcceptabilityJudgment",  {s: "Péter gyakran járt a szomszédékhoz.", q: "Ismerte a szomszédnak a nővérét."}],
    ["t-A1-pet-dat-ind-1", "AcceptabilityJudgment",  {s: "Péter gyakran járt a szomszédékhoz.", q: "Ismerte a szomszédnak egy nővérét."}],

    ["t-A1-mar-nom-sbj-1", "AcceptabilityJudgment",  {s: "Mari imádja a magyar irodalmat.", q: "Olvasta Petőfi versét."}],
    ["t-A1-mar-nom-ind-1", "AcceptabilityJudgment",  {s: "Mari imádja a magyar irodalmat.", q: "Olvasta Petőfi egy versét."}],
    ["t-A1-mar-dat-non-1", "AcceptabilityJudgment",  {s: "Mari imádja a magyar irodalmat.", q: "Olvasta Petőfinek versét."}],
    ["t-A1-mar-dat-def-1", "AcceptabilityJudgment",  {s: "Mari imádja a magyar irodalmat.", q: "Olvasta Petőfinek a versét."}],
    ["t-A1-mar-dat-ind-1", "AcceptabilityJudgment",  {s: "Mari imádja a magyar irodalmat.", q: "Olvasta Petőfinek egy versét."}],

    ["t-A1-ada-nom-sbj-1", "AcceptabilityJudgment",  {s: "Ádám nagy Monet-rajongó.", q: "Kereste Monet tájképét."}],
    ["t-A1-ada-nom-ind-1", "AcceptabilityJudgment",  {s: "Ádám nagy Monet-rajongó.", q: "Kereste Monet egy tájképét."}],
    ["t-A1-ada-dat-non-1", "AcceptabilityJudgment",  {s: "Ádám nagy Monet-rajongó.", q: "Kereste Monetnek tájképét."}],
    ["t-A1-ada-dat-def-1", "AcceptabilityJudgment",  {s: "Ádám nagy Monet-rajongó.", q: "Kereste Monetnek a tájképét."}],
    ["t-A1-ada-dat-ind-1", "AcceptabilityJudgment",  {s: "Ádám nagy Monet-rajongó.", q: "Kereste Monetnek egy tájképét."}],

    ["t-A1-jul-nom-sbj-1", "AcceptabilityJudgment",  {s: "Juli sok időt töltött a könyvesboltban.", q: "Végül megtalálta az író regényét."}],
    ["t-A1-jul-nom-ind-1", "AcceptabilityJudgment",  {s: "Juli sok időt töltött a könyvesboltban.", q: "Végül megtalálta az író egy regényét."}],
    ["t-A1-jul-dat-non-1", "AcceptabilityJudgment",  {s: "Juli sok időt töltött a könyvesboltban.", q: "Végül megtalálta az írónak regényét."}],
    ["t-A1-jul-dat-def-1", "AcceptabilityJudgment",  {s: "Juli sok időt töltött a könyvesboltban.", q: "Végül megtalálta az írónak a regényét."}],
    ["t-A1-jul-dat-ind-1", "AcceptabilityJudgment",  {s: "Juli sok időt töltött a könyvesboltban.", q: "Végül megtalálta az írónak egy regényét."}],

    // 17-41: Forced choice on the previous data.
    //
    // If there are four sentences for each subject above, there are six ways
    // to compare them; that might be a bit much.
    //
    // What if each participant only gets two forced choice-sets, but then
    // between the full four sentences?

    ["t-B1-pet-dat-ind-0" , "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd nővérét."        , "Ismerte a szomszédnak nővérét."            ]}] ,
    ["t-B1-pet-dat-ind-1" , "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd nővérét."        , "Ismerte a szomszédnak a nővérét."          ]}] ,
    ["t-B1-pet-dat-ind-2" , "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd nővérét."        , "Ismerte a szomszédnak egy nővérét."        ]}] ,
    ["t-B1-pet-dat-ind-3" , "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd nővérét."        , "Ismerte a szomszéd egy nővérét."           ]}] ,
    ["t-B1-pet-dat-ind-4" , "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd egy nővérét."    , "Ismerte a szomszédnak nővérét."        ]}]     ,
    ["t-B1-pet-dat-ind-5" , "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd egy nővérét."    , "Ismerte a szomszédnak egy nővérét."    ]}]     ,
    ["t-B1-pet-dat-ind-6" , "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszéd egy nővérét."    , "Ismerte a szomszédnak a nővérét."      ]}]     ,
    ["t-B1-pet-dat-ind-7" , "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszédnak a nővérét."   , "Ismerte a szomszédnak nővérét."       ]}]      ,
    ["t-B1-pet-dat-ind-8" , "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszédnak a nővérét."   , "Ismerte a szomszédnak egy nővérét."   ]}]      ,
    ["t-B1-pet-dat-ind-9" , "Question" , {q: "Melyik mondat helyesebb?" , as: ["Ismerte a szomszédnak egy nővérét." , "Ismerte a szomszédnak nővérét."     ]}]        ,

    ["t-B1-mar-dat-ind-0" , "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi versét."      , "Olvasta Petőfi egy versét."                     ]}] ,
    ["t-B1-mar-dat-ind-1" , "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi versét."      , "Olvasta Petőfinek versét."                      ]}] ,
    ["t-B1-mar-dat-ind-2" , "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi versét."      , "Olvasta Petőfinek a versét."                    ]}] ,
    ["t-B1-mar-dat-ind-3" , "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi versét."      , "Olvasta Petőfinek egy versét."                  ]}] ,
    ["t-B1-mar-dat-ind-4" , "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi egy versét."  , "Olvasta Petőfinek versét."                      ]}] ,
    ["t-B1-mar-dat-ind-5" , "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi egy versét."  , "Olvasta Petőfinek a versét."                    ]}] ,
    ["t-B1-mar-dat-ind-6" , "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfi egy versét."  , "Olvasta Petőfinek egy versét."                  ]}] ,
    ["t-B1-mar-dat-ind-7" , "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfinek versét."   , "Olvasta Petőfinek a versét."                    ]}] ,
    ["t-B1-mar-dat-ind-8" , "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfinek versét."   , "Olvasta Petőfinek egy versét."                  ]}] ,
    ["t-B1-mar-dat-ind-9" , "Question" , {q: "Melyik mondat helyesebb?" , as: ["Olvasta Petőfinek a versét." , "Olvasta Petőfinek egy versét."                  ]}] ,

    // 42-xx:
    //

    ["t-C1-mar-dat-ind-0" , "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő egy versét."    , "Mari olvasta a festő versét."            ]}]   ,
    ["t-C1-mar-dat-ind-1" , "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő egy versét."    , "Mari olvasta a festőnek versét."         ]}]   ,
    ["t-C1-mar-dat-ind-2" , "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő egy versét."    , "Mari olvasta a festőnek egy versét."     ]}]   ,
    ["t-C1-mar-dat-ind-3" , "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő egy versét."    , "Mari olvasta a festőnek a versét."       ]}]   ,
    ["t-C1-mar-dat-ind-4" , "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő versét."        , "Mari olvasta a festőnek versét."       ]}]     ,
    ["t-C1-mar-dat-ind-5" , "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő versét."        , "Mari olvasta a festőnek egy versét."       ]}] ,
    ["t-C1-mar-dat-ind-6" , "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festő versét."        , "Mari olvasta a festőnek a versét."       ]}]   ,
    ["t-C1-mar-dat-ind-7" , "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festőnek versét."     , "Mari olvasta a festőnek egy versét."       ]}] ,
    ["t-C1-mar-dat-ind-8" , "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festőnek versét."     , "Mari olvasta a festőnek a versét."       ]}]   ,
    ["t-C1-mar-dat-ind-9" , "ForcedQuestion" , {s: "Kovács János híres festő, de egy verset is írt." , q: "Melyik mondat helyesebb?" , as: ["Mari olvasta a festőnek egy versét." , "Mari olvasta a festőnek a versét."       ]}]   ,

    ["t-C1-pet-dat-ind-0" , "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de sokat festett is." , q: "Melyik mondat helyesebb?" , as: ["Péter ismeri a költő egy tájképét."    , "Péter ismeri a költő tájképet."            ]}]   ,
    ["t-C1-pet-dat-ind-1" , "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de sokat festett is." , q: "Melyik mondat helyesebb?" , as: ["Péter ismeri a költő egy tájképét."    , "Péter ismeri a költőnek tájképet."         ]}]   ,
    ["t-C1-pet-dat-ind-2" , "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de sokat festett is." , q: "Melyik mondat helyesebb?" , as: ["Péter ismeri a költő egy tájképét."    , "Péter ismeri a költőnek egy tájképet."     ]}]   ,
    ["t-C1-pet-dat-ind-3" , "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de sokat festett is." , q: "Melyik mondat helyesebb?" , as: ["Péter ismeri a költő egy tájképét."    , "Péter ismeri a költőnek a tájképet."       ]}]   ,
    ["t-C1-pet-dat-ind-4" , "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de sokat festett is." , q: "Melyik mondat helyesebb?" , as: ["Péter ismeri a költő tájképet."          , "Péter ismeri a költőnek tájképet."       ]}]     ,
    ["t-C1-pet-dat-ind-5" , "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de sokat festett is." , q: "Melyik mondat helyesebb?" , as: ["Péter ismeri a költő tájképet."          , "Péter ismeri a költőnek egy tájképet."       ]}] ,
    ["t-C1-pet-dat-ind-6" , "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de sokat festett is." , q: "Melyik mondat helyesebb?" , as: ["Péter ismeri a költő tájképet."          , "Péter ismeri a költőnek a tájképet."       ]}]   ,
    ["t-C1-pet-dat-ind-7" , "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de sokat festett is." , q: "Melyik mondat helyesebb?" , as: ["Péter ismeri a költőnek tájképet."       , "Péter ismeri a költőnek egy tájképet."       ]}] ,
    ["t-C1-pet-dat-ind-8" , "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de sokat festett is." , q: "Melyik mondat helyesebb?" , as: ["Péter ismeri a költőnek tájképet."       , "Péter ismeri a költőnek a tájképet."       ]}]   ,
    ["t-C1-pet-dat-ind-9" , "ForcedQuestion" , {s: "Schmitt Anna ismert költő, de sokat festett is." , q: "Melyik mondat helyesebb?" , as: ["Péter ismeri a költőnek egy tájképet."   , "Péter ismeri a költőnek a tájképet."       ]}]   ,

    // Acceptability judgments for the preceding sentences?

    ["t-D1-mar-dat-ind-1", "AcceptabilityJudgment", {s: "Kovács János híres festő, de sok verset is írt.", q: "Mari olvasta a költő egy versét."}],

    // Word order?

    ["t-E1-mar-dat-ind-1", "AcceptabilityJudgment", {s: "Kovács János híres festő, de egy verset is írt.", q: "Mari a festőnek tegnap olvasta a versét."}],

    // 40-48: Blocks 1/2: empty, Block 3: 8 fillers that don't show up in 1/2

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
