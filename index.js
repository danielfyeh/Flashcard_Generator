var inquirer = require("inquirer");
var fs = require("fs");


function BasicCard(front, back) {
    this.front = front;
    this.back = back;

}

function ClozeCard(text, cloze) {
    this.text = text;
    this.cloze = cloze;

}

ClozeCard.prototype.clozeDeleted = function() {
    return this.cloze;
};
ClozeCard.prototype.partialText = function() {
    var partial = "... " + this.text;
    return partial;
};
ClozeCard.prototype.fullText = function() {
    var combinedText = this.cloze + " " + this.text;
    return combinedText;
};

function selectCard() {
    inquirer.prompt([{
        name: "card",
        type: "input",
        message: "What type of card would you like to create? basic or cloze?"
    }]).then(function(answer) {
        if (answer.card === "basic") {
            createBasicCard();
        } else if (answer.card === "cloze") {
            createClozeCard();
        } else {
            console.log("Improper input. Please retry")
            selectCard();
        }
    });
}

function createBasicCard() {
    inquirer.prompt([{
        name: "front",
        type: "input",
        message: "Input the front of the card"
    }, {
        name: "back",
        type: "input",
        message: "Input the back of the card"
    }]).then(function(answer) {

        var newBasicCard = new BasicCard(answer.front, answer.back);
        console.log("front: " + newBasicCard.front);
        console.log("back: " + newBasicCard.back);
        fs.appendFile("log.txt", newBasicCard, function(err) {

        });
        selectCard();
    });
}

function createClozeCard() {
    inquirer.prompt([{
        name: "cloze",
        type: "input",
        message: "Please input the Cloze of the statement "
    }, {
        name: "text",
        type: "input",
        message: "Please input the Text text of the statement"
    }]).then(function(answer) {

        var newClozeCard = new ClozeCard(answer.text, answer.cloze);

        console.log(newClozeCard.fullText());
        fs.appendFile('log.txt', newClozeCard.fullText(), encoding = 'utf8', function(err) {
            if (err) throw err;
        });

        selectCard();
    });
}



selectCard();
