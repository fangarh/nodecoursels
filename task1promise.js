import path from "path";
import {
  stat as fsStat,
  readdir as fsReaddir,
  link as lincAsync,
  rename as renameAsync,
  unlink as unlinkAsync,
  mkdir as mkdirAsync,
} from "fs/promises";

import del from "del";
import fs from "fs";
export const FileOrgonizerPr = (
  pathIn = "E:\\temp\\In",
  pathOut = null,
  skipExists = "true",
  deleteSrc = ""
) => {
  console.log("Start work by promise");

  const PromisedScanFolder = () => {
    return new Promise(async (ok, err) => {
      if (!pathOut) pathOut = path.join(pathIn, "..", "Out");

      console.log("Async mode:", pathIn, pathOut);
      console.log("Delete mode:", deleteSrc === "true");

      const statData = await fsStat(pathIn);

      if (!statData.isDirectory()) {
        console.log("Invalid input path");
        return;
      }

      if (!fs.existsSync(pathOut)) await mkdirAsync(pathOut);

      await CopyFiles(pathIn, err);
      await del([pathIn], { force: true });

      ok();
    });
  };

  const CopyFiles = async (scanPath, err) => {
    try {
      console.log(`Coping files: ${scanPath} => ${pathOut}`);

      let files = await fsReaddir(scanPath);

      files.forEach(async (file) => {
        let newPath = path.join(scanPath, file);
        let elmType = await fsStat(newPath);

        if (elmType.isDirectory()) {
          await CopyFiles(newPath, err);
          return;
        }

        await OrgonizedFileMove(newPath, err);
      });
    } catch (er) {
      err(er);
    }
  };

  const OrgonizedFileMove = async (file, err) => {
    let name = path.parse(file).base;
    let dirToCopy = name.charAt(0).toUpperCase();

    dirToCopy = path.join(pathOut, dirToCopy);
    let destFilePath = path.join(dirToCopy, name);

    if (!fs.existsSync(dirToCopy)) await mkdirAsync(dirToCopy);

    if (fs.existsSync(destFilePath)) {
      if (skipExists === "true") {
        if (deleteSrc === "true") await unlinkAsync(file);
        return;
      } else await unlinkAsync(destFilePath);
    }

    if (deleteSrc !== "true") {
      await linkAsync(file, destFilePath);
    } else {
      await renameAsync(file, destFilePath);
    }
  };

  return PromisedScanFolder();
};
