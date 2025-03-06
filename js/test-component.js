//  Для ответа-текста 
export function createTextAnswerComponent(answers, name) {
  let html = '<form class="answer-options">';
  answers.forEach(answer => {
    html += `
      <label class="box-image answer-option">
        <input type="radio" name="${name}" value="${answer.value}">
        <img src="/img/svg/radio-button.svg" data-selected-src="/img/svg/radio-button-selected.svg" alt="radio button">
        <p class="answer-text">${answer.text}</p>
      </label>
    `;
  });
  html += '</form>';
  return html;
}

//  Для ответов-цветов в виде радиокнопок с цветными квадратами
export function createColorAnswerComponent(answers, name) {
  let html = '<div class="color-answer-wrapper"><form class="answer-options">';
  answers.forEach(answer => {
    html += `
      <label class="color-option">
        <input type="radio" name="${name}" value="${answer.value}">
        <span class="color-box" style="background-color: ${answer.color};"></span>
      </label>
    `;
  });
  html += '</form></div>';
  console.log("HTML from createTextAnswerComponent:", html);
  return html;
}

// Для ответов-чисел в виде радиокнопок с числами в квадратах
export function createNumberSquareAnswerComponent(answers, name) {
  let html = '<form class="answer-options number-square-options">';
  answers.forEach(answer => {
    html += `
      <label class="number-square-option">
        <input type="radio" name="${name}" value="${answer.value}">
        <span class="number-square">${answer.text}</span>
      </label>
    `;
  });
  html += '</form>';
  return html;
}