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

// Функция для получения погоды
const fetchWeather = async () => {
    try {
        // Координаты Пхукета (HKT)
        const resHKT = await fetch('https://api.open-meteo.com/v1/forecast?latitude=8.1132&longitude=98.3169&current_weather=true');
        const dataHKT = await resHKT.json();
        document.getElementById('weather-hkt').innerText = `${Math.round(dataHKT.current_weather.temperature)}°C`;

        // Координаты Тель-Авива (Бен-Гурион, TLV)
        const resTLV = await fetch('https://api.open-meteo.com/v1/forecast?latitude=32.0114&longitude=34.8867&current_weather=true');
        const dataTLV = await resTLV.json();
        document.getElementById('weather-tlv').innerText = `${Math.round(dataTLV.current_weather.temperature)}°C`;
    } catch (error) {
        console.error("Не удалось загрузить погоду:", error);
        document.getElementById('weather-hkt').innerText = "N/A";
        document.getElementById('weather-tlv').innerText = "N/A";
    }
};

// Функция для получения курса валют (THB к ILS)
const fetchExchangeRate = async () => {
    try {
        const res = await fetch('https://api.frankfurter.app/latest?from=THB&to=ILS');
        const data = await res.json();
        const rate = data.rates.ILS;
        document.getElementById('exchange-rate').innerText = `1 ฿ = ${rate.toFixed(2)} ₪`;
    } catch (error) {
        console.error("Не удалось загрузить курс валют:", error);
        document.getElementById('exchange-rate').innerText = "N/A";
    }
};

// Запускаем таймер, погоду и курс валют
updateCountdown();
setInterval(updateCountdown, 1000);
fetchWeather();
fetchExchangeRate();