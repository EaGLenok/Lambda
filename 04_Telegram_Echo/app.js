const TelegramBot = require("node-telegram-bot-api");

const token = "7468476631:AAEFoaLkVT1vtI98WIr1RYRsAAmBH_5WmhY";

const bot = new TelegramBot(token, { polling: true });

async function loadPhoto() {
  const response = await fetch("https://picsum.photos/200/300?random=1");
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

bot.on("polling_error", (error) => {
  if (error === null) {
    console.log("Telegram bot successful starded...");
  } else {
    console.error("Ошибка при работе с polling:", error);
  }
});

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === "photo") {
    try {
      const photoBuffer = await loadPhoto();
      bot.sendPhoto(chatId, photoBuffer);
      console.log(`Пользователь ${msg.from.first_name} запросил картинку.`);
    } catch (error) {
      console.error("Ошибка при загрузке фотографии:", error);
    }
  } else {
    bot.sendMessage(chatId, `Вы написали: ` + `"${msg.text}"`);
    console.log(`Пользователь ${msg.from.first_name} написал: ${msg.text}`);
  }
});
