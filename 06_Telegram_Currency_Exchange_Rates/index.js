const TelegramBot = require("node-telegram-bot-api");
const path = require("path");

const token = "7468476631:AAEFoaLkVT1vtI98WIr1RYRsAAmBH_5WmhY";

const bot = new TelegramBot(token, { polling: true });
