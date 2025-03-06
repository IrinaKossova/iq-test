import { questions, currentQuestionIndex, nextButton } from './test-question.js';

let progressFillElement = null;
const totalQuestions = 11;
const totalSteps = 12;
const maxWidth = 260;

// Обновление ширины заполнения
function updateProgressBar(width) {
    if (progressFillElement) {
        progressFillElement.setAttribute('width', width);
    }
}

// Скрытие
function hideProgressBar() {
  const progressBarContainer = document.querySelector('.progress-bar-container');
  if (progressBarContainer) {
    progressBarContainer.style.display = 'none';
  }
}

// Отображение
function showProgressBar() {
    const progressBarContainer = document.querySelector('.progress-bar-container');
    if (progressBarContainer) {
        progressBarContainer.style.display = 'block';
    }
}

// Обработчик события
document.addEventListener('DOMContentLoaded', function () {

    progressFillElement = document.getElementById('progress-fill');
    if (!progressFillElement) {
        console.error("progress-fill element not found!");
        return;
    }

    updateProgressBar(0);

    console.log("Hash:", window.location.hash);

    if (['#test-page', '#loading-results-page'].includes(window.location.hash)) {
        showProgressBar();
    } else {
        hideProgressBar();
    }

    // Проверка nextButton
    if (nextButton) {
        nextButton.addEventListener('click', (event) => {
            event.preventDefault();

            const currentWidth = (currentQuestionIndex + 1) * (maxWidth / totalSteps);
            updateProgressBar(currentWidth);
        });
    } else {
        console.warn("nextButton not found.  Progress bar will not update on click.");
    }

    // Изменение hash в URL
    window.addEventListener('hashchange', function(event) {
      if (['#test-page', '#loading-results-page'].includes(window.location.hash)) {
        showProgressBar();
      } else {
        hideProgressBar();
      }
    });
});