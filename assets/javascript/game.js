var tf = false;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var invertavlID;
var Qnum = 0;
var answered = false;
var correct;
var questions = [
    {
        image: 'assets/images/Deathclaw.png',
        question: "What is the most dangerous animal in the Wasteland?)",
        answers: [
            'Duck',
            'Death Claw',
            'Orc',
            'Horn Face'
    ],
        correct: '1'
    },
    {
        image: 'assets/images/nuka-cola-caps.jpg',
        question: "What is the main form of currency in Fallout 3?)",
        answers: [
            'Bottle Caps',
            'Dollars',
            'Gold',
            'Shoes'
    ],
        correct: '0'
    },
    {
        image: 'assets/images/FEV.png',
        question: "What does F.E.V stand for?",
        answers: [
            'Fortify Every Village',
            'Fallen Extraterrestrial Vanadium',
            'For Every Viperfish',
            'Forced Evolution Virus'
    ],
        correct: '3'
    },
    {
        image: 'assets/images/tunnelsnakes.jpg',
        question: "What is the vault 101 gang called?)",
        answers: [
            'The Cave Rats',
            'The Bad Boyz',
            'The Tunnel Snakes',
            'The Girl Scouts'
    ],
        correct: '2'
    },
    {
        image: 'assets/images/Three_Dog.jpg',
        question: "Who is the DJ of Galaxy News Radio?)",
        answers: [
            'MC Hammer',
            'DJ Fresh',
            'Fontleroy',
            'Three Dog'
],
        correct: '3'
    },
    {
        image: 'assets/images/dogmeat.jpg',
        question: "Who is your canine follower?)",
        answers: [
            'Dogmeat',
            'Doge',
            'Spot',
            'There is none'
    ],
        correct: '0'
    },
    {
        image: 'assets/images/megaton.jpg',
        question: "What is the town with an atom bomb in the middle?)",
        answers: [
            'Megaton',
            'Atomville',
            'Nuke City',
            'Rad Town'
    ],
        correct: '0'
    },
    {
        image: 'assets/images/libertyprime.jpg',
        question: "What does Liberty Prime hate?)",
        answers: [
            'Bagels',
            'Water',
            'Walkmans',
            'Communism'
    ],
        correct: '3'
    },
    {
        image: 'assets/images/synth.jpg',
        question: "Where do Synths come from?)",
        answers: [
            'The Big Empty',
            'Skynet',
            'The Commonwealth',
            'Florida'
    ],
        correct: '2'
    },
    {
        image: 'assets/images/JohnHenryEden.jpg',
        question: "Who is the leader of The Enclave?)",
        answers: [
            'Abraham Lincoln',
            'John Henry Eden',
            'Colonel Autumn',
            'Arcade Gannon'
        ],
        correct: '1'
    },

];

function clear() {
    $("#question").empty();
    $("ans1").empty();
    $("ans2").empty();
    $("ans3").empty();
    $("ans4").empty();
};
var timeleft = 15;
function gameInit() {
    console.log("start");
    $('.start-button').empty();
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    loadGame();
}

function loadGame() {
    answered = false; 
    timeRemaining = 60;
    intervalID = setInterval(timer, 1000);
    if (answered === false) {
        timer();
    }
    correct = questions[Qnum].correct;
    var question = questions[Qnum].question;
    $('.question').html(question);
    for (var i = 0; i < 4; i++) {
        var answer = questions[Qnum].answers[i];
        $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
    }

    $("h4").click(function () {
        var id = $(this).attr('id');
        if (id === correct) {
            answered = true; 
            $('.question').text("THE ANSWER IS: " + questions[Qnum].answers[correct]);
            correctAnswer();
        } else {
            answered = true; 
            $('.question').text("YOU CHOSE: " + questions[Qnum].answers[id] + ".....HOWEVER THE ANSWER IS: " + questions[Qnum].answers[correct]);
            incorrectAnswer();
        }
    });
}

function timer() {
    if (timeleft === 0) {
        answered = true;
        clearInterval(intervalID);
        $('.question').text("THE CORRECT ANSWER IS: " + questions[Qnum].answers[correct]);
        unAnswered();
    } else if (answered === true) {
        clearInterval(intervalID);
    } else {
        timeleft--;
        $('.timeRemaining').text('YOU HAVE ' + timeleft + ' SECONDS');
    }
}

function correctAnswer() {
    correct++;
    $('.timeRemaining').text("CORRECT!").css({
        'color': '#3D414F'
    });
    resetRound();
    timer();
}

function incorrectAnswer() {
    incorrect++;
    $('.timeRemaining').text("INCORRECT!").css({
        'color': '#3D414F'
    });
    resetRound();
    timer();

}

function unAnswered() {
    unanswered++;
    $('.timeRemaining').text("TIME OUT!").css({
        'color': '#3D414F'
    });
    resetRound();
    $('.timeRemaining').empty();
}

function resetRound() {
    $('.answersAll').remove();
    $('.answers').append('<img class=answerImage src="' + questions[Qnum].image + ' ">'); 
    Qnum++;
    if (Qnum < questions.length) {
        setTimeout(function () {
            loadGame();
            $('.answerImage').remove();
        }, 5000); 
    } else {
        setTimeout(function () {
            $('.question').remove();
            $('.timeRemaining').remove();
            $('.answerImage').remove();
            $('.answers').append('<h4 class= answersAll end>CORRECT ANSWERS: ' + correct+ '</h4>');
            $('.answers').append('<h4 class= answersAll end>INCORRECT ANSWERS: ' + incorrect + '</h4>');
            $('.answers').append('<h4 class= answersAll end>UNANSWERED QUESTIONS: ' + unanswered + '</h4>');
            setTimeout(function () {
                location.reload();
            }, 7000);
        }, 5000);
    }
};

$('.startButton').on("click", function () {
    console.log("start");
    gameInit();

});

