const cvs = document.getElementById("Ludo");
const ctx = cvs.getContext("2d");

let box = 50;
let number = 0;
let chancePlayer1 = true;
let chancePlayer2 = false;
let rollDice = false;
let ScoreA = 0;
let ScoreB = 0;


//Filling the Boxes 
let Places = [];

for (let i = 0; i < 14; i++) {
    Places[i] = {
        x: i * box,
        y: 0,
        color: null,
    }
}
for (let i = 14; i < 27; i++) {
    Places[i] = {
        x: 13 * box,
        y: (i - 13) * box,
        color: null,
    }
}

let j = 12;
for (let i = 27; i < 40; i++) {
    Places[i] = {
        x: j * box,
        y: 13 * box,
        color: null,
    }
    j--;
}

j = 12;
for (let i = 40; i < 54; i++) {
    Places[i] = {
        x: 0,
        y: j * box,
        color: null,
    }
    j--;
}

//Initializing Locations 
Places[53] = {
    x: 0,
    y: 0,
    color: "red",
}
Places[52] = {
    x: 0,
    y: 1 * box,
    color: "#F38168",
}
Places[26] = {
    x: 13 * box,
    y: 13 * box,
    color: "blue",
}
Places[25] = {
    x: 13 * box,
    y: 12 * box,
    color: "#78C9F5",
}




//Rolling the dice
function roll() {
    console.log("Clicked");
    number = Math.floor(Math.random() * 6 + 1);
    console.log(number);
    let ChanceName = null;
    if (rollDice == false) {
        if (chancePlayer1) {
            ChanceName = "Player1 Turn-> Move ";
        }
        else ChanceName = "PLayer2 Turn-> Move ";
        document.getElementById("displayRandom").value = ChanceName + number;
    }

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
        x: 13 * box,
        y: 13 * box,
        color: insert,
        id: 26,
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
            if (index > 53) index = 1;
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
            if (index > 53) index = 1;
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
            if (index > 53) index = 1;
            Player2[0].x = Places[index].x;
            Player2[0].y = Places[index].y;
            Player2[0].id = index;

        }

        chancePLayer2 = false;
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
            if (index > 53) index = 1;
            Player2[1].x = Places[index].x;
            Player2[1].y = Places[index].y;
            Player2[1].id = index;
        }
        chancePLayer2 = false;
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
                if (Player1[i].x == Player2[j].x && Player1[i].y == Player2[j].y) {
                    Player2[j] =
                    {
                        x: 13 * box,
                        y: 13 * box,
                        color: "purple",
                        id: 26,
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
                    Player1[j] =
                    {
                        x: 0,
                        y: 0,
                        color: "green",
                        id: 0,
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

//Checking Score
function EndConditionCheck() {
    if (Player1[0].x == Places[52].x && Player1[0].y == Places[52].y) {
        document.getElementById("move1A").disabled = true;
        ScoreA++;
    }
    if (Player1[1].x == Places[52].x && Player1[1].y == Places[52].y) {
        document.getElementById("move1B").disabled = true;
        ScoreA++;
    }
    if (Player2[0].x == Places[25].x && Player2[0].y == Places[25].y) {
        document.getElementById("move2A").disabled = true;
        ScoreB++;
    }
    if (Player2[1].x == Places[25].x && Player2[1].y == Places[25].y) {
        document.getElementById("move2B").disabled = true;
        ScoreB++;
    }

}

//Display Result Condition
function winner(name) {
    alert(name + " wins the game");
}

function draw() {
    ctx.fillStyle = "#def2f1";
    ctx.fillRect(0, 0, 800, 800);

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