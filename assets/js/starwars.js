$(document).ready(function() {
    var lukeSkywalker = $("#luke");
    var darthMaul = $("#maul");
    var darthVader = $("#vader");
    var obiWan = $("#obi");
    // list of character div boxes that turns into enemys once one is spliced
    var enemyDivBoxList = [darthMaul, obiWan, darthVader, lukeSkywalker];
    var attackButton = $(".attack_button");
    var obiWanObj = {
        name: "Obi Wan",
        hp: 200,
        attack: 28,
        critical: 50
    }
    var darthMaulObj = {
        name: "Darth Maul",
        hp: 200,
        attack: 25,
        critical: 60
    }
    var darthVaderObj = {
        name: "Darth Vader",
        hp: 220,
        attack: 23,
        critical: 50
    }
    var lukeSkywalkerObj = {
        name: "Luke Skywalker",
        hp: 185,
        attack: 30,
        critical: 58
    }
    var allCharacters = [obiWanObj, lukeSkywalkerObj, darthMaulObj, darthVaderObj];
    // assigns the hp property from chracters to display on the div box
    var lukeHp = $("#luke .hp").text("HP: " + lukeSkywalkerObj["hp"]);
    var vaderHp = $("#vader .hp").text("HP: " + darthVaderObj["hp"]);
    var maulHp = $("#maul .hp").text("HP: " + darthMaulObj["hp"]);
    var obiHp = $("#obi .hp").text("HP: " + obiWanObj["hp"]);
    console.log(lukeHp);
    // will be attack and hp retrieved from original objects for your chr and defender chr
    var yourChrAttack;
    var yourChrHp;
    var defenderAttack;
    var defenderHp;
    // attack sequence to the dom
    var attackSequenceDisplaySpan = $(".attack_display");
    // stages of the game
    var stage = 1;
    // your character/defender object
    var yourChrArr = [];
    var enemyDefender = [];
    // your character element to be positioned in the DOM
    var yourChrBox;
    var yourEnemyBox;
    // future crit multiplier holders
    var yourCritAttack;
    var defenderCritAttack;
    // crit booleons
    var youCrit = false;
    var heCrit = false;
    //  variable to determine if defender is already in the defender box
    var defenderBoxAlreadyInUse = false;
    // number of total enemies to start;
    var numEnemies = 3;
    // counts enemies defeated to determine upgrade
    var numEnemiesDefeated = 0;

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
            // this statement determins if yourchrbox is not equal to the name of this chr, if its not, it adds you to the defender box
            // also checks if theres a defender already in the defender box
        } else if (stage === 2 && yourChrBox != lukeSkywalker && defenderBoxAlreadyInUse === false) {
            console.log(allCharacters[lukeSkywalkerObj]);
            $(".critical_message").text("");
            // this long line gets the index of luke no matter where it is and splices it from the array
            enemyDefender = allCharacters.splice(allCharacters.indexOf(lukeSkywalkerObj), 1)[0];
            console.log(enemyDefender);
            // assigns the div box of luke to the enemy box
            yourEnemyBox = lukeSkywalker;
            // removes the defender div box from the enemyDivBoxList so the enemies can be isolated
            enemyDivBoxList.splice(enemyDivBoxList.indexOf(lukeSkywalker), 1);
            stageTwoDefender();
            defenderBoxAlreadyInUse = true;
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
        } else if (stage === 2 && yourChrBox != darthVader && defenderBoxAlreadyInUse === false) {
            $(".critical_message").text("");
            // this long line gets the index of maul no matter where it is and splices it from the array
            enemyDefender = allCharacters.splice(allCharacters.indexOf(darthVaderObj), 1)[0];
            console.log(enemyDefender);
            yourEnemyBox = darthVader;
            // removes the defender div box from the enemyDivBoxList so the enemies can be isolated
            enemyDivBoxList.splice(enemyDivBoxList.indexOf(darthVader), 1);
            stageTwoDefender();
            defenderBoxAlreadyInUse = true;
        }

    });
    darthMaul.on("click", function() {
        if (stage === 1) {
            stage++;
            yourChrArr = allCharacters.splice(2, 1)[0];
            yourChrBox = darthMaul;
            enemyDivBoxList.splice(0, 1);
            console.log(yourChrBox);
            stageOne();
        } else if (stage === 2 && yourChrBox != darthMaul && defenderBoxAlreadyInUse === false) {
            $(".critical_message").text("");
            // this long line gets the index of maul no matter where it is and splices it from the array
            enemyDefender = allCharacters.splice(allCharacters.indexOf(darthMaulObj), 1)[0];
            console.log(enemyDefender);
            yourEnemyBox = darthMaul;
            // removes the defender div box from the enemyDivBoxList so the enemies can be isolated
            enemyDivBoxList.splice(enemyDivBoxList.indexOf(darthMaul), 1);
            stageTwoDefender();
            defenderBoxAlreadyInUse = true;
        }
    });
    obiWan.on("click", function() {
        if (stage === 1) {
            stage++;
            yourChrArr = allCharacters.splice(0, 1)[0];
            yourChrBox = obiWan;
            enemyDivBoxList.splice(1, 1);
            console.log(yourChrBox);
            stageOne();
        } else if (stage === 2 && yourChrBox != obiWan && defenderBoxAlreadyInUse === false) {
            $(".critical_message").text("");
            // this long line gets the index of maul no matter where it is and splices it from the array
            enemyDefender = allCharacters.splice(allCharacters.indexOf(obiWanObj), 1)[0];
            console.log(enemyDefender);
            yourEnemyBox = obiWan;
            // removes the defender div box from the enemyDivBoxList so the enemies can be isolated
            enemyDivBoxList.splice(enemyDivBoxList.indexOf(obiWan), 1);
            stageTwoDefender();
            defenderBoxAlreadyInUse = true;
        }

    });
    // play again button resets game on click
    $(".play_again").on("click", function() {
        location.reload();
    });

    attackButton.on("click", function() {
        // you hit him for, he countered for 
        attackSequence();
    });

    function stageOne() {
        // make your selected chr be at the top of the row so always in the top left corner, then add the css class
        $(".row_one").append(yourChrBox);
        yourChrBox.addClass("your_chr_box");
        $(".pick_chr").text("Your Character");
        $(".pick_enemy").css("display", "block");
        // loops through the enemy div boxes and assigns each one the css class
        for (var i = 0; i < enemyDivBoxList.length; i++) {
            enemyDivBoxList[i].addClass("enemy_boxes");
            enemyDivBoxList[i].appendTo(".row_two");
        }

    }

    function stageTwoDefender() {
        $(".row_three").append(yourEnemyBox);
        $(yourEnemyBox).addClass("defender_style");
        // accesses attack button makes it visable and places it above the defender box
        $(".attack_button").css("display", "block").insertBefore(yourEnemyBox);
        $(".defender_title").css("display", "block").insertAfter(".attack_button");
        hideEnemies();
        // retrieves yourChr/yourEnemy attack/hp from original object and stores it in your chr attack/hp
        yourChrAttack = yourChrArr["attack"];
        yourChrHp = yourChrArr["hp"];
        defenderAttack = enemyDefender["attack"];
        defenderHp = enemyDefender["hp"];
    }

    // main function that runs all the attack scenarios
    function attackSequence() {
        // reset crit message
        $(".critical_message").text("");
        // variable resets everytime and is false by default, for crit chance
        youCrit = false;
        heCrit = false;
        // resets "attack" after every attack so the max is set back to original attack
        defenderAttack = enemyDefender["attack"];
        yourChrAttack = yourChrArr["attack"];
        // gets any min number from 1-10 then max will be characters attack from object
        defenderAttack = getRandomAttackNumber(Math.floor(Math.random() * 10), defenderAttack);
        yourChrAttack = getRandomAttackNumber(Math.floor(Math.random() * 10), yourChrAttack);
        // makes variables and assigns a random number from 1 to 100
        var yourCriticalChance = getRandomAttackNumber(1, 100);
        var enemyCriticalChance = getRandomAttackNumber(1, 100);
        // if variable is above 90 its a crit 
        if (yourCriticalChance >= 50) {
            yourCritMultiplier();
            youCrit = true;
        }
        if (enemyCriticalChance >= 50) {
            enemyCritMultiplier();
            heCrit = true;
        }
        console.log((defenderHp - yourChrAttack), (yourChrHp - defenderAttack));
        defenderHp = defenderHp - yourChrAttack;
        yourChrHp = yourChrHp - defenderAttack;
        // checks if either defender or you crit then displays a crit message if you did
        criticalHitMessages();
        // finds the class hp inside the yourChr/defender div and adds hp update to the dom.
        yourChrBox.find(".hp").text("HP:" + yourChrHp);
        yourEnemyBox.find(".hp").text("HP:" + defenderHp);
        // if yourchr hp <=0 you lose game over else if his is <=0 display none
        if (yourChrHp <= 0) {
            alert("Game Over!");
            gameOver();
            // checks if you or your opponent wins
        } else if (defenderHp <= 0) {
            alert("Enemy down! You feel experienced!");
            $(".critical_message").text("You Beat " + enemyDefender["name"] + "! Pick Your Next Enemy!").css({ "color": "gold", "font-size": "150%" });
            $(".hp_display").text("");
            attackButton.css("display", "none");
            // displays the enemies for selection
            numEnemies--;
            showEnemies();
            if (numEnemies === 0) {
                $(".critical_message").text("Ultimate Champion!").css("font-size", "200%");
                $(".play_again").css("display", "inline-block");
                attackButton.css("display", "none");
                $(".pick_enemy").css("display", "none");
            }
            numEnemiesDefeated++;
            newDefender();
            chrUpgradeAndImageChange();
            defenderBoxAlreadyInUse = false;
        }
    }

    // executes after an opponent is defeated
    function newDefender() {
        attackSequenceDisplaySpan.text("");
        // this is clearing contents of the yourenemybox then changing display to none
        yourEnemyBox.empty().css("display", "none");
        // reset your hp after deafeating opponent
        yourChrBox.find(".hp").text("HP:" + yourChrArr["hp"]);

    }

    // creates random number b/t specified attacks and is inclusive and both min and max
    function getRandomAttackNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // adds the crit amount to your attack
    function yourCritMultiplier() {
        yourCritAttack = Math.round(yourChrAttack * (yourChrArr["critical"] / 100));
        yourChrAttack += yourCritAttack;
    }

    function enemyCritMultiplier() {
        defenderCritAttack = Math.round(defenderAttack * (enemyDefender["critical"] / 100));
        defenderAttack += defenderCritAttack;
    }

    function criticalHitMessages() {
        attackSequenceDisplaySpan.text("You attacked for " + yourChrAttack + "," + " " + enemyDefender["name"] + " countered for " + defenderAttack);
        $(".hp_display_p").text("Your HP:" + yourChrHp);
        $(".hp_display_span").text("Defender HP:" + defenderHp);
        if (youCrit === true) {
            $(".critical_message").text("You got a Critical hit for " + yourCritAttack + "!").css({ "color": "red", "font-size": "130%" });
        }
        if (heCrit === true) {
            $(".critical_message").text("Defender got a Critical hit for " + defenderCritAttack + "!").css({ "color": "red", "font-size": "130%" });
        }
    }

    // function that changes chr photo and upgrades attack after each enemy defeated
    // put images in array, save to variable, save that variable to another variable holding all characters
    function chrUpgradeAndImageChange() {
        if (yourChrBox === lukeSkywalker && numEnemiesDefeated < 2) {
            $(".luke_img").css({ "background-image": "url(assets/images/luke2.jpg" });
            yourChrArr["attack"] = 35;
        } else if (yourChrBox === lukeSkywalker && numEnemiesDefeated === 2) {
            $(".luke_img").css("background-image", "url(assets/images/luke3.jpg)");
            yourChrArr["attack"] = 38;
        }
        if (yourChrBox === darthMaul && numEnemiesDefeated < 2) {
            $(".maul_img").css({ "background-image": "url(assets/images/maul2.jpg" });
            yourChrArr["attack"] = 33;

        } else if (yourChrBox === darthMaul && numEnemiesDefeated === 2) {
            $(".maul_img").css("background-image", "url(assets/images/maul3.jpg)");
            yourChrArr["attack"] = 38;
        }
        if (yourChrBox === darthVader && numEnemiesDefeated < 2) {
            $(".vader_img").css({ "background-image": "url(assets/images/vader2.jpg" });
            yourChrArr["attack"] = 33;

        } else if (yourChrBox === darthVader && numEnemiesDefeated === 2) {
            $(".vader_img").css("background-image", "url(assets/images/vader3.jpg)");
            yourChrArr["attack"] = 38;
        }
        if (yourChrBox === obiWan && numEnemiesDefeated < 2) {
            $(".obi_img").css({ "background-image": "url(assets/images/obi2.jpg" });
            yourChrArr["attack"] = 33;

        } else if (yourChrBox === obiWan && numEnemiesDefeated === 2) {
            $(".obi_img").css("background-image", "url(assets/images/obi3.png)");
            yourChrArr["attack"] = 38;
        }
    }

    function gameOver() {
        attackSequenceDisplaySpan.text("You lose this game! Your HP reached 0 before your opponent.");
        $(".critical_message").text("");
        $(".play_again").css("display", "inline-block");
        $(".attack_button").css("display", "none");
        $(".hp_display").css("display", "none");
    }

    function preGame() {
        // loops through enemy divboxlist and animates them up or down on mouseover/out
        for (var i = 0; i < enemyDivBoxList.length; i++) {
            enemyDivBoxList[i].on("mouseover", function() {
                $(this).find(".attack").css("display", "block");
                $(this).find(".critical").css("display", "block");
            }).on("mouseout", function() {
                $(this).find(".attack").css("display", "none");
                $(this).find(".critical").css("display", "none");
            });
        }
        return lukeHp, vaderHp, maulHp, obiHp;
    }

    function showEnemies() {
        for (var i = 0; i < enemyDivBoxList.length; i++) {
            enemyDivBoxList[i].css("display", "inline-block");
        }
    }

    function hideEnemies() {
        for (var i = 0; i < enemyDivBoxList.length; i++) {
            enemyDivBoxList[i].css("display", "none");
        }
    }
});
