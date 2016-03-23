// This defines the sequence of elements. We start of with the introduction
// form, and then we have a sequence that has three practice sentences and then
// randomly selects elements from among the targets (...startsWith("t")...) and
// fillers.

var shuffleSequence = seq("intro", "acceptability_intro", "practice",
            rshuffle(startsWith("t-"), startsWith("form-"), startsWith("fc-")));//,
//             "FC_intro_NoCont",
//            rshuffle(startsWith("form-"), startsWith("fc3-")),
//            "FC_intro_Context",
//            rshuffle(startsWith("tc2-"), startsWith("fc3-")));//);

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

//    ["intro", "Form", {
//        html: { include: "intro.html" },
//        validators: {
//            age: function (s) { if (s.match(/^\d+$/)) return true; else return "Bad value for \u2018age\u2019"; }
//        }
//    } ],
//
//    ["acceptability_intro", "Form", {
//        html: { include: "acceptability_intro.html" }
//    } ],
//
    ["FC_intro_NoCont", "Form", {
        html: { include: "FC_intro_NoCont.html" }
    } ],

    ["FC_intro_Context", "Form", {
        html: { include: "FC_intro_Context.html" }
    } ],

    // Three practice items for acceptability judgments. No groups necessary
    // here, everyone can can get the same sentences.

    ["practice", "AcceptabilityJudgment", {s: "Marinak több testvére van.", q: "Ismerem Mari egy hugát."}],
    ["practice", "AcceptabilityJudgment", {s: "Az utcán sétaltak.",         q: "Laci látja az autót."}],
    ["practice", "AcceptabilityJudgment", {s: "Mi történt?",                q: "Péter mentek haza."}],

    // These, without groups, show up for everyone.

    // ["target", "AcceptabilityJudgment", {s: "Látunk Marinak egy nővérét."}],

    // 2016 március:
    // 1 FC/2 AJ/1 FO: minden alany négy különböző igét lát
    //
    // [["...", 1], A]
    // [["...", 1], B]
    //
    // [["...", [2, 1], A]
    // [["...", [2, 1], B]
    //
    //
    // 1 forced choice, kontextussal.

//    [["fc-A1-auto-acc-sbj", 1], "ForcedQuestion" , {s: "Egy autószerelő műhelyében a szerelő csavarhúzót kér egy segédjétől." , q: "Melyik mondat helyesebb?" , as: ["Hozzál egy csavarhúzómat!",  "Hozd egy csavarhúzómat!"  ]}],
//    ["fc-A1-auto-nom-sbj", "ForcedQuestion" , {s: "Egy autószerelő műhelyében a szerelő csavarhúzót kér egy segédjétől." , q: "Melyik mondat helyesebb?" , as: ["Hozzál egy csavarhúzóm!",  "Hozd egy csavarhúzóm!"  ]}],

    [["fc-B1-ugyf-acc-sbj", 1], "ForcedQuestion" , {s: "Egy ügyvédi irodában megkéri az ügyvédnő a titkárját, hogy engedjen be valakit a váró ügyfelek közül." , q: "Melyik mondat helyesebb?" , as: ["Hozzon be egy ügyfelem!",  "Hozd be egy ügyfelem!"  ]}],
//    ["fc-B1-ugyf-nom-sbj", "ForcedQuestion" , {s: "Egy ügyvédi irodában megkéri az ügyvédnő a titkárját, hogy engedjen be valakit a váró ügyfelek közül." , q: "Melyik mondat helyesebb?" , as: ["Hozzon be egy ügyfelemet!",  "Hozd be egy ügyfelemet!"  ]}],
    [["t-E1-pszi-acc-sbj", [2, 1]], "AcceptabilityJudgment",  {s: "Egy pszichológus megvigasztalja egy barátját.", q: "Mondjál el egy problémádat!"}],
    [["t-E1-pszi-acc-obj", [3, 1]], "AcceptabilityJudgment",  {s: "Egy pszichológus megvigasztalja egy barátját.", q: "Mondd el egy problémádat!"}],
