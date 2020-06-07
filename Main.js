const cvs = document.getElementById("Ludo");
const ctx = cvs.getContext("2d");

let box = 60;
let number = 0;
let chancePlayer1 = true;
let chancePlayer2 = false;
let rollDice = false;
let ScoreA = 0;
let ScoreB = 0;


//Filling the Boxes 
let Places = [];

for (let i = 0; i < 10; i++) {
    Places[i] = {
        x: i * box,
        y: 0,
        color: null,
    }
}
for (let i = 10; i < 20; i++) {
    Places[i] = {
        x: 9 * box,
        y: (i - 9) * box,
        color: null,
    }
}

let j = 9;
for (let i = 20; i < 30; i++) {
    Places[i] = {
        x: j * box,
        y: 9 * box,
        color: null,
    }
    j--;
}

j = 9;
for (let i = 30; i < 40; i++) {
    Places[i] = {
        x: 0,
        y: j * box,
        color: null,
    }
    j--;
}

//Initializing Locations 
Places[39] = {
    x: 0,
    y: 0,
    color: "red",
}
Places[38] = {
    x: 0,
    y: 1 * box,
    color: "#F38168",
}
Places[19] = {
    x: 9 * box,
    y: 9 * box,
    color: "blue",
}
Places[18] = {
    x: 9 * box,
    y: 8 * box,
    color: "#78C9F5",
}




//Rolling the dice
function roll() {
    console.log("Clicked");
    number = Math.floor(Math.random() * 6 + 1);

    let desiredRoll = document.getElementById("choiceRoll").value;
    if (desiredRoll >= 1 && desiredRoll <= 6) number = +desiredRoll;
    console.log(number);
    let ChanceName = null;
    if (chancePlayer1) {
        ChanceName = "P1 ->  ";
    }
    else ChanceName = "P2 -> ";
    document.getElementById("displayRandom").value = ChanceName + number;
    document.getElementById("choiceRoll").value = "";
    rollDice = true;

}

let insert = null;
//Initializing the Players
let Player1 = [];
for (let i = 0; i < 2; i++) {
    if (i == 0) insert = "rgb(233, 38, 38)";
    else insert = "rgb(230, 98, 98)";

    Player1[i] = {
        x: 0,
        y: 0,
        color: insert,
        id: 0,
        playable: false,
    }
}

let Player2 = [];
for (let i = 0; i < 2; i++) {
    if (i == 0) insert = "rgb(36, 33, 224)";
    else insert = "rgb(106, 108, 216)";
    Player2[i] =
    {
        x: 9 * box,
        y: 9 * box,
        color: insert,
        id: 19,
        playable: false,
    }
}

//Function for moving

function move1A() {
    if (chancePlayer1 && rollDice) {
        if (number == 6) {
            Player1[0].playable = true;
        }
        if (Player1[0].playable) {
            let index = Player1[0].id + number;
            if (index > 39) index = 1;
            Player1[0].x = Places[index].x;
            Player1[0].y = Places[index].y;
            Player1[0].id = index;
        }


        chancePlayer1 = false;
        rollDice = false;
        chancePlayer2 = true;
    }
    else console.log("Player2 chance");

}
function move1B() {
    if (chancePlayer1 && rollDice) {

        if (number == 6) {
            Player1[1].playable = true;
        }
        if (Player1[1].playable) {
            let index = Player1[1].id + number;
            if (index > 39) index = 1;
            Player1[1].x = Places[index].x;
            Player1[1].y = Places[index].y;
            Player1[1].id = index;
        }

        chancePlayer1 = false;
        rollDice = false;
        chancePlayer2 = true;
    }
    else console.log("Player2 chance");

}
function move2A() {
    if (chancePlayer2 && rollDice) {

        if (number == 6) {
            Player2[0].playable = true;
        }
        if (Player2[0].playable) {
            let index = Player2[0].id + number;
            if (index > 39) index = 1;
            Player2[0].x = Places[index].x;
            Player2[0].y = Places[index].y;
            Player2[0].id = index;
        }

        chancePlayer2 = false;
        rollDice = false;
        chancePlayer1 = true;
    }
    else console.log("Player1 chance");

}
function move2B() {
    if (chancePlayer2 && rollDice) {

        if (number == 6) {
            Player2[1].playable = true;
        }
        if (Player2[1].playable) {
            let index = Player2[1].id + number;
            if (index > 39) index = 1;
            Player2[1].x = Places[index].x;
            Player2[1].y = Places[index].y;
            Player2[1].id = index;
        }

        chancePlayer2 = false;
        rollDice = false;
        chancePlayer1 = true;
    }
    else console.log("PLayer1 chance");

}

