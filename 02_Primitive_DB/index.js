import inquirer from "inquirer";

const users = [];

async function addUser() {
  const answers = await inquirer.prompt([
    { name: "name", message: "Введите имя:" },
    { name: "gender", message: "Введите гендер (M/F):" },
    { name: "age", message: "Введите возраст:" },
  ]);

  if (answers.name) {
    users.push(answers);
    console.log("Пользователь успешно добавлен!");
    await askToAddAnotherUser();
  } else {
    console.log("Создание прервано.");
    await searchUser();
  }
}

async function askToAddAnotherUser() {
  const { addAnother } = await inquirer.prompt({
    name: "addAnother",
    type: "confirm",
    message: "Добавить другого пользователя?",
  });

  if (addAnother) {
    await addUser();
  } else {
    await searchUser();
  }
}

async function searchUser() {
  const { search } = await inquirer.prompt({
    name: "search",
    type: "confirm",
    message: "Найти пользователя по имени?",
  });

  if (search) {
    const { name } = await inquirer.prompt({
      name: "name",
      message: "Введите имя пользователя:",
    });

    const foundUser = users.find((user) => user.name === name);
    if (foundUser) {
      console.log("User found:", foundUser);
    } else {
      console.log("Пользователь не найден.");
    }
  } else {
    console.log("Приложение завершено.");
  }
}

addUser();