//    [["form-4", "Form", [4, 1]], { html: { include: "felsz4.html" }} ],

    [["fc-C1-doss-acc-sbj", 1], "ForcedQuestion" , {s: "Egy ügyvédi irodában megkéri az ügyvéd a titkárját, hogy hozzon neki egy dossziét." , q: "Melyik mondat helyesebb?" , as: ["Adjál egy dossziém!",  "Add egy dossziém!"  ]}],
//    ["fc-C1-doss-nom-sbj", "ForcedQuestion" , {s: "Egy ügyvédi irodában megkéri az ügyvéd a titkárját, hogy hozzon neki egy dossziét." , q: "Melyik mondat helyesebb?" , as: ["Adjál egy dossziémat!",  "Add egy dossziémat!"  ]}],
    [["t-D1-bete-acc-sbj", [2, 1]], "AcceptabilityJudgment",  {s: "Egy orvosi rendelőben megkéri az orvos az egyik apolót:", q: "Hívjál be egy betegemet!"}],
    [["t-D1-bete-acc-obj", [3, 1]], "AcceptabilityJudgment",  {s: "Egy orvosi rendelőben megkéri az orvos az egyik apolót:", q: "Hívd be egy betegemet!"}],
//    [["form-1", "Form", [4, 1]], { html: { include: "felsz1.html" }} ],

    [["fc-D1-bete-acc-sbj", 1], "ForcedQuestion" , {s: "Egy orvosi rendelőben megkéri az orvos egy apolót:" , q: "Melyik mondat helyesebb?" , as: ["Hívjál be egy betegem!",  "Hívd be egy betegem!"  ]}],
//    ["fc-D1-bete-nom-sbj", "ForcedQuestion" , {s: "Egy orvosi rendelőben megkéri az orvos egy apolót:" , q: "Melyik mondat helyesebb?" , as: ["Hívjál be egy betegemet!",  "Hívd be egy betegemet!"  ]}],
    [["t-C1-doss-acc-sbj", [2, 1]], "AcceptabilityJudgment",  {s: "Egy ügyvédi irodában megkéri az ügyvéd a titkárját, hogy hozzon neki egy dossziét.", q: "Adjál egy dosszíemat!"}],
    [["t-C1-doss-acc-boj", [3, 1]], "AcceptabilityJudgment",  {s: "Egy ügyvédi irodában megkéri az ügyvéd a titkárját, hogy hozzon neki egy dossziét.", q: "Add egy dossziémat!"}],
//    [["form-2", "Form", [4, 1]], { html: { include: "felsz2.html" }} ],

    [["fc-E1-pszi-acc-sbj", 1], "ForcedQuestion" , {s: "Egy pszichológus megvigasztalja egy barátját és megkéri, hogy meséljen az életéből." , q: "Melyik mondat helyesebb?" , as: ["Mondjál el egy problémádat!",  "Mondd egy problémádat!"  ]}],
//    ["fc-E1-pszi-nom-sbj", "ForcedQuestion" , {s: "Egy autószerelő műhelyében a szerelő csavarhúzót kér egy segédjétől." , q: "Melyik mondat helyesebb?" , as: ["Hozzál egy csavarhúzóm!",  "Hozd egy csavarhúzóm!"  ]}],
    [["t-B1-ugyf-acc-sbj", [2, 1]], "AcceptabilityJudgment",  {s: "Egy ügyvédi irodában megkéri az ügyvédnő a titkárját, hogy engedjen be valakit a váró ügyfelek közül.", q: "Hozzon be egy ügyfelemet!"}],
    [["t-B1-ugyf-acc-obj", [3, 1]], "AcceptabilityJudgment",  {s: "Egy ügyvédi irodában megkéri az ügyvédnő a titkárját, hogy engedjen be valakit a váró ügyfelek közül.", q: "Hozd be egy ügyfelemet!"}],
//    [["form-3", "Form", [4, 1]], { html: { include: "felsz3.html" }} ]//,

    // 2 Acceptability judgment.

