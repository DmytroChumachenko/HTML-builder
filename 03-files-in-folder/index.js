const path = require("path");
const fs = require("fs/promises");

const folderPath = path.join(__dirname, "secret-folder");

const myReadDir = async (myFolderPath = folderPath) => {
  try {
    const filesOrFolers = await fs.readdir(myFolderPath, {
      withFileTypes: true
    });

    filesOrFolers.forEach(async (el) => {
      if (el.isDirectory()) {
        const nestedPath = path.join(myFolderPath, el.name);
        myReadDir(nestedPath);
      } else {
        const extname = path.extname(el.name);
        const fileName = el.name.replace(extname, "");
        const filePath = path.join(myFolderPath, el.name.toString());
        const fileDetails = await fs.stat(filePath);
        const size = fileDetails.size;

        console.log(`${fileName} - ${extname} - ${size}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

myReadDir();

