import { createTextAnswerComponent, createColorAnswerComponent, createNumberSquareAnswerComponent } from './test-component.js';
console.log("test-question.js loaded");

export let questions = [];
export let currentQuestionIndex = 0;
export let nextButton; 

// Загрузка вопросов из JSON файла
async function loadQuestions() {
  try {
    const response = await fetch('data/questions.json');
    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error('Error loading questions:', error);
    return [];
  }
}

// Создание HTML для заголовка вопроса
function createQuestionHTML(questionData) {
  const questionHTML = `<h2 class="question-text">${questionData.questionText}</h2>`;
  return questionHTML;
}

// Отображение вопроса и вариантов ответа 
function renderQuestion(questionData, questionNumber) {
  const questionContainer = document.querySelector('.question-container');
  const answerContainer = document.querySelector('.answer-container');

  answerContainer.innerHTML = '';
  questionContainer.querySelector('.question-text').innerHTML = questionData.questionText;

  let answerComponentHTML = '';

  switch (questionData.answerType) {
    case 'text':
      answerComponentHTML = createTextAnswerComponent(questionData.answers, `question${questionNumber}`);
      break;
    case 'colors':
      answerComponentHTML = createColorAnswerComponent(questionData.answers, `question${questionNumber}`);
      break;
    case 'number_squares':
      answerComponentHTML = createNumberSquareAnswerComponent(questionData.answers, `question${questionNumber}`);
      break;
    default:
      console.warn('Unknown answer type:', questionData.answerType);
  }

  answerContainer.innerHTML = answerComponentHTML;
}

// Отображение текущего вопроса при инициализации и при переходе к следующему вопросу
function displayCurrentQuestion() {
  // Сброс класса button--active у кнопки "Далее"
  const nextButton = document.getElementById('next-button');
  if (nextButton) {
    nextButton.closest('.next-button-style').classList.remove('button--active');
  }

  if (currentQuestionIndex < questions.length) {
    renderQuestion(questions[currentQuestionIndex], currentQuestionIndex + 1);
  } else {
    finishTest();
  }
}

// Инициализация приложения: загрузка вопросов и отображение первого вопроса
async function initialize() {
  questions = await loadQuestions();
  displayCurrentQuestion();
}

// Initialize и обработчик событий только после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  nextButton = document.getElementById('next-button');
  if (nextButton) { 
    nextButton.addEventListener('click', (event) => {
      event.preventDefault();

      // GET текущий вопрос
      const currentQuestion = questions[currentQuestionIndex];
      const questionNumber = currentQuestionIndex + 1;

      let selectedAnswer = null;

      // Определение типа ответа 
      switch (currentQuestion.answerType) {
        case 'text':
        case 'colors':
        case 'number_squares':
          selectedAnswer = document.querySelector(`input[name="question${questionNumber}"]:checked`);
          break;
        default:
          console.warn('Unknown answer type:', currentQuestion.answerType);
      }

      const errorMessageElement = document.getElementById('error-message');

      // Проверка на выбор ответа
      if (!selectedAnswer) {
        errorMessageElement.textContent = 'Пожалуйста, выберите ответ.';
        errorMessageElement.style.display = 'block';
        return;
      }

      errorMessageElement.style.display = 'none';
      errorMessageElement.textContent = '';

      // Увеличение индекса текущего вопроса
      currentQuestionIndex++;
      // Отображение следующего вопроса
      displayCurrentQuestion();
    });
  } else {
    console.warn("nextButton not found!");
  }
  initialize();
});

// Завершение теста
function finishTest() {
  document.getElementById('test-page').style.display = 'none';
  document.getElementById('loading-results-page').style.display = 'block';
  setTimeout(function() {
    document.getElementById('loading-results-page').style.display = 'none';
    window.location.hash = 'results-page';
  }, 5000);
}