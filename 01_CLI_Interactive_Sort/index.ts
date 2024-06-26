import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function processInput(input: string): Map<string | number, string | number> {
  const items = input.split(" ");
  const hashTable = new Map<string | number, string | number>();

  items.forEach((item) => {
    if (!isNaN(Number(item))) {
      const num = Number(item);
      hashTable.set(num, num);
    } else {
      hashTable.set(item, item);
    }
  });

  return hashTable;
}

function handleOperations(hashTable: Map<string | number, string | number>) {
  console.log(
    "\nОперации:\n" +
      "1. Отсортировать слова по алфавиту\n" +
      "2. Вывести числа в порядке возрастания\n" +
      "3. Вывести числа в порядке убывания\n" +
      "4. Вывести слова в порядке возрастания по количеству букв\n" +
      "5. Показать только уникальные слова\n" +
      "6. Показать только уникальные значения из всего набора\n" +
      'Введите номер операции для выполнения (1-6) или введите "exit" для выхода: '
  );

  rl.question("", (option) => {
    switch (option.trim()) {
      case "1":
        const sortedWords = Array.from(hashTable.values())
          .filter((item) => typeof item === "string")
          .sort();
        console.log("Отсортированные слова по алфавиту:", sortedWords);
        break;
      case "2":
        const sortedNumbersAsc = Array.from(hashTable.values())
          .filter((item) => typeof item === "number")
          .sort((a, b) => (a as number) - (b as number));
        console.log("Числа в порядке возрастания:", sortedNumbersAsc);
        break;
      case "3":
        const sortedNumbersDesc = Array.from(hashTable.values())
          .filter((item) => typeof item === "number")
          .sort((a, b) => (b as number) - (a as number));
        console.log("Числа в порядке убывания:", sortedNumbersDesc);
        break;
      case "4":
        const sortedWordsByLength = Array.from(hashTable.values())
          .filter((item) => typeof item === "string")
          .sort((a, b) => (a as string).length - (b as string).length);
        console.log(
          "Слова, отсортированные по длине (возрастание):",
          sortedWordsByLength
        );
        break;
      case "5":
        const uniqueWords = Array.from(
          new Set(
            Array.from(hashTable.values()).filter(
              (item) => typeof item === "string"
            )
          )
        );
        console.log("Уникальные слова:", uniqueWords);
        break;
      case "6":
        const uniqueValues = Array.from(
          new Set(Array.from(hashTable.values()))
        );
        console.log("Уникальные значения:", uniqueValues);
        break;
      case "exit":
        console.log("Завершение программы.");
        rl.close();
        return;
      default:
        console.log(
          "Неверная операция. Пожалуйста, введите номер правильной операции."
        );
        break;
    }

    rl.question(
      '\nВведите 10 слов и чисел, разделенных пробелами (или "exit" для выхода): ',
      (input) => {
        if (input.trim().toLowerCase() === "exit") {
          console.log("Завершение программы.");
          rl.close();
        } else {
          const newHashTable = processInput(input);
          handleOperations(newHashTable);
        }
      }
    );
  });
}

console.log(
  'Введите 10 слов и чисел, разделенных пробелами (или "exit" для выхода):'
);
rl.on("line", (input) => {
  if (input.trim().toLowerCase() === "exit") {
    console.log("Завершение программы.");
    rl.close();
  } else {
    const hashTable = processInput(input);
    handleOperations(hashTable);
  }
});
