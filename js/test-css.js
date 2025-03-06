// Изменения выбранных ячеек/кружков 
document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('change', function(event) {
    if (event.target.type === 'radio') {
      const radioButtons = document.querySelectorAll('input[type="radio"][name="' + event.target.name + '"]');
      radioButtons.forEach(radio => {
        const img = radio.nextElementSibling;
        if (img && img.dataset && img.dataset.selectedSrc) {
          img.src = radio.checked ? img.dataset.selectedSrc : "/img/svg/radio-button.svg";
        }
      });

      // Обработка желтого квадрата 
      radioButtons.forEach(radio => {
        const colorBox = radio.nextElementSibling;
        if (colorBox && colorBox.classList.contains('yellow-selected') && !radio.checked) {
          colorBox.classList.remove('yellow-selected');
        }

        if (radio.checked && colorBox && colorBox.style.backgroundColor === 'rgb(253, 255, 25)') { 
          colorBox.classList.add('yellow-selected');
        }
      });

      // Обработка кнопки "Далее"
      const nextButton = document.getElementById('next-button');

      if (nextButton) {
        const anyRadioChecked = Array.from(radioButtons).some(radio => radio.checked);
        if (anyRadioChecked) {
          nextButton.closest('.next-button-style').classList.add('button--active');
        } else {
          nextButton.closest('.next-button-style').classList.remove('button--active');
        }
      }
    }
  });
});