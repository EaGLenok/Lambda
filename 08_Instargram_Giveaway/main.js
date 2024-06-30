const fs = require("fs");
const path = require("path");

const files = [
  "out0.txt",
  "out1.txt",
  "out2.txt",
  "out3.txt",
  "out4.txt",
  "out5.txt",
  "out6.txt",
  "out7.txt",
  "out8.txt",
  "out9.txt",
  "out10.txt",
  "out11.txt",
  "out12.txt",
  "out13.txt",
  "out14.txt",
  "out15.txt",
  "out16.txt",
  "out17.txt",
  "out18.txt",
  "out19.txt",
];

async function processFile(file) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, file);
    const stream = fs.createReadStream(filePath, { encoding: "utf8" });
    const usernames = new Set();

    stream.on("data", (chunk) => {
      chunk.split("\n").forEach((username) => {
        if (username.trim()) {
          usernames.add(username);
        }
      });
    });

    stream.on("end", () => {
      resolve(usernames);
    });

    stream.on("error", (error) => {
      reject(error);
    });
  });
}

async function processFiles() {
  console.time("Заняло: ");
  const filePromises = files.map((file) => processFile(file));
  const results = await Promise.all(filePromises);

  const appearanceCounts = new Map();

  results.forEach((usernames) => {
    usernames.forEach((username) => {
      if (appearanceCounts.has(username)) {
        appearanceCounts.set(username, appearanceCounts.get(username) + 1);
      } else {
        appearanceCounts.set(username, 1);
      }
    });
  });

  const uniqueUsernames = appearanceCounts.size;
  const allFilesUsernames = Array.from(appearanceCounts.values()).filter(
    (count) => count === 20
  ).length;
  const atLeastTenFilesUsernames = Array.from(appearanceCounts.values()).filter(
    (count) => count >= 10
  ).length;

  console.log(`Уникальные имена пользователей: ${uniqueUsernames}`);
  console.log(
    `Имена пользователей, встречающиеся во всех файлах: ${allFilesUsernames}`
  );
  console.log(
    `Имена пользователей, встречающиеся хотя бы в 10 файлах: ${atLeastTenFilesUsernames}`
  );
  console.timeEnd("Заняло: ");
}

processFiles();
