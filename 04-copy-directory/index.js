const fs = require("fs/promises");
const fsAsync = require("fs");
const path = require("path");

const copyFolder = () => {
  const newFolderPath = path.join(__dirname, "files-copy");
  const oldFolderPath = path.join(__dirname, "files");

  fsAsync.readdir(newFolderPath, async (error, files) => {
    if (error) {
      await fs.mkdir(newFolderPath);
    } else {
      try {
        files.forEach(async (file) => {
          const filePath = path.join(newFolderPath, file);
          await fs.unlink(filePath);
        });
      } catch (error) {
        console.log(error, "File deleting error");
      }
    }

    try {
      const files = await fs.readdir(oldFolderPath);

      files.forEach(async (file) => {
        const oldFilePath = path.join(oldFolderPath, file);
        const newFilePath = path.join(newFolderPath, file);

        await fs.copyFile(oldFilePath, newFilePath);
      });
    } catch (error) {
      console.log(error);
    }
  });
};

copyFolder();
