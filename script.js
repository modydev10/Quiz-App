
let qNa = [
    {
        // 1
        'question': `Who has won the ballon d'Or in 2011?`,
        'option-1': 'Lionel Messi',
        'option-2': 'Cristiano Ronaldo',
        'option-3': 'Andres Iniesta',
        'option-4': 'Neymar',
        true: 'option-1'
    },
    {
        // 2
        'question': `Which club hasn't won the triple before?`,
        'option-1': 'Barcelona',
        'option-2': 'Real Madrid',
        'option-3': 'Manchester City',
        'option-4': 'Inter Milan',
        true: 'option-2'
    },
    {
        // 3
        'question': `Who scored a hat trick in the 2022 World Cup final?`,
        'option-1': 'Robert Lewandowki',
        'option-2': 'Luis Suarez',
        'option-3': 'Lionel Messi',
        'option-4': 'Kylian Mpabbe',
        true: 'option-4'
    },
    {
        // 4
        'question': `Which country has won the most World Cups?`,
        'option-1': 'Itali',
        'option-2': 'Brazil',
        'option-3': 'Argentina',
        'option-4': 'France',
        true: 'option-2'
    },
    {
        // 5
        'question': `Who has won the Champions League in 2009`,
        'option-1': 'AC Milan',
        'option-2': 'Manchester United',
        'option-3': 'Barcelona',
        'option-4': 'Inter Milan',
        true: 'option-3'
    },
    {
        // 6
        'question': `Who is the Champions League all time top scorer?`,
        'option-1': 'Lionel Messi',
        'option-2': 'Cristiano Ronaldo',
        'option-3': 'Robert Lewandowki',
        'option-4': 'Luis Suarez',
        true: 'option-2'
    },
    {
        // 7
        'question': `Who is "elclasico" all time top scorer?`,
        'option-1': 'Lionel Messi',
        'option-2': 'Cristiano Ronaldo',
        'option-3': 'Luis Suarez',
        'option-4': 'Karim Benzema',
        true: 'option-1'
    },
    {
        // 8
        'question': `Who has won the european golden boot in 2016?`,
        'option-1': 'Cristiano Ronaldo',
        'option-2': 'Karim Benzema',
        'option-3': 'Luis Suarez',
        'option-4': 'Neymar',
        true: 'option-3'
    },
    {
        // 9
        'question': `World Cup 2018 top scorer?`,
        'option-1': 'James Rodríguez',
        'option-2': 'Harry Kane',
        'option-3': 'Kylian Mpabbe',
        'option-4': 'Thomas Muller',
        true: 'option-2'
    },
    {
        // 10
        'question': `Premier League 2021/22 player of the season?`,
        'option-1': 'Mohammed Salah',
        'option-2': 'Rúben Dias',
        'option-3': 'Kevin De Bruyne',
        'option-4': "N'Golo Kanté",
        true: 'option-3'
    },
]


let questionsNumber = qNa.length;
let totalQuestions = document.getElementById('total-questions');

totalQuestions.textContent = questionsNumber;

let counter = 0;
let score = 0;
let question = document.querySelector('.question');
let answer1 = document.querySelector('[for="option-1"]');
let answer2 = document.querySelector('[for="option-2"]');
let answer3 = document.querySelector('[for="option-3"]');
let answer4 = document.querySelector('[for="option-4"]');


function changeQuestion() {
    question.textContent = qNa[counter].question;
    [answer1, answer2, answer3, answer4].forEach(answer => {
        answer.textContent = qNa[counter][answer.getAttribute('for')];
    })
    labels.forEach(ele => ele.classList.remove('correct', 'wrong'));
    currentQuestion.textContent = counter + 1;
}

document.addEventListener('DOMContentLoaded', function(e) {
    changeQuestion();
})

let currentQuestion = document.getElementById('current-question');

let labels = document.querySelectorAll('label');


function selectedClass(e) {
    labels.forEach(element => {
        if (element == e.target) {
            element.classList.toggle('selected');
        } else {
            element.classList.remove('selected');
        }
    })
}

labels.forEach(item => item.addEventListener('click', selectedClass));



let endDialog = document.getElementById('end-dialog');
let totalCorrectAnswers = document.getElementById('total-correct-answers')
let tryAgainBtn = document.querySelector('.try-again-btn');

tryAgainBtn.addEventListener('click', function() {
    endDialog.style.display = 'none';
    counter = 0;
    score = 0;
    changeQuestion();
    
    labels.forEach(item => item.classList.remove('selected'));
    labels.forEach(item => item.addEventListener('click', selectedClass));
    nextButton.addEventListener('click', handleNext);
})

function quizEnd() {
    nextButton.removeEventListener('click', handleNext);
    labels.forEach(element => element.removeEventListener('click', selectedClass));
    endDialog.style.display = 'inline';
    totalCorrectAnswers.textContent = `${score}/${questionsNumber}`
}


let nextButton = document.getElementById('next-question-btn');

function handleNext() {
    
    if (counter == questionsNumber - 1) {
        // console.log('well done')
    }

    
    let selected = document.querySelector('.selected');
    if (selected == null) {

        console.log('selecte something');
        nextButton.textContent = 'select an option!';
        setTimeout(function() {
            nextButton.textContent = 'next';
        }, 2000)

    } else {

        let correctAnswer = qNa[counter].true;

        if (selected.getAttribute('for') == correctAnswer) {
            score++;
            selected.classList.add('correct');
            if (counter == questionsNumber - 1) {
                quizEnd();
                return '';
            }

            setTimeout(function() {
                selected.classList.remove('correct');
                labels.forEach(item => item.classList.remove('selected'));
                // if (counter == questionsNumber - 1) {
                    //     Swal.fire("it's over")
                    // }
                counter++;
                changeQuestion();
            }, 500);
        } else {
            document.querySelector(`[for=${correctAnswer}]`).classList.add('correct');
            selected.classList.add('wrong');

            if (counter == questionsNumber - 1) {
                quizEnd();
                return '';
            }
            
            setTimeout(function() {
                document.querySelector(`[for=${correctAnswer}]`).classList.remove('correct');
                labels.forEach(item => item.classList.remove('selected', 'wrong'));
                counter++;
                changeQuestion();
            }, 500)
        }
    }
}

nextButton.addEventListener('click', handleNext);