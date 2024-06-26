const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const http = require('http');

const token = '7318720451:AAGS1TqpiE22a_apBzHaP5MitqYO1UrU_JY';
const weatherApiKey = '491a050d240d377f4d0e6e4fd4e0d40b';

const bot = new TelegramBot(token, { polling: true });

const initialKeyboard = {
    keyboard: [
        [{ text: 'Погода' }],
        [{ text: 'Курс валют' }]
    ],
    resize_keyboard: true
};

const weatherKeyboard = {
    keyboard: [
        [{ text: 'Кожнi 3 години' }, { text: 'Кожнi 6 годин' }],
        [{ text: 'Текущий город' }],
        [{ text: 'Попереднє меню' }]
    ],
    one_time_keyboard: true
};

const walletKeyboard = {
    keyboard: [
        [{ text: 'USD' }, { text: 'EUR' }],
        [{ text: 'Попереднє меню' }]
    ],
    one_time_keyboard: true
};
let currentCity = '';

async function getCityCoordinates(cityName, apiKey) {
    try {
        const response = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
            params: {
                q: cityName,
                limit: 1,
                appid: apiKey
            }
        });

        if (response.data.length === 0) {
            throw new Error('Город не найден');
        }

        const { lat, lon } = response.data[0];
        return { lat, lon };
    } catch (error) {
        console.error('Ошибка при получении координат города:', error.message);
        throw error;
    }
}

async function getWeatherForecastByCoordinates(lat, lon, apiKey) {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
            params: {
                lat,
                lon,
                appid: apiKey,
                units: 'metric',
                lang: 'ru'
            }
        });

        return response.data.list;
    } catch (error) {
        console.error('Ошибка при получении данных о погоде:', error.message);
        throw error;
    }
}

async function getCurrencyUSD() {
    try {
        const response = await axios.get('https://api.monobank.ua/bank/currency');
        const filteredResponse = response.data.filter(obj => obj.currencyCodeA === 840 || obj.currencyCodeB === 840);
        return filteredResponse;
    } catch (error) {
        console.error('An error occurred:', error.message);
        throw error;
    }
}

async function getCurrencyEUR() {
    try {
        const response = await axios.get('https://api.monobank.ua/bank/currency');
        const filteredResponse = response.data.filter(obj => obj.currencyCodeA === 978 || obj.currencyCodeB === 978);
        return filteredResponse;
    } catch (error) {
        console.error('An error occurred:', error.message);
        throw error;
    }
}

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Привет! Нажмите кнопку 'Погода' или 'Курс валют' для начала.", {
        reply_markup: initialKeyboard
    });
});

