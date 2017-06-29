$(document).ready(function() {
    var lukeSkywalker = $("#luke");
    var darthMaul = $("#maul");
    var darthVader = $("#vader");
    var obiWan = $("#obi");
    // list of character div boxes that turns into enemys once one is spliced
    var enemyDivBoxList = [darthMaul, obiWan, darthVader, lukeSkywalker];
    var attackButton = $(".attack_button");
    var obiWanObj = {
        name: "obiwan",
        hp: 150,
        attack: 8
    }
    var darthMaulObj = {
        name: "darthmaul",
        hp: 110,
        attack: 15
    }
    var darthVaderObj = {
        name: "darthvader",
        hp: 250,
        attack: 10
    }
    var lukeSkywalkerObj = {
        name: "obiwan",
        hp: 120,
        attack: 15
    }
    var allCharacters = [obiWanObj, lukeSkywalkerObj, darthMaulObj, darthVaderObj];
    // assigns the hp property from luke to display on the div box
    var lukeHp = $("#luke .hp").text("HP: " + lukeSkywalkerObj["hp"]);
    var vaderHp = $("#vader .hp").text("HP: " + darthVaderObj["hp"]);
    console.log(lukeHp);

    var stage = 1;
    // your character object
    var yourChrArr = [];
    // your character element to be positioned in the DOM
    var yourChrBox;
    var yourEnemyBox;
    preGame();
    lukeSkywalker.on("click", function() {
        if (stage === 1) {
            stage++;
            // splices luke from allCharacters and stores his value in a new array yourchrarr 
            yourChrArr = allCharacters.splice(1, 1)[0];
            // assigning the div box for luke to yourChrBox to use in stageone()
            yourChrBox = lukeSkywalker;
            // removes luke from the enemy div boxes so they can be manipulated independently
            enemyDivBoxList.splice(3, 1);
            console.log(yourChrBox);
            // allCharacters now only has the remaining 3 objects
            stageOne();
        } else if (stage === 2 && yourChrBox != lukeSkywalker) {
            yourEnemyBox = lukeSkywalker;
            stageTwoDefender();
        }
    });
    darthVader.on("click", function() {
        if (stage === 1) {
            stage++;
            yourChrArr = allCharacters.splice(3, 1)[0];
            yourChrBox = darthVader;
            enemyDivBoxList.splice(2, 1);
            console.log(yourChrBox);
            stageOne();
        }

    });
    darthMaul.on("click", function() {
        if (stage === 1) {
            stage++;
            var yourChrArr = allCharacters.splice(2, 1)[0];
            yourChrBox = darthMaul;
            enemyDivBoxList.splice(0, 1);
            console.log(yourChrBox);
            stageOne();
        }
    });
    obiWan.on("click", function() {
        if (stage === 1) {
            stage++;
            var yourChrArr = allCharacters.splice(0, 1)[0];
            yourChrBox = obiWan;
            enemyDivBoxList.splice(1, 1);
            console.log(yourChrBox);
            stageOne();
        }

    });
    attackButton.on("click", function() {
        var yourChrAttack = yourChrArr["attack"];
        console.log(yourChrAttack);
    });


    function stageOne() {
        // make your selected chr be at the top of the row so always in the top left corner, then add the css class
        $(".row_one").prepend(yourChrBox);
        yourChrBox.addClass("your_chr_box");
        // loops through the enemy div boxes and assigns each one the css class
        for (var i = 0; i < enemyDivBoxList.length; i++) {
            enemyDivBoxList[i].addClass("enemy_boxes");
        }

    }

    function stageTwoDefender() {
        $(".row_two").prepend(yourEnemyBox);
        $(yourEnemyBox).addClass("defender_style");
        // accesses attack button makes it visable and places it above the defender box
        $(".attack_button").css("display", "block").insertBefore(yourEnemyBox);
    }

    function preGame() {
        return lukeHp, vaderHp;
    }
});
