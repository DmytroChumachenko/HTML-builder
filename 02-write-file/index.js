const path = require("path");
const readline = require("readline");
const fs = require("fs/promises");

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const filePath = path.join(__dirname, "answer.txt");

interface.question("Hi, friend!\n", async (answer) => {
  try {
    await fs.writeFile(filePath, answer);
  } catch (error) {
    console.log(error);
  } finally {
    interface.close();
  }
});

