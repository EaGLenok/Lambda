const { program } = require("commander");
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const path = require("path");

const token = "7468476631:AAEFoaLkVT1vtI98WIr1RYRsAAmBH_5WmhY";
const chatIdFilePath = "chatId.txt";

const bot = new TelegramBot(token, { polling: true });

function sendMessage(chatId, text) {
  bot
    .sendMessage(chatId, text)
    .then(() => {
      console.log("Сообщение успешно отправлено!");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Не удалось отправить сообщение:", err);
      process.exit(1);
    });
}

function sendPhoto(chatId, filePath) {
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    console.error("Файл не существует:", absolutePath);
    process.exit(1);
  }

  bot
    .sendPhoto(chatId, absolutePath)
    .then(() => {
      console.log("Фото успешно отправлено!");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Не удалось отправить фото:", err);
      process.exit(1);
    });
}

function getChatId() {
  bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    fs.writeFileSync(chatIdFilePath, chatId.toString());
    console.log("Chat ID:", chatId);
    bot.sendMessage(chatId, `Chat ID: ${chatId}`);
    process.exit(0);
  });
}

function readChatIdFromFile() {
  if (fs.existsSync(chatIdFilePath)) {
    return fs.readFileSync(chatIdFilePath, "utf8").trim();
  } else {
    console.error(
      "Файл с Chat ID не найден. Используйте команду get-chat-id для получения Chat ID."
    );
    process.exit(1);
  }
}

program
  .command("message <text>")
  .description("Отправить сообщение в Telegram боту")
  .option("-c, <chatId>", "Указать Chat ID")
  .action((text, cmdObj) => {
    const chatId = cmdObj.chatId || readChatIdFromFile();
    sendMessage(chatId, text);
  });

program
  .command("photo <filePath>")
  .description("Отправить фото в Telegram боту")
  .option("-c, <chatId>", "Указать Chat ID")
  .action((filePath, cmdObj) => {
    const chatId = cmdObj.chatId || readChatIdFromFile();
    sendPhoto(chatId, filePath);
  });
program
  .command("get-chat-id")
  .description("Получить Chat ID, отправив сообщение боту")
  .action(() => {
    getChatId();
  });

program.parse(process.argv);
