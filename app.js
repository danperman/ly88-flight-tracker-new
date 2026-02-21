// Задаем дату вылета: 7 Марта 2026, 22:30 по времени Пхукета (UTC+7)
const departureDate = new Date('2026-03-07T22:30:00+07:00').getTime();

// Функция обновления таймера
const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = departureDate - now;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = "<span class='text-xl font-bold text-green-600'>Flight has departed!</span>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Добавляем ведущий ноль, если число меньше 10
    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
};

// Запускаем таймер сразу и обновляем каждую секунду
updateCountdown();
setInterval(updateCountdown, 1000);