//Checking Collsion with Player 1
function collsionPlayer() {
    let result = false;
    if (chancePlayer2) {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                if (j == 0) insert = "rgb(36, 33, 224)";
                else insert = "rgb(106, 108, 216)";
                if (Player1[i].x == Player2[j].x && Player1[i].y == Player2[j].y) {
                    Player2[j] =
                    {
                        x: 9 * box,
                        y: 9 * box,
                        color: insert,
                        id: 19,
                        playable: true,
                    }
                    result = true;
                }
            }
        }
    }
    else {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                if (Player1[i].x == Player2[j].x && Player1[i].y == Player2[j].y) {
                    if (j == 0) insert = "rgb(233, 38, 38)";
                    else insert = "rgb(230, 98, 98)";
                    Player1[j] =
                    {
                        x: 0,
                        y: 0,
                        color: insert,
                        id: 0,
                        playable: true,
                    }
                    result = true;
                }
            }
        }
    }
    return result;
}

function display() {
    console.log("Collision Detected");
}

function displayScore() {
    document.getElementById("scoreP1").innerHTML = "SCORE PLAYER A = " + ScoreA;
    document.getElementById("scoreP2").innerHTML = "SCORE PLAYER B = " + ScoreB;
}
displayScore();

//Checking Score
function EndConditionCheck() {
    if (Player1[0].x == Places[38].x && Player1[0].y == Places[38].y) {
        document.getElementById("move1A").disabled = true;
        ScoreA++;
        displayScore();
    }
    if (Player1[1].x == Places[38].x && Player1[1].y == Places[38].y) {
        document.getElementById("move1B").disabled = true;
        ScoreA++;
        displayScore();
    }
    if (Player2[0].x == Places[18].x && Player2[0].y == Places[18].y) {
        document.getElementById("move2A").disabled = true;
        ScoreB++;
        displayScore();
    }
    if (Player2[1].x == Places[18].x && Player2[1].y == Places[18].y) {
        document.getElementById("move2B").disabled = true;
        ScoreB++;
        displayScore();
    }

}




//Display Result Condition
function winner(name) {
    alert(name + " wins the game");
}

function draw() {
    ctx.fillStyle = "#def2f1";
    ctx.fillRect(0, 0, 600, 600);
    for (let i = 0; i < Places.length; i++) {

        if (Places[i].color !== null) { ctx.fillStyle = Places[i].color; }
        else { ctx.fillStyle = "#3aafa9"; }

        ctx.fillRect(Places[i].x, Places[i].y, box, box);

        ctx.strokeStyle = "#def2f1";
        ctx.strokeRect(Places[i].x, Places[i].y, box, box);
    }

    //Displaying the Players
    for (let i = 0; i < 2; i++) {
        ctx.fillStyle = Player1[i].color;
        ctx.fillRect(Player1[i].x, Player1[i].y, box, box);

        ctx.fillStyle = Player2[i].color;
        ctx.fillRect(Player2[i].x, Player2[i].y, box, box);

    }

    ctx.font = "25px Arial";
    ctx.fillText("After Each Roll Click on Respective Player", 60, 200);

    if (collsionPlayer()) {
        display();
    }

    EndConditionCheck();
    //Checking Scores
    if (ScoreA == 2 || ScoreB == 2) {
        if (ScoreA == 2) winner("Player1")
        else winner("Player2")

        clearInterval(game);
    }


}

let game = setInterval(draw, 5);