//    [["t-A1-auto-nom-sbj", 1], "AcceptabilityJudgment",  {s: "Egy autószerelő műhelyében a szerelő csavarhúzót kér egy segédjétől.", q: "Hozzál egy csavarhúzóm!"}],
//    [["t-A1-auto-nom-obj", [2, 1]], "AcceptabilityJudgment",  {s: "Egy autószerelő műhelyében a szerelő csavarhúzót kér egy segédjétől.", q: "Hozd egy csavarhúzóm!"}],
//    [["t-A1-auto-acc-sbj", [3, 1]], "AcceptabilityJudgment",  {s: "Egy autószerelő műhelyében a szerelő csavarhúzót kér egy segédjétől.", q: "Hozzál egy csavarhúzómat!"}],
//    [["t-A1-auto-acc-obj", [4, 1]], "AcceptabilityJudgment",  {s: "Egy autószerelő műhelyében a szerelő csavarhúzót kér egy segédjétől.", q: "Hozd egy csavarhúzómat!"}],

//    [["t-B1-ugyf-nom-sbj", 1], "AcceptabilityJudgment",  {s: "Egy ügyvédi irodában megkéri az ügyvédnő a titkárját, hogy engedjen be valakit a váró ügyfelek közül.", q: "Hozzon be egy ügyfelem!"}],
//    [["t-B1-ugyf-nom-obj", [2, 1]], "AcceptabilityJudgment",  {s: "Egy ügyvédi irodában megkéri az ügyvédnő a titkárját, hogy engedjen be valakit a váró ügyfelek közül.", q: "Hozd be egy ügyfelem!"}],

//    [["t-C1-doss-nom-sbj", 1], "AcceptabilityJudgment",  {s: "Egy ügyvédi irodában megkéri az ügyvéd a titkárját, hogy hozzon neki egy dossziét.", q: "Adjál egy dossziém!"}],
//    [["t-C1-doss-nom-obj", [2, 1]], "AcceptabilityJudgment",  {s: "Egy ügyvédi irodában megkéri az ügyvéd a titkárját, hogy hozzon neki egy dossziét.", q: "Add egy dossziém!"}],

//    [["t-D1-bete-nom-sbj", 1], "AcceptabilityJudgment",  {s: "Egy orvosi rendelőben megkéri az orvos az egyik apolót:", q: "Hívjál be egy betegem!"}],
//    [["t-D1-bete-nom-obj", [2, 1]], "AcceptabilityJudgment",  {s: "Egy orvosi rendelőben megkéri az orvos az egyik apolót:", q: "Hívd be egy betegemet!"}],

//    [["t-E1-pszi-nom-sbj", 1], "AcceptabilityJudgment",  {s: "Egy pszichológus megvigasztalja egy barátját.", q: "Mondjál el egy problémád!"}],
//    [["t-E1-pszi-nom-obj", [2, 1]], "AcceptabilityJudgment",  {s: "Egy pszichológus megvigasztalja egy barátját.", q: "Mondd el egy problémád!"}],

    // 1 Form


    // fillers: 30 AJ, 50 FC (27 kontextussal, 23 kontextus nélkül)


    // fillers: 30 AJ, 50 FC (27 kontextussal, 23 kontextus nélkül)


    // fillers: 30 AJ, 50 FC (27 kontextussal, 23 kontextus nélkül)


    // fillers: 30 AJ, 50 FC (27 kontextussal, 23 kontextus nélkül)

