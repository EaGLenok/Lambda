const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const tinyurl = require("tinyurl");
const path = require("path");

const CREDENTIALS_PATH = "credentials.json";
const TOKEN_PATH = "token.json";

fs.readFile(CREDENTIALS_PATH, (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);
  authorize(JSON.parse(content), main);
});

function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/drive.file"],
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

async function main(auth) {
  const inquirer = (await import("inquirer")).default;
  const drive = google.drive({ version: "v3", auth });

  try {
    const { filePath } = await inquirer.prompt({
      type: "input",
      name: "filePath",
      message:
        "Drag and drop your image to terminal and press Enter for upload:\n",
    });

    if (!fs.existsSync(filePath.trim())) {
      console.error("File not found!");
      return;
    }

    const fileExtension = path.extname(filePath).slice(1);
    const fileNameWithoutExtension = path.basename(
      filePath,
      path.extname(filePath)
    );

    console.log(`File name ${fileNameWithoutExtension}`);
    console.log(`File extension ${fileExtension}`);

    const { rename } = await inquirer.prompt({
      type: "confirm",
      name: "rename",
      message: `You're uploading the file with the name: ${fileNameWithoutExtension}.${fileExtension}. Would you like to change it?`,
      default: false,
    });

    let newFileName = fileNameWithoutExtension;
    if (rename) {
      const { newName } = await inquirer.prompt({
        type: "input",
        name: "newName",
        message:
          "Enter new file name (WITHOUT extension aka .jpg, .png, etc.):\n",
      });
      newFileName = newName;
    }

    const fileMetadata = {
      name: `${newFileName}.${fileExtension}`,
      parents: ["1Jl8LLzQePoEeCvsxco6AMT9punzkzyXX"],
    };

    const media = {
      mimeType: `image/${fileExtension}`,
      body: fs.createReadStream(filePath.trim()),
    };

    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id, webViewLink",
    });

    const fileLink = file.data.webViewLink;
    console.log("Successfully uploaded!");
    console.log(fileLink);

    const { shortify } = await inquirer.prompt({
      type: "confirm",
      name: "shortify",
      message: "Would you like to shorten the link? (y/N)",
      default: true,
    });

    if (shortify) {
      const shortenedUrl = await tinyurl.shorten(fileLink);
      console.log("Shortened URL:", shortenedUrl);
    } else {
      console.log("File URL:", fileLink);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}
