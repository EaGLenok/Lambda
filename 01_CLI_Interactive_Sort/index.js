"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function processInput(input) {
    var items = input.split(" ");
    var hashTable = new Map();
    items.forEach(function (item) {
        if (!isNaN(Number(item))) {
            var num = Number(item);
            hashTable.set(num, num);
        }
        else {
            hashTable.set(item, item);
        }
    });
    return hashTable;
}
function handleOperations(hashTable) {
    console.log("\nОперации:\n" +
        "1. Отсортировать слова по алфавиту\n" +
        "2. Вывести числа в порядке возрастания\n" +
        "3. Вывести числа в порядке убывания\n" +
        "4. Вывести слова в порядке возрастания по количеству букв\n" +
        "5. Показать только уникальные слова\n" +
        "6. Показать только уникальные значения из всего набора\n" +
        'Введите номер операции для выполнения (1-6) или введите "exit" для выхода: ');
    rl.question("", function (option) {
        switch (option.trim()) {
            case "1":
                var sortedWords = Array.from(hashTable.values())
                    .filter(function (item) { return typeof item === "string"; })
                    .sort();
                console.log("Отсортированные слова по алфавиту:", sortedWords);
                break;
            case "2":
                var sortedNumbersAsc = Array.from(hashTable.values())
                    .filter(function (item) { return typeof item === "number"; })
                    .sort(function (a, b) { return a - b; });
                console.log("Числа в порядке возрастания:", sortedNumbersAsc);
                break;
            case "3":
                var sortedNumbersDesc = Array.from(hashTable.values())
                    .filter(function (item) { return typeof item === "number"; })
                    .sort(function (a, b) { return b - a; });
                console.log("Числа в порядке убывания:", sortedNumbersDesc);
                break;
            case "4":
                var sortedWordsByLength = Array.from(hashTable.values())
                    .filter(function (item) { return typeof item === "string"; })
                    .sort(function (a, b) { return a.length - b.length; });
                console.log("Слова, отсортированные по длине (возрастание):", sortedWordsByLength);
                break;
            case "5":
                var uniqueWords = Array.from(new Set(Array.from(hashTable.values()).filter(function (item) { return typeof item === "string"; })));
                console.log("Уникальные слова:", uniqueWords);
                break;
            case "6":
                var uniqueValues = Array.from(new Set(Array.from(hashTable.values())));
                console.log("Уникальные значения:", uniqueValues);
                break;
            case "exit":
                console.log("Завершение программы.");
                rl.close();
                return;
            default:
                console.log("Неверная операция. Пожалуйста, введите номер правильной операции.");
                break;
        }
        // После выполнения операции запрашиваем новые данные или продолжаем операции
        rl.question('\nВведите 10 слов и чисел, разделенных пробелами (или "exit" для выхода): ', function (input) {
            if (input.trim().toLowerCase() === "exit") {
                console.log("Завершение программы.");
                rl.close();
            }
            else {
                var newHashTable = processInput(input);
                handleOperations(newHashTable);
            }
        });
    });
}
console.log('Введите 10 слов и чисел, разделенных пробелами (или "exit" для выхода):');
rl.on("line", function (input) {
    if (input.trim().toLowerCase() === "exit") {
        console.log("Завершение программы.");
        rl.close();
    }
    else {
        var hashTable = processInput(input);
        handleOperations(hashTable);
    }
});