bot.onText(/\/setcity (.+)/, (msg, match) => {
    currentCity = match[1].trim();
    bot.sendMessage(msg.chat.id, `Город установлен: ${currentCity}`);
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;

    if (msg.text === 'Курс валют') {
        bot.sendMessage(chatId, 'Выберите опцию:', {
            reply_markup: walletKeyboard
        });

    } else if (msg.text === 'USD') {
        try {
            const currencyRates = await getCurrencyUSD();

            let message = `Курсы валют (USD):\n`;
            currencyRates.forEach(rate => {
                if (rate.currencyCodeA === 840 || rate.currencyCodeB === 840) {
                    message += `${rate.currencyCodeA === 840 ? rate.currencyCodeB : rate.currencyCodeA}: ${rate.rateBuy} (Покупка), ${rate.rateSell} (Продажа)\n`;
                }
            });

            bot.sendMessage(chatId, message);
        } catch (error) {
            console.error('Ошибка при получении курсов валют:', error.message);
            bot.sendMessage(chatId, 'Произошла ошибка при получении курсов валют. Пожалуйста, попробуйте позже.');
        }
    } else if (msg.text === 'EUR') {
        try {
            const currencyRates = await getCurrencyEUR();

            let message = `Курсы валют (EUR):\n`;
            currencyRates.forEach(rate => {
                if (rate.currencyCodeA === 978 || rate.currencyCodeB === 978) {
                    message += `${rate.currencyCodeA === 978 ? rate.currencyCodeB : rate.currencyCodeA}: ${rate.rateBuy} (Покупка), ${rate.rateSell} (Продажа)\n`;
                }
            });

            bot.sendMessage(chatId, message);
        } catch (error) {
            console.error('Ошибка при получении курсов валют:', error.message);
            bot.sendMessage(chatId, 'Произошла ошибка при получении курсов валют. Пожалуйста, попробуйте позже.');
        }
    }
    if (msg.text === 'Погода') {
        bot.sendMessage(chatId, 'Выберите опцию:', {
            reply_markup: weatherKeyboard
        });


    } else if (msg.text === 'Кожнi 3 години') {
        if (!currentCity) {
            bot.sendMessage(chatId, 'Сначала установите город с помощью команды /setcity <город>');
            return;
        }

        try {
            const { lat, lon } = await getCityCoordinates(currentCity, weatherApiKey);
            const forecasts = await getWeatherForecastByCoordinates(lat, lon, weatherApiKey);

            let weatherMessage = `Прогноз погоды в ${currentCity} с интервалом 3 часа:\n`;
            let currentDate = "";
            forecasts.forEach((forecast, index) => {
                const date = new Date(forecast.dt * 1000);
                const day = date.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
                const time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
                const temp = `${Math.round(forecast.main.temp)} °C`;
                const feelsLike = `${Math.round(forecast.main.feels_like)} °C`;
                const description = forecast.weather[0].description;

                if (currentDate !== day) {
                    currentDate = day;
                    weatherMessage += `\n${currentDate}:\n`;
                }

                weatherMessage += `${time}, ${temp}, ощущается как: ${feelsLike}, ${description}\n`;
            });

            bot.sendMessage(chatId, weatherMessage);
        } catch (error) {
            console.error('Ошибка при запросе погоды:', error.message);
            bot.sendMessage(chatId, `Не удалось получить данные о погоде для ${currentCity}. Проверьте название города и попробуйте снова.`);
        }
    } else if (msg.text === 'Кожнi 6 годин') {
        if (!currentCity) {
            bot.sendMessage(chatId, 'Сначала установите город с помощью команды /setcity <город>');
            return;
        }

        try {
            const { lat, lon } = await getCityCoordinates(currentCity, weatherApiKey);
            const forecasts = await getWeatherForecastByCoordinates(lat, lon, weatherApiKey);

            let weatherMessage = `Прогноз погоды в ${currentCity} с интервалом 6 часов:\n`;
            let currentDate = "";
            forecasts.forEach((forecast, index) => {
                if (index % 2 !== 0) return;

                const date = new Date(forecast.dt * 1000);
                const day = date.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
                const time = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
                const temp = `${Math.round(forecast.main.temp)} °C`;
                const feelsLike = `${Math.round(forecast.main.feels_like)} °C`;
                const description = forecast.weather[0].description;

                if (currentDate !== day) {
                    currentDate = day;
                    weatherMessage += `\n${currentDate}:\n`;
                }

                weatherMessage += `${time}, ${temp}, ощущается как: ${feelsLike}, ${description}\n`;
            });

            bot.sendMessage(chatId, weatherMessage);
        } catch (error) {
            console.error('Ошибка при запросе погоды:', error.message);
            bot.sendMessage(chatId, `Не удалось получить данные о погоде для ${currentCity}. Проверьте название города и попробуйте снова.`);
        }
    } else if (msg.text === 'Текущий город') {
        if (currentCity) {
            bot.sendMessage(chatId, `Текущий установленный город: ${currentCity}`);
        } else {
            bot.sendMessage(chatId, 'Город не установлен. Используйте команду /setcity <город>, чтобы установить город.');
        }
    } else if (msg.text === 'Попереднє меню') {
        bot.sendMessage(chatId, 'Вы вернулись в главное меню.', {
            reply_markup: initialKeyboard
        });
    }
});

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Weather bot is running!');
}).listen(3000);