//    ["f-01", "AcceptabilityJudgment", {s: "Ma van az osztályfőnök születésnapja.",                   q: "Két gyerek adnak egy könyvet Marinak."}],
//    ["f-02", "AcceptabilityJudgment", {s: "Ma az osztáylfőnök születésnapja van.",                   q: "Marinak adnak két gyerek egy könyvet."}],
//    ["f-03", "AcceptabilityJudgment", {s: "Tíz óra után már tilos zajt csinálni.",                   q: "A koncert az együttes befejez."}],
//    ["f-04", "AcceptabilityJudgment", {s: "Tíz óra után már tilos zajt csinálni.",                   q: "Az együttes befejez a koncertet."}],
//    ["f-05", "AcceptabilityJudgment", {s: "Ismerem ezt a kóbor kutyát.",                             q: "A kutya elfutott Marinak."}],
//
//    ["f-06", "AcceptabilityJudgment", {s: "Ismerem ezt a kóbor kutyát.",                             q: "Elfutnak a kutya Maritól."}],
//    ["f-07", "AcceptabilityJudgment", {s: "Minden házkutatás úgyanúgy kezdődik.",                    q: "Megállnak a rendőr a ház."}],
//    ["f-08", "AcceptabilityJudgment", {s: "Minden házkutatás úgyanúgy kezdődik.",                    q: "A rendőr megállnak ház melett."}],
//    ["f-09", "AcceptabilityJudgment", {s: "Ma pörköltet főztem.",                                    q: "Ádám megeszi vacsora biztosan. "}],
//    ["f-10", "AcceptabilityJudgment", {s: "Ma pörköltet főztem.",                                    q: "A vacsoráját biztosan Ádám megeszi."}],
//
//    ["f-11", "AcceptabilityJudgment", {s: "Tudom, hogy kit kérdezzek meg, hogy milyen az új sör.",   q: "János ivott egy korsóval meg tegnap este."}],
//    ["f-12", "AcceptabilityJudgment", {s: "Tudom, hogy kit kérdezzek meg, hogy milyen az új sör.",   q: "János ivott egy korsóval tegnap este meg."}],
//    ["f-13", "AcceptabilityJudgment", {s: "Biztos hallottad a hírt.",                                q: "Tegnap ment a nagyfőnök haza a börtönből."}],
//    ["f-14", "AcceptabilityJudgment", {s: "Biztos hallottad a hírt.",                                q: "Tegnap ment a nagyfőnök a börtönből haza."}],
//    ["f-15", "AcceptabilityJudgment", {s: "A macskánk már nem tudott egyedül bejönni.",              q: "Cirmi nagyobb volt mint a macskaajtó széles."}],
//
//    ["f-16", "AcceptabilityJudgment", {s: "A gimiben nekem voltak a legfurcsább barátaim.",          q: "Péter szélesebb volt mint Csaba magas."}],
//    ["f-17", "AcceptabilityJudgment", {s: "Nem éri meg feladni az árut.",                            q: "A bélyeg drágább mint amilyen nehéz a csomag."}],
//    ["f-18", "AcceptabilityJudgment", {s: "Én mindig vonattal utazom.",                              q: "A benzin drágább mint amilyen gyors az auto."}],
//    ["f-19", "AcceptabilityJudgment", {s: "Biztos hallotad a hírt.",                                 q: "Tegnap ment haza a nagyfőnök a börtőnből."}],
//    ["f-20", "AcceptabilityJudgment", {s: "Tudom, hogy kit kérdezzek meg, hogy milyen az új sör.",   q: "János ivott meg egy korsóval tegnap este."}],
//
//    ["f-21", "AcceptabilityJudgment", {s: "Ma van az osztályfőnök születésnapja.",                   q: "Egy könyvet adnak a gyerekek Marinak."}],
//    ["f-22", "AcceptabilityJudgment", {s: "Ma az osztályfőnök születésnapja van.",                   q: "Marinak adnak egy könyvet a gyerekek."}],
//    ["f-23", "AcceptabilityJudgment", {s: "Ma van a ballagás, az ünnepségre mindent megszerveztek.", q: "Két gyerek ad egy könyvet Marinak."}],
//    ["f-24", "AcceptabilityJudgment", {s: "Tíz óra után már tilos zajt csinálni.",                   q: "Az együttes befelyezi a koncertet."}],
//    ["f-25", "AcceptabilityJudgment", {s: "Ismerem ezt a kóbor kutyát.",                             q: "A kutya Maritól futott el."}],
//
//    ["f-26", "AcceptabilityJudgment", {s: "Ismerem ezt a kóbor kutyát.",                             q: "Maritól futott el a kutya."}],
//    ["f-27", "AcceptabilityJudgment", {s: "Minden házkutatás ugyanúgy kezdődik.",                    q: "Megállnak a rendőrök a ház mellett."}],
//    ["f-28", "AcceptabilityJudgment", {s: "Minden házkutatás ugyanúgy kezdődik.",                    q: "A rendőrök a ház mellett álltak meg."}],
//    ["f-29", "AcceptabilityJudgment", {s: "Ma pörköltet főztem.",                                    q: "Ádám biztosan megeszi a vacsoráját."}],
//    ["f-30", "AcceptabilityJudgment", {s: "Ma pörköltet főztem.",                                    q: "Ádám megeszi a vacsorát, az biztos."}],
//
//    ["fc2-01", "ForcedQuestion" , {s: "Néhány barátom a rádiónál dolgozik, de nincs állandó feladatuk." , q: "Melyik mondat helyesebb?" , as: ["Géza olvasta fel ma a híreket.",  "Géza olvasta ma a híreket fel."  ]}]   ,
//    ["fc2-02", "ForcedQuestion" , {s: "Néhány barátom a rádiónál dolgozik, de nincs állandó feladatuk." , q: "Melyik mondat helyesebb?" , as: ["Géza olvasta ma fel a híreket.",  "Géza olvasta ma a híreket fel."  ]}]   ,
//    ["fc2-03", "ForcedQuestion" , {s: "Néhány barátom a rádiónál dolgozik, de nincs állandó feladatuk." , q: "Melyik mondat helyesebb?" , as: ["Géza olvasta ma fel a híreket.",  "Géza olvasta fel ma a híreket."  ]}]   ,
//    ["fc2-04", "ForcedQuestion" , {s: "Néhány barátom a rádiónál dolgozik, de nincs állandó feladatuk." , q: "Melyik mondat helyesebb?" , as: ["Géza olvasta fel ma a híreket.",  "Géza olvasta a híreket ma fel."  ]}]   ,
//    ["fc2-05", "ForcedQuestion" , {s: "Néhány barátom a rádiónál dolgozik, de nincs állandó feladatuk." , q: "Melyik mondat helyesebb?" , as: ["Géza olvasta ma fel a híreket.",  "Géza olvasta a híreket ma fel."  ]}]     ,
//    ["fc2-06", "ForcedQuestion" , {s: "Néhány barátom a rádiónál dolgozik, de nincs állandó feladatuk." , q: "Melyik mondat helyesebb?" , as: ["Géza olvasta fel ma a híreket.",  "Géza olvasta a híreket fel ma."  ]}] ,
//    ["fc2-07", "ForcedQuestion" , {s: "Néhány barátom a rádiónál dolgozik, de nincs állandó feladatuk." , q: "Melyik mondat helyesebb?" , as: ["Géza olvasta ma fel a híreket.",  "Géza olvasta a híreket fel ma."  ]}]   ,
//    ["fc2-08", "ForcedQuestion" , {s: "Néhány barátom a rádiónál dolgozik, de nincs állandó feladatuk." , q: "Melyik mondat helyesebb?" , as: ["Géza olvasta a híreket ma fel.",  "Géza olvasta a híreket fel ma."  ]}] ,
//    ["fc2-09", "ForcedQuestion" , {s: "Néhány barátom a rádiónál dolgozik, de nincs állandó feladatuk." , q: "Melyik mondat helyesebb?" , as: ["Géza olvasta fel a híreket ma.",  "Géza olvasta ma a híreket fel."  ]}]   ,
//
//    ["fc2-10", "ForcedQuestion" , {s: "A barátaim mindig befogadnak kóbor állatokat, ma is ez történt." , q: "Melyik mondat helyesebb?" , as: ["János vitte haza a cicákat a pályaudvarról.",  "János vitte a cicákat haza a pályaudvarról."]}]   ,
//    ["fc2-11", "ForcedQuestion" , {s: "A barátaim mindig befogadnak kóbor állatokat, ma is ez történt." , q: "Melyik mondat helyesebb?" , as: ["János vitte haza a cicákat a pályaudvarról.",  "János vitte a cicákat a pályaudvarról haza."]}]   ,
//    ["fc2-12", "ForcedQuestion" , {s: "A barátaim mindig befogadnak kóbor állatokat, ma is ez történt." , q: "Melyik mondat helyesebb?" , as: ["János vitte a cicákat haza a pályaudvarról.",  "János vitte a cicákat a pályaudvarról haza."]}]   ,
//
//    ["fc2-13", "ForcedQuestion" , {s: "A szomszédnak megint vannak macskái, de nem tudom honnan szerezték őket." , q: "Melyik mondat helyesebb?" , as: ["János vitte haza a cicákat a pályaudvarról.",  "János vitte a cicákat haza a pályaudvarról."]}]   ,
//    ["fc2-14", "ForcedQuestion" , {s: "A szomszédnak megint vannak macskái, de nem tudom honnan szerezték őket." , q: "Melyik mondat helyesebb?" , as: ["János vitte haza a cicákat a pályaudvarról.",  "János vitte a cicákat a pályaudvarról haza."]}]   ,
//    ["fc2-15", "ForcedQuestion" , {s: "A szomszédnak megint vannak macskái, de nem tudom honnan szerezték őket." , q: "Melyik mondat helyesebb?" , as: ["János vitte a cicákat haza a pályaudvarról.",  "János vitte a cicákat a pályaudvarról haza."]}]   ,
//
//    ["fc2-16", "ForcedQuestion" , {s: "A hétvégen az emberek sok állatot ott hagytak a pályaudvaron, de nem tudom aztán mi lett velük." , q: "Melyik mondat helyesebb?" , as: ["János vitte haza a cicákat a pályaudvarról.",  "János vitte a cicákat haza a pályaudvarról."]}]   ,
//    ["fc2-17", "ForcedQuestion" , {s: "A hétvégen az emberek sok állatot ott hagytak a pályaudvaron, de nem tudom aztán mi lett velük." , q: "Melyik mondat helyesebb?" , as: ["János vitte haza a cicákat a pályaudvarról.",  "János vitte a cicákat a pályaudvarról haza."]}]   ,
//    ["fc2-18", "ForcedQuestion" , {s: "A hétvégen az emberek sok állatot ott hagytak a pályaudvaron, de nem tudom aztán mi lett velük." , q: "Melyik mondat helyesebb?" , as: ["János vitte a cicákat haza a pályaudvarról.",  "János vitte a cicákat a pályaudvarról haza."]}]   ,
//
//    ["fc2-19", "ForcedQuestion" , {s: "Tudom, hogy Tamás hirtelen híres lett, de nem tudom míert." , q: "Melyik mondat helyesebb?" , as: ["Tamás hívta meg az angol herceget vacsorára.",  "Tamás hívta az angol herceget meg vacsorára."]}]   ,
//    ["fc2-20", "ForcedQuestion" , {s: "Tudom, hogy Tamás hirtelen híres lett, de nem tudom míert." , q: "Melyik mondat helyesebb?" , as: ["Tamás hívta meg az angol herceget vacsorára.",  "Tamás hívta vacsorára meg az angol herceget."]}]   ,
//    ["fc2-21", "ForcedQuestion" , {s: "Tudom, hogy Tamás hirtelen híres lett, de nem tudom míert." , q: "Melyik mondat helyesebb?" , as: ["Tamás hívta vacsorára meg az angol herceget.",  "Tamás hívta az angol herceget meg vacsorára."]}]   ,
//
//    ["fc2-22", "ForcedQuestion" , {s: "Tudom, hogy egy híres ember volt Tamásnál, de nem tudom ki." , q: "Melyik mondat helyesebb?" , as: ["Tamás hívta meg az angol herceget vacsorára.",  "Tamás hívta az angol herceget meg vacsorára."]}]   ,
//    ["fc2-23", "ForcedQuestion" , {s: "Tudom, hogy egy híres ember volt Tamásnál, de nem tudom ki." , q: "Melyik mondat helyesebb?" , as: ["Tamás hívta meg az angol herceget vacsorára.",  "Tamás hívta vacsorára meg az angol herceget."]}]   ,
//    ["fc2-24", "ForcedQuestion" , {s: "Tudom, hogy egy híres ember volt Tamásnál, de nem tudom ki." , q: "Melyik mondat helyesebb?" , as: ["Tamás hívta vacsorára meg az angol herceget.",  "Tamás hívta az angol herceget meg vacsorára."]}]   ,
//
//    ["fc2-25", "ForcedQuestion" , {s: "Tudom, hogy egy híres ember volt Tamásnál, de nem tudom miért." , q: "Melyik mondat helyesebb?" , as: ["Tamás hívta meg az angol herceget vacsorára.",  "Tamás hívta az angol herceget meg vacsorára."]}]   ,
//    ["fc2-26", "ForcedQuestion" , {s: "Tudom, hogy egy híres ember volt Tamásnál, de nem tudom miért." , q: "Melyik mondat helyesebb?" , as: ["Tamás hívta meg az angol herceget vacsorára.",  "Tamás hívta vacsorára meg az angol herceget."]}]   ,
//    ["fc2-27", "ForcedQuestion" , {s: "Tudom, hogy egy híres ember volt Tamásnál, de nem tudom miért." , q: "Melyik mondat helyesebb?" , as: ["Tamás hívta vacsorára meg az angol herceget.",  "Tamás hívta az angol herceget meg vacsorára."]}],
//
//    ["fc1-28", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Felmondtak János és Béla."        , "Felmondott János és Béla."            ]}] ,
//    ["fc1-29", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Felmondtak János és a kollégái.", "Felmondott János és a kollégái."       ]}] ,
//    ["fc1-30", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Felmondtak János és a kollégái.", "Felmondtak a kollégái és János."       ]}] ,
//    ["fc1-31", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Felmondtak János és a kollégái.", "Felmondott a kollégái és János."       ]}] ,
//    ["fc1-32", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Felmondott János és a kollégái.", "Felmondtak a kollégái és János."   ]}]     ,
//    ["fc1-33", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Felmondott János és a kollégái.", "Felmondott a kollégái és János."   ]}]     ,
//    ["fc1-34", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Felmondtak a kollégái és János.", "Felmondott a kollégái és János."   ]}]     ,
//    ["fc1-35", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Elutaztak a nővéremék és a barátjuk.", "Elutazott a nővéremék és a barátjuk."]}]      ,
//    ["fc1-36", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Elutaztak a nővéremék és a barátjuk.", "Elutaztak a barátjuk és a nővéremék."]}]      ,
//    ["fc1-37", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Elutaztak a nővéremék és a barátjuk.", "Elutazott a barátjuk és a nővéremék."]}]        ,
//    ["fc1-38", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Elutazott a nővéremék és a barátjuk.", "Elutaztak a barátjuk és a nővéremék."]}] ,
//    ["fc1-39", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Elutazott a nővéremék és a barátjuk.", "Elutazott a barátjuk és a nővéremék."]}] ,
//    ["fc1-41", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Elutaztak a barátjuk és a nővéremék.", "Elutazott a barátjuk és a nővéremék."]}] ,
//    ["fc1-42", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Meglátogattak János, Béla és a feleségeik.", "Meglátogatott János, Béla és a feleségeik."]}],
//    ["fc1-43", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Meglátogattak János, Béla és a feleségeik.", "Meglátogatott János, Béla és a feleségük."]}],
//    ["fc1-44", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Meglátogattak János, Béla és a feleségeik.", "Meglátogattak, a feleségeik, és János és Béla."]}],
//    ["fc1-45", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Meglátogattak János, Béla és a feleségeik.", "Meglátogatott, a feleségeik, és János, és Béla."]}],
//    ["fc1-46", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Meglátogattak János, Béla és a feleségeik.", "Meglátogatott, a feleségük, és János, és Béla."]}],
//    ["fc1-47", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Meglátogattak János, Béla és a feleségeik.", "Meglátogattak, a feleségük, és János és Béla."]}],
//    ["fc1-48", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Meglátogattak, a feleségeik, és János és Béla", "Meglátogatott, a feleségeik, és János, és Béla."]}],
//    ["fc1-49", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Meglátogattak, a feleségeik, és János és Béla", "Meglátogatott, a feleségük, és János, és Béla."]}],
//    ["fc1-50", "Question" , {q: "Melyik mondat helyesebb?" , as: ["Meglátogattak, a feleségeik, és János és Béla", "Meglátogatott, a feleségük, és János, és Béla."]}]

];
