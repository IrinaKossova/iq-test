// Константы для ID секций
const landingPageId = "landing-page";
const menuPageId = "menu-page";
const infoPageId = "info-page";
const testPageId = "test-page";
const loadingPageId = "loading-page";
const resultsPageId = "results-page";

// Скрытие секций
function showSection(sectionId) {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.style.display = "none";
  });

  // Отображение секций
  const sectionToShow = document.getElementById(sectionId);
  if (sectionToShow) {
    sectionToShow.style.display = "flex";
  } else {
    console.warn(`Секция с ID "${sectionId}" не найдена.`);
  }
}

function showMenuOverlay() {
  const overlay = document.getElementById("menu-overlay");
  if (overlay) {
    overlay.classList.remove("overlay--hidden"); // Класс, чтобы показать
  }
}

function hideMenuOverlay() {
  const overlay = document.getElementById("menu-overlay");
  if (overlay) {
    overlay.classList.add("overlay--hidden"); // Класс, чтобы скрыть
  }
}

// Изменения хеша в URL
function handleHashChange() {
  const hash = window.location.hash.substring(1);

  switch (hash) {
    case landingPageId:
      hideMenuOverlay();
      showSection(landingPageId);
      break;
    case menuPageId:
      showMenuOverlay(); 
      showSection(menuPageId);
      break;
    case infoPageId:
      hideMenuOverlay();
      showSection(infoPageId);
      break;
    case testPageId:
      hideMenuOverlay();
      showSection(testPageId);
      break;
    case loadingPageId:
      hideMenuOverlay();
      showSection(loadingPageId);
      break;
    case resultsPageId:
      hideMenuOverlay();
      showSection(resultsPageId);
      break;
    default:
      hideMenuOverlay();
      showSection(landingPageId);
  }
}
    // Функция для инициализации страницы и обработки хеша
function initializePage() {
    handleHashChange(); 
    window.addEventListener("hashchange", handleHashChange);
}

// Страница лендинга по умолчанию
window.addEventListener("load", () => {
  if (!window.location.hash) {
    window.location.hash = landingPageId;
  }
  initializePage();
});


