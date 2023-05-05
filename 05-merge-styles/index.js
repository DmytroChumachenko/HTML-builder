const fs = require("fs/promises");
const fsAsync = require("fs");
const path = require("path");
const stream = require("stream");

const distPath = path.join(__dirname, "project-dist");
const stylesPath = path.join(__dirname, "styles");
const bundleName = "bundle.css";

const existOrCreateBundle = async () => {
  try {
    await fs.writeFile(path.join(distPath, bundleName), "");
  } catch (error) {
    console.log(error, "Error writting file");
  }
};

const readStyleFileAndWriteToBundle = (filePath) => {
  const styleReadStream = fsAsync.createReadStream(filePath);
  const styleWriteStream = fsAsync.createWriteStream(
    path.join(distPath, bundleName),
    {
      flags: "a"
    }
  );

  stream.pipeline(styleReadStream, styleWriteStream, (error) => {
    if (error) console.log(error, "Stream error");
  });
};

const checkStylesExt = (fileName) => {
  const ext = ".css";
  return path.extname(fileName) === ext;
};

const readStylesFolder = async () => {
  try {
    const files = await fs.readdir(stylesPath);

    files.forEach((file) => {
      if (!checkStylesExt(file)) {
        return;
      }

      const filePath = path.join(stylesPath, file);
      readStyleFileAndWriteToBundle(filePath);
    });
  } catch (error) {
    console.log(error, "Error reading folder");
  }
};

const start = async () => {
  await existOrCreateBundle();
  await readStylesFolder();
};

start();

