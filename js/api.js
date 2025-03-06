document.addEventListener('DOMContentLoaded', function () {
    // Таймер
    const timerElement = document.getElementById('timer');
    let timeLeft = 600;
    let timerInterval;

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timerElement.textContent = minutes + ':' + seconds;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            timerElement.textContent = 'Время истекло!';
        }
    }

    function startTimer() {
        timerInterval = setInterval(updateTimer, 1000);
    }

    // Запуск таймера 
    if (window.location.href.includes('results-page')) {
        startTimer();
    } else {
        const minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timerElement.textContent = minutes + ':' + seconds;
    }

    // Обработка клика на кнопку (запрос к API)
    const callButton = document.getElementById('callButton');
    const dataContainer = document.getElementById('dataContainer');

    callButton.addEventListener('click', function () {
        fetch('https://swapi.dev/api/people/1/')
            .then(response => response.json())
            .then(data => {
                const formattedData = `
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Height:</strong> ${data.height}</p>
                    <p><strong>Mass:</strong> ${data.mass}</p>
                    <p><strong>Hair Color:</strong> ${data.hair_color}</p>
                    <p><strong>Skin Color:</strong> ${data.skin_color}</p>
                    <p><strong>Eye Color:</strong> ${data.eye_color}</p>
                    <p><strong>Birth Year:</strong> ${data.birth_year}</p>
                    <p><strong>Gender:</strong> ${data.gender}</p>
                `;
                dataContainer.innerHTML = formattedData;
            })
            .catch(error => {
                dataContainer.textContent = 'Ошибка.';
                console.error('Ошибка:', error);
            });
    });

    // Отслеживание смены страниц
    window.addEventListener('popstate', function(event) {
        if (window.location.href.includes('results-page')) {
            startTimer();
        } else {
            clearInterval(timerInterval);
        }
    });
});