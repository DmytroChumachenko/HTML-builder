const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "text.txt");
const stream = fs.createReadStream(filePath);

let result = "";

stream.on("data", (chunk) => {
  result += chunk.toString();
});

stream.on("error", (error) => {
  console.log(error);
});

stream.on("end", () => {
  console.log(result);
});


