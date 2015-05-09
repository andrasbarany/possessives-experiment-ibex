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

    ["practice", "AcceptabilityJudgment", {s: "Marinak több testvére van.", q: "Ismerem Mari hugát."}],
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
    // 01-16: A for Blocks 1/2, two repetitions of A/dat for Block 3

    [["t-A1-mar-nom-sbj-2", 1], "AcceptabilityJudgment",        {s: "Irodalomórán Petőfit és Arany Jánost olvastak a diákok.", q: "Mari olvasott Petőfi versét."}],
    [["t-A1-mar-nom-sbj-2", 1], "AcceptabilityJudgment",        {s: "Irodalomórán Petőfit és Arany Jánost olvastak a diákok.", q: "Mari olvasott Petőfi versét."}],
    [["t-A1-mar-dat-sbj-2", 1], "AcceptabilityJudgment",        {s: "Irodalomórán Petőfit és Arany Jánost olvastak a diákok.", q: "Mari olvasott Petőfinek versét."}],

    [["t-A1-mar-nom-obj-2", [2, 1]], "AcceptabilityJudgment",   {s: "Irodalomórán Petőfit és Arany Jánost olvastak a diákok.", q: "Mari olvasta Petőfi versét."}],
    [["t-A1-mar-nom-obj-2", [2, 1]], "AcceptabilityJudgment",   {s: "Irodalomórán Petőfit és Arany Jánost olvastak a diákok.", q: "Mari olvasta Petőfi versét."}],
    [["t-A1-mar-dat-obj-2", [2, 1]], "AcceptabilityJudgment",   {s: "Irodalomórán Petőfit és Arany Jánost olvastak a diákok.", q: "Mari olvasta Petőfinek versét."}],

    [["t-A1-mar-dat-sbj-2", [3, 1]], "AcceptabilityJudgment",   {s: "Irodalomórán Petőfit és Arany Jánost olvastak a diákok.", q: "Mari olvasott Petőfinek versét."}],
    [["t-A1-mar-dat-sbj-2", [3, 1]], "AcceptabilityJudgment",   {s: "Irodalomórán Petőfit és Arany Jánost olvastak a diákok.", q: "Mari olvasott Petőfinek versét."}],
    [["t-A1-mar-dat-sbj-2", [3, 1]], "AcceptabilityJudgment",   {s: "Irodalomórán Petőfit és Arany Jánost olvastak a diákok.", q: "Mari olvasott Petőfinek versét."}],

    [["t-A1-mar-dat-obj-2", [4, 1]], "AcceptabilityJudgment",   {s: "Irodalomórán Petőfit és Arany Jánost olvastak a diákok.", q: "Mari olvasta Petőfinek versét."}],
    [["t-A1-mar-dat-obj-2", [4, 1]], "AcceptabilityJudgment",   {s: "Irodalomórán Petőfit és Arany Jánost olvastak a diákok.", q: "Mari olvasta Petőfinek versét."}],
    [["t-A1-mar-dat-obj-2", [4, 1]], "AcceptabilityJudgment",   {s: "Irodalomórán Petőfit és Arany Jánost olvastak a diákok.", q: "Mari olvasta Petőfinek versét."}],

    [["t-A1-pet-nom-sbj-2", [5, 1]], "AcceptabilityJudgment",   {s: "Péterék házában sok családnak van gyereke.",              q: "Péter ismert a szomszéd lányát."}],
    [["t-A1-pet-nom-sbj-2", [5, 1]], "AcceptabilityJudgment",   {s: "Péterék házában sok családnak van gyereke.",              q: "Péter ismert a szomszéd lányát."}],
    [["t-A1-pet-dat-sbj-2", [5, 1]], "AcceptabilityJudgment",   {s: "Péterék házában sok családnak van gyereke.",              q: "Péter ismert a szomszédnak lányát."}],

    [["t-A1-pet-nom-obj-2", [6, 1]], "AcceptabilityJudgment",   {s: "Péterék házában sok családnak van gyereke.",              q: "Péter ismerte a szomszéd lányát."}],
    [["t-A1-pet-nom-obj-2", [6, 1]], "AcceptabilityJudgment",   {s: "Péterék házában sok családnak van gyereke.",              q: "Péter ismerte a szomszéd lányát."}],
    [["t-A1-pet-dat-obj-2", [6, 1]], "AcceptabilityJudgment",   {s: "Péterék házában sok családnak van gyereke.",              q: "Péter ismerte a szomszédnak lányát."}],

    [["t-A1-pet-dat-sbj-2", [7, 1]], "AcceptabilityJudgment",   {s: "Péterék házában sok családnak van gyereke.",              q: "Péter ismert a szomszédnak lányát."}],
    [["t-A1-pet-dat-sbj-2", [7, 1]], "AcceptabilityJudgment",   {s: "Péterék házában sok családnak van gyereke.",              q: "Péter ismert a szomszédnak lányát."}],
    [["t-A1-pet-dat-sbj-2", [7, 1]], "AcceptabilityJudgment",   {s: "Péterék házában sok családnak van gyereke.",              q: "Péter ismert a szomszédnak lányát."}],

    [["t-A1-pet-dat-obj-2", [8, 1]], "AcceptabilityJudgment",   {s: "Péterék házában sok családnak van gyereke.",              q: "Péter ismerte a szomszédnak lányát."}],
    [["t-A1-pet-dat-obj-2", [8, 1]], "AcceptabilityJudgment",   {s: "Péterék házában sok családnak van gyereke.",              q: "Péter ismerte a szomszédnak lányát."}],
    [["t-A1-pet-dat-obj-2", [8, 1]], "AcceptabilityJudgment",   {s: "Péterék házában sok családnak van gyereke.",              q: "Péter ismerte a szomszédnak lányát."}],

    [["t-A1-ada-nom-sbj-2", [9, 1]], "AcceptabilityJudgment",   {s: "Monet-t és Vasarelyt mutatnak be a kiállításon.",         q: "Ádám keresett Monet tájképét."}],
    [["t-A1-ada-nom-sbj-2", [9, 1]], "AcceptabilityJudgment",   {s: "Monet-t és Vasarelyt mutatnak be a kiállításon.",         q: "Ádám keresett Monet tájképét."}],
    [["t-A1-ada-dat-sbj-2", [9, 1]], "AcceptabilityJudgment",   {s: "Monet-t és Vasarelyt mutatnak be a kiállításon.",         q: "Ádám keresett Monetnek tájképét."}],

    [["t-A1-ada-nom-obj-2", [10, 1]], "AcceptabilityJudgment",  {s: "Monet-t és Vasarelyt mutatnak be a kiállításon.",         q: "Ádám kereste Monet tájképét."}],
    [["t-A1-ada-nom-obj-2", [10, 1]], "AcceptabilityJudgment",  {s: "Monet-t és Vasarelyt mutatnak be a kiállításon.",         q: "Ádám kereste Monet tájképét."}],
    [["t-A1-ada-dat-obj-2", [10, 1]], "AcceptabilityJudgment",  {s: "Monet-t és Vasarelyt mutatnak be a kiállításon.",         q: "Ádám kereste Monetnek tájképét."}],

    [["t-A1-ada-dat-sbj-2", [11, 1]], "AcceptabilityJudgment",  {s: "Monet-t és Vasarelyt mutatnak be a kiállításon.",         q: "Ádám keresett Monetnek tájképét."}],
    [["t-A1-ada-dat-sbj-2", [11, 1]], "AcceptabilityJudgment",  {s: "Monet-t és Vasarelyt mutatnak be a kiállításon.",         q: "Ádám keresett Monetnek tájképét."}],
    [["t-A3-ada-dat-sbj-2", [11, 1]], "AcceptabilityJudgment",  {s: "Monet-t és Vasarelyt mutatnak be a kiállításon.",         q: "Ádám keresett Monetnek tájképét."}],

    [["t-A1-ada-dat-obj-2", [12, 1]], "AcceptabilityJudgment",  {s: "Monet-t és Vasarelyt mutatnak be a kiállításon.",         q: "Ádám kereste Monetnek tájképét."}],
    [["t-A1-ada-dat-obj-2", [12, 1]], "AcceptabilityJudgment",  {s: "Monet-t és Vasarelyt mutatnak be a kiállításon.",         q: "Ádám kereste Monetnek tájképét."}],
    [["t-A3-ada-dat-obj-2", [12, 1]], "AcceptabilityJudgment",  {s: "Monet-t és Vasarelyt mutatnak be a kiállításon.",         q: "Ádám kereste Monetnek tájképét."}],

    [["t-A1-jul-nom-sbj-2", [13, 1]], "AcceptabilityJudgment",  {s: "Juli híres írók és zenészek műveit kereste.",             q: "Juli talált az író regényét."}],
    [["t-A1-jul-nom-sbj-2", [13, 1]], "AcceptabilityJudgment",  {s: "Juli híres írók és zenészek műveit kereste.",             q: "Juli talált az író regényét."}],
    [["t-A1-jul-dat-sbj-2", [13, 1]], "AcceptabilityJudgment",  {s: "Juli híres írók és zenészek műveit kereste.",             q: "Juli talált az írónak regényét."}],

    [["t-A1-jul-nom-obj-2", [14, 1]], "AcceptabilityJudgment",  {s: "Juli híres írók és zenészek műveit kereste.",             q: "Juli találta az író regényét."}],
    [["t-A1-jul-nom-obj-2", [14, 1]], "AcceptabilityJudgment",  {s: "Juli híres írók és zenészek műveit kereste.",             q: "Juli találta az író regényét."}],
    [["t-A1-jul-dat-obj-2", [14, 1]], "AcceptabilityJudgment",  {s: "Juli híres írók és zenészek műveit kereste.",             q: "Juli találta az írónak regényét."}],

    [["t-A1-jul-dat-sbj-2", [15, 1]], "AcceptabilityJudgment",  {s: "Juli híres írók és zenészek műveit kereste.",             q: "Juli talált az írónak regényét."}],
    [["t-A1-jul-dat-sbj-2", [15, 1]], "AcceptabilityJudgment",  {s: "Juli híres írók és zenészek műveit kereste.",             q: "Juli talált az írónak regényét."}],
    [["t-A1-jul-dat-sbj-2", [15, 1]], "AcceptabilityJudgment",  {s: "Juli híres írók és zenészek műveit kereste.",             q: "Juli talált az írónak regényét."}],

    [["t-A1-jul-dat-obj-2", [16, 1]], "AcceptabilityJudgment",  {s: "Juli híres írók és zenészek műveit kereste.",             q: "Juli találta az írónak regényét."}],
    [["t-A1-jul-dat-obj-2", [16, 1]], "AcceptabilityJudgment",  {s: "Juli híres írók és zenészek műveit kereste.",             q: "Juli találta az írónak regényét."}],
    [["t-A1-jul-dat-obj-2", [16, 1]], "AcceptabilityJudgment",  {s: "Juli híres írók és zenészek műveit kereste.",             q: "Juli találta az írónak regényét."}],

    // 17-32: Block 1: A2, Block 2: B2, Block 3: two repetitions of A/dat

    [["t-A2-mar-ext-sbj-2", [17, 1]], "AcceptabilityJudgment",  {s: "Irodalomórán Petőfit és Arany Jánost olvastak a diákok.", q: "Mari csak Petőfinek olvasott versét."}],
    [["t-B2-mar-nil-sbj-n", [17, 1]], "AcceptabilityJudgment",  {s: "Petőfi híres költő volt.",                                q: "Mari olvasott néhány versét."}],
    [["t-A1-mar-dat-sbj-2", [17, 1]], "AcceptabilityJudgment",  {s: "Irodalomórán Petőfit és Arany Jánost olvastak a diákok.", q: "Mari olvasott Petőfinek versét."}],

    [["t-A2-mar-ext-obj-2", [18, 1]], "AcceptabilityJudgment",  {s: "Irodalomórán Petőfit és Arany Jánost olvastak a diákok.", q: "Mari csak Petőfinek olvasta versét."}],
    [["t-B2-mar-nil-obj-n", [18, 1]], "AcceptabilityJudgment",  {s: "Petőfi híres költő volt.",                                q: "Mari olvasta néhány versét."}],
    [["t-A1-mar-dat-obj-2", [18, 1]], "AcceptabilityJudgment",  {s: "Irodalomórán Petőfit és Arany Jánost olvastak a diákok.", q: "Mari olvasta Petőfinek versét."}],

    [["t-A2-mar-int-sbj-2", [19, 1]], "AcceptabilityJudgment",  {s: "Irodalomórán Petőfit és Arany Jánost olvastak a diákok.", q: "Mari csak Petőfinek versét olvasott."}],
    [["t-B2-mar-nil-sbj-m", [19, 1]], "AcceptabilityJudgment",  {s: "Petőfi híres költő volt.",                                q: "Mari olvasott minden versét."}],
    [["t-A1-mar-dat-sbj-2", [19, 1]], "AcceptabilityJudgment",  {s: "Irodalomórán Petőfit és Arany Jánost olvastak a diákok.", q: "Mari olvasott Petőfinek versét."}],

    [["t-A2-mar-int-obj-2", [20, 1]], "AcceptabilityJudgment",  {s: "Irodalomórán Petőfit és Arany Jánost olvastak a diákok.", q: "Mari csak Petőfinek versét olvasta."}],
    [["t-B2-mar-nil-obj-m", [20, 1]], "AcceptabilityJudgment",  {s: "Petőfi híres költő volt.",                                q: "Mari olvasta minden versét."}],
    [["t-A1-mar-dat-obj-2", [20, 1]], "AcceptabilityJudgment",  {s: "Irodalomórán Petőfit és Arany Jánost olvastak a diákok.", q: "Mari olvasta Petőfinek versét."}],

    [["t-A2-pet-ext-sbj-2", [21, 1]], "AcceptabilityJudgment",  {s: "Péterék házában sok családnak van gyereke.",              q: "Péter csak a szomszédnak ismert lányát."}],
    [["t-B2-pet-nil-sbj-n", [21, 1]], "AcceptabilityJudgment",  {s: "A szomszédnak több gyereke van.",                         q: "Péter ismert néhány lányát."}],
    [["t-A1-pet-dat-sbj-2", [21, 1]], "AcceptabilityJudgment",  {s: "Péterék házában sok családnak van gyereke.",              q: "Péter ismert a szomszédnak lányát."}],

    [["t-A2-pet-ext-obj-2", [22, 1]], "AcceptabilityJudgment",  {s: "Péterék házában sok családnak van gyereke.",              q: "Péter csak a szomszédnak ismerte lányát."}],
    [["t-B2-pet-nil-obj-n", [22, 1]], "AcceptabilityJudgment",  {s: "A szomszédnak több gyereke van.",                         q: "Péter ismerte néhány lányát."}],
    [["t-A1-pet-dat-obj-2", [22, 1]], "AcceptabilityJudgment",  {s: "Péterék házában sok családnak van gyereke.",              q: "Péter ismerte a szomszédnak lányát."}],

    [["t-A2-pet-int-sbj-2", [23, 1]], "AcceptabilityJudgment",  {s: "Péterék házában sok családnak van gyereke.",              q: "Péter csak a szomszédnak lányát ismert."}],
    [["t-B2-pet-nil-sbj-m", [23, 1]], "AcceptabilityJudgment",  {s: "A szomszédnak több gyereke van.",                         q: "Péter ismert minden lányát."}],
    [["t-A1-pet-dat-sbj-2", [23, 1]], "AcceptabilityJudgment",  {s: "Péterék házában sok családnak van gyereke.",              q: "Péter ismert a szomszédnak lányát."}],

    [["t-A2-pet-int-obj-2", [24, 1]], "AcceptabilityJudgment",  {s: "Péterék házában sok családnak van gyereke.",              q: "Péter csak a szomszédnak lányát ismerte."}],
    [["t-B2-pet-nil-obj-m", [24, 1]], "AcceptabilityJudgment",  {s: "A szomszédnak több gyereke van.",                         q: "Péter ismerte minden lányát."}],
    [["t-A1-pet-dat-obj-2", [24, 1]], "AcceptabilityJudgment",  {s: "Péterék házában sok családnak van gyereke.",              q: "Péter ismerte a szomszédnak lányát."}],

    [["t-A2-ada-ext-sbj-2", [25, 1]], "AcceptabilityJudgment",  {s: "Monet-t és Vasarelyt mutatnak be a kiállításon.",         q: "Ádám csak Monetnek keresett tájképét."}],
    [["t-B2-ada-nil-sbj-n", [25, 1]], "AcceptabilityJudgment",  {s: "Vasarely absztrakt festő volt.",                          q: "Ádám keresett néhány tájképét."}],
    [["t-A1-ada-dat-sbj-2", [25, 1]], "AcceptabilityJudgment",  {s: "Monet-t és Vasarelyt mutatnak be a kiállításon.",         q: "Ádám keresett Monetnek tájképét."}],

    [["t-A2-ada-ext-obj-2", [26, 1]], "AcceptabilityJudgment",  {s: "Monet-t és Vasarelyt mutatnak be a kiállításon.",         q: "Ádám csak Monetnek kereste tájképét."}],
    [["t-B2-ada-nil-obj-n", [26, 1]], "AcceptabilityJudgment",  {s: "Vasarely absztrakt festő volt.",                          q: "Ádám kereste néhány tájképét."}],
    [["t-A1-ada-dat-obj-2", [26, 1]], "AcceptabilityJudgment",  {s: "Monet-t és Vasarelyt mutatnak be a kiállításon.",         q: "Ádám kereste Monetnek tájképét."}],

    [["t-A2-ada-int-sbj-2", [27, 1]], "AcceptabilityJudgment",  {s: "Monet-t és Vasarelyt mutatnak be a kiállításon.",         q: "Ádám csak Monetnek tájképét keresett."}],
    [["t-B2-ada-nil-sbj-m", [27, 1]], "AcceptabilityJudgment",  {s: "Vasarely absztrakt festő volt.",                          q: "Ádám keresett minden tájképét."}],
    [["t-A1-ada-dat-sbj-2", [27, 1]], "AcceptabilityJudgment",  {s: "Monet-t és Vasarelyt mutatnak be a kiállításon.",         q: "Ádám keresett Monetnek tájképét."}],

    [["t-A2-ada-int-obj-2", [28, 1]], "AcceptabilityJudgment",  {s: "Monet-t és Vasarelyt mutatnak be a kiállításon.",         q: "Ádám csak Monetnek tájképét kereste."}],
    [["t-B2-ada-nil-obj-m", [28, 1]], "AcceptabilityJudgment",  {s: "Vasarely absztrakt festő volt.",                          q: "Ádám kereste minden tájképét."}],
    [["t-A1-ada-dat-obj-2", [28, 1]], "AcceptabilityJudgment",  {s: "Monet-t és Vasarelyt mutatnak be a kiállításon.",         q: "Ádám kereste Monetnek tájképét."}],

    [["t-A2-jul-ext-sbj-2", [29, 1]], "AcceptabilityJudgment",  {s: "Juli híres írók és zenészek műveit kereste.",             q: "Juli csak az írónak talált regényét."}],
    [["t-B2-jul-nil-sbj-n", [29, 1]], "AcceptabilityJudgment",  {s: "Szabó Magda híres magyar író volt.",                      q: "Juli talált néhány regényét."}],
    [["t-A1-jul-dat-sbj-2", [29, 1]], "AcceptabilityJudgment",  {s: "Juli híres írók és zenészek műveit kereste.",             q: "Juli talált az írónak regényét."}],

    [["t-A2-jul-ext-obj-2", [30, 1]], "AcceptabilityJudgment",  {s: "Juli híres írók és zenészek műveit kereste.",             q: "Juli csak az írónak találta regényét."}],
    [["t-B2-jul-nil-obj-n", [30, 1]], "AcceptabilityJudgment",  {s: "Szabó Magda híres magyar író volt.",                      q: "Juli találta néhány regényét."}],
    [["t-A1-jul-dat-obj-2", [30, 1]], "AcceptabilityJudgment",  {s: "Juli híres írók és zenészek műveit kereste.",             q: "Juli találta az írónak regényét."}],

    [["t-A2-jul-int-sbj-2", [31, 1]], "AcceptabilityJudgment",  {s: "Juli híres írók és zenészek műveit kereste.",             q: "Juli csak az írónak regényét talált."}],
    [["t-B2-jul-nil-sbj-m", [31, 1]], "AcceptabilityJudgment",  {s: "Szabó Magda híres magyar író volt.",                      q: "Juli talált minden regényét."}],
    [["t-A1-jul-dat-sbj-2", [31, 1]], "AcceptabilityJudgment",  {s: "Juli híres írók és zenészek műveit kereste.",             q: "Juli talált az írónak regényét."}],

    [["t-A2-jul-int-obj-2", [32, 1]], "AcceptabilityJudgment",  {s: "Juli híres írók és zenészek műveit kereste.",             q: "Juli csak az írónak regényét találta."}],
    [["t-B2-jul-nil-obj-m", [32, 1]], "AcceptabilityJudgment",  {s: "Szabó Magda híres magyar író volt.",                      q: "Juli találta minden regényét."}],
    [["t-A1-jul-dat-obj-2", [32, 1]], "AcceptabilityJudgment",  {s: "Juli híres írók és zenészek műveit kereste.",             q: "Juli találta az írónak regényét."}],

    // 32-40: Blocks 1/2: B, Block 3: 8 fillers that don't show up in 1/2

    [["t-B1-mar-nil-sbj-2", [33, 1]], "AcceptabilityJudgment",  {s: "Petőfi híres költő volt.",                                q: "Mari olvasott versét"}],
    [["t-B1-mar-nil-sbj-2", [33, 1]], "AcceptabilityJudgment",  {s: "Petőfi híres költő volt.",                                q: "Mari olvasott versét."}],
    [["tf31", [33, 1]], "AcceptabilityJudgment", {s: "Biztos hallottad a hírt.", q: "Két gyerek ad egy könyvet Marinak."}],

    [["t-B1-mar-nil-obj-2", [34, 1]], "AcceptabilityJudgment",  {s: "Petőfi híres költő volt.",                                q: "Mari olvasta versét."}],
    [["t-B1-mar-nil-obj-2", [34, 1]], "AcceptabilityJudgment",  {s: "Petőfi híres költő volt.",                                q: "Mari olvasta versét."}],
    [["tf32", [34, 1]], "AcceptabilityJudgment", {s: "Biztos hallottad a hírt.", q: "Megállnak a rendőrök a ház melett."}],

    [["t-B1-mar-nil-sbj-2", [35, 1]], "AcceptabilityJudgment",  {s: "A szomszédnak több gyereke van.",                         q: "Péter ismert lányát."}],
    [["t-B1-mar-nil-sbj-2", [35, 1]], "AcceptabilityJudgment",  {s: "A szomszédnak több gyereke van.",                         q: "Péter ismert lányát."}],
    [["tf33", [35, 1]], "AcceptabilityJudgment", {s: "Tíz óra után már tilos zajt csinálni.", q: "A koncertet az együttes befejezte."}],

    [["t-B1-mar-nil-obj-2", [36, 1]], "AcceptabilityJudgment",  {s: "A szomszédnak több gyereke van.",                         q: "Péter ismerte lányát."}],
    [["t-B1-mar-nil-obj-2", [36, 1]], "AcceptabilityJudgment",  {s: "A szomszédnak több gyereke van.",                         q: "Péter ismerte lányát."}],
    [["tf34", [36, 1]], "AcceptabilityJudgment", {s: "Láttad, hogy mi történt?", q: "A rendőr megállank ház."}],

    [["t-B1-pet-nil-sbj-2", [37, 1]], "AcceptabilityJudgment",  {s: "Vasarely absztrakt festő volt.",                          q: "Ádám keresett tájképét."}],
    [["t-B1-pet-nil-sbj-2", [37, 1]], "AcceptabilityJudgment",  {s: "Vasarely absztrakt festő volt.",                          q: "Ádám keresett tájképét."}],
    [["tf35", [37, 1]], "AcceptabilityJudgment", {s: "Láttad, hogy mi történt?", q: "A rendőrök a ház mellett álltak meg."}],

    [["t-B1-pet-nil-obj-2", [38, 1]], "AcceptabilityJudgment",  {s: "Vasarely absztrakt festő volt.",                          q: "Ádám kereste tájképét."}],
    [["t-B1-pet-nil-obj-2", [38, 1]], "AcceptabilityJudgment",  {s: "Vasarely absztrakt festő volt.",                          q: "Ádám kereste tájképét."}],
    [["tf36", [38, 1]], "AcceptabilityJudgment", {s: "Tíz óra után már tilos zajt csinálni.", q: "Az együttes befejez a koncertet."}],

    [["t-B1-pet-nil-sbj-2", [39, 1]], "AcceptabilityJudgment",  {s: "Szabó Magda híres magyar író volt.",                      q: "Juli talált regényét."}],
    [["t-B1-pet-nil-sbj-2", [39, 1]], "AcceptabilityJudgment",  {s: "Szabó Magda híres magyar író volt.",                      q: "Juli talált regényét."}],
    [["tf37", [39, 1]], "AcceptabilityJudgment", {s: "Mi van Ádámmal?", q: "Ádám a megeszi vacsora."}],

    [["t-B1-pet-nil-obj-2", [40, 1]], "AcceptabilityJudgment",  {s: "Szabó Magda híres magyar író volt.",                      q: "Juli találta regényét."}],
    [["t-B1-pet-nil-obj-2", [40, 1]], "AcceptabilityJudgment",  {s: "Szabó Magda híres magyar író volt.",                      q: "Juli találta regényét."}],
    [["tf38", [40, 1]], "AcceptabilityJudgment", {s: "Mi van Ádámmal?", q: "Ádám megeszi a vacsorát."}],

    // 40-48: Blocks 1/2: empty, Block 3: 8 fillers that don't show up in 1/2

    [["sep", [41, 1]], "Separator", {transfer: 0}],
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
    ["f30", "AcceptabilityJudgment", {s: "Ma pörköltet föztem.",                                    q: "Ádám megeszi a vacsorát, az biztos."}],

];


