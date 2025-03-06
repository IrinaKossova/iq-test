document.addEventListener('DOMContentLoaded', function() {
  const headerImage = document.querySelector('.header__image-wrapper');
  const headerTitle = document.querySelector('.header__title--shared:not(.header__title-result)'); 
  const headerResultTitle = document.querySelector('.header__title-result');

  function updateHeaderVisibility() {
    const currentHash = window.location.hash;

    // Скрыть текст/изображение по умолчанию
    headerImage.style.display = 'none';
    headerTitle.style.display = 'none';
    headerResultTitle.style.display = 'none';

    // Логика открытия элементов
    if (currentHash === '#test-page' || currentHash === '#loading-page') {
      headerImage.style.display = 'block'; 
      headerTitle.style.display = 'block';
    } else if (currentHash === '#results-page') {
      headerImage.style.display = 'block';
        headerResultTitle.style.display = 'block';
    }
  }

  // Вызов функции при загрузке страницы/ изменении хеша
  updateHeaderVisibility();
  window.addEventListener('hashchange', updateHeaderVisibility);
});