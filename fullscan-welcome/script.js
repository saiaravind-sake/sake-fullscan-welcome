const people = [
    "Praveen",
    "Rajini Ma'am",
    "Sanjana",
    "Bhargavi",
    "Yoshika",
    "Pravalika",
    "Swetha",
    "Kavitha",
    "Ravali",
    "Thilak",
    "Likith",
    "Sowmya",
    "Mounica",
    "Soni",
    "Ankitha",
    "Rudhrani",
    "Vaishanvi",
    "Aravind",
    "Pawan",
    "Suresh"
];


const quotes = [
    "Great things happen when good people work together. 🌟",

    "You survived another day. That's already an achievement! 😄",

    "Work hard, stay humble and keep smiling. ✨",

    "A little laughter makes every workday better. 😊",

    "Your energy makes the Fullscan family stronger. 💙",

    "Don't stress about the small things. Keep moving forward. 🌱",

    "Success is better when you enjoy the journey. 🚀",

    "Behind every successful team is a group of amazing people. ❤️",

    "Keep learning. Keep growing. Keep smiling. 🌈",

    "Today is a good day to do something great. ☀️"
];


const avatars = [
    "👨🏻‍💼",
    "👩🏻‍💼",
    "👩🏻‍💻",
    "👩🏻‍💼",
    "👩🏻‍💻",
    "👩🏻‍💼",
    "👩🏻‍💻",
    "👩🏻‍💼",
    "👩🏻‍💻",
    "👨🏻‍💼",
    "👨🏻‍💻",
    "👩🏻‍💻",
    "👩🏻‍💼",
    "👩🏻‍💻",
    "👩🏻‍💼",
    "👩🏻‍💻",
    "👩🏻‍💼",
    "👨🏻‍💻",
    "👨🏻‍💼",
    "👨🏻‍💻"
];


const peopleContainer =
    document.getElementById("peopleContainer");

const modal =
    document.getElementById("mathModal");

const closeModal =
    document.getElementById("closeModal");

const answerInput =
    document.getElementById("answerInput");

const submitAnswer =
    document.getElementById("submitAnswer");

const mathQuestion =
    document.getElementById("mathQuestion");

const attemptMessage =
    document.getElementById("attemptMessage");

const successToast =
    document.getElementById("successToast");


let selectedCard = null;

let correctAnswer = null;


/* Create people cards */

people.forEach((person, index) => {

    const card = document.createElement("div");

    card.className = "person-card";

    card.innerHTML = `

        <div class="card-inner">

            <div class="card-front">

                <div class="avatar">
                    ${avatars[index]}
                </div>

                <div class="person-name">
                    ${person}
                </div>

                <div class="click-text">
                    Click to reveal ✨
                </div>

            </div>


            <div class="card-back">

                <div class="quote-icon">
                    💫
                </div>

                <div class="quote">
                    "${quotes[index % quotes.length]}"
                </div>

                <div class="quote-name">
                    — ${person}
                </div>

            </div>

        </div>

    `;


    card.addEventListener("click", () => {

        if (card.classList.contains("flipped")) {
            return;
        }

        selectedCard = card;

        generateMathQuestion();

        modal.classList.add("active");

        answerInput.value = "";

        attemptMessage.textContent = "";

        setTimeout(() => {
            answerInput.focus();
        }, 100);

    });


    peopleContainer.appendChild(card);

});


/* Generate simple addition/subtraction */

function generateMathQuestion() {

    const firstNumber =
        Math.floor(Math.random() * 20) + 1;

    const secondNumber =
        Math.floor(Math.random() * 15) + 1;


    const operators = ["+", "-"];

    const operator =
        operators[
            Math.floor(
                Math.random() * operators.length
            )
        ];


    let questionFirst =
        firstNumber;

    let questionSecond =
        secondNumber;


    /*
        Keep subtraction answers positive.
    */

    if (
        operator === "-" &&
        questionSecond > questionFirst
    ) {

        [questionFirst, questionSecond] =
            [questionSecond, questionFirst];

    }


    if (operator === "+") {

        correctAnswer =
            questionFirst + questionSecond;

    } else {

        correctAnswer =
            questionFirst - questionSecond;

    }


    mathQuestion.textContent =
        `${questionFirst} ${operator} ${questionSecond} = ?`;

}


/* Check answer */

function checkAnswer() {

    const userAnswer =
        Number(answerInput.value);


    if (answerInput.value.trim() === "") {

        attemptMessage.textContent =
            "Please enter an answer 😊";

        attemptMessage.style.color =
            "#e39a42";

        return;
    }


    if (userAnswer === correctAnswer) {

        attemptMessage.textContent =
            "Correct! 🎉";

        attemptMessage.style.color =
            "#43a982";


        setTimeout(() => {

            modal.classList.remove("active");

            if (selectedCard) {

                selectedCard.classList.add("flipped");

            }

            showSuccessToast();

        }, 600);


    } else {

        attemptMessage.textContent =
            "Lekalu kuda rava miku? 😂";

        attemptMessage.style.color =
            "#e46d6d";

        answerInput.select();

    }

}


/* Button */

submitAnswer.addEventListener(
    "click",
    checkAnswer
);


/* Enter key */

answerInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            checkAnswer();

        }

    }
);


/* Close modal */

closeModal.addEventListener(
    "click",
    function() {

        modal.classList.remove("active");

    }
);


/* Close modal by clicking outside */

modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {

            modal.classList.remove("active");

        }

    }
);


/* Success toast */

function showSuccessToast() {

    successToast.classList.add("show");


    setTimeout(() => {

        successToast.classList.remove("show");

    }, 3500);

}