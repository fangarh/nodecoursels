import util from "util";
import path from "path";
import fs from "fs";
import del from "del";

const fsStat = util.promisify(fs.stat);

export const FileOrgonizerPr = (
  pathIn = "E:\\temp\\In",
  pathOut = null,
  skipExists = "true",
  deleteSrc = ""
) => {
  console.log("Start work by promise");

  const PromisedScanFolder = () => {
    return new Promise((ok, err) => {
      if (!pathOut) pathOut = path.join(pathIn, "..", "Out");

      console.log("Async mode:", pathIn, pathOut);
      console.log("Delete mode:", deleteSrc === "true");

      fsStat(pathIn)
        .then((stat) => {
          if (!stat.isDirectory()) {
            console.log("Invalid input path");
            return;
          }

          if (!fs.existsSync(pathOut)) fs.mkdirSync(pathOut);

          CopyFiles(pathIn, err);
          del.sync([pathIn], { force: true });
          ok();
        })
        .catch((er) => {
          console.log(er);
          err(er);
        });
    });
  };

  const CopyFiles = (scanPath, err) => {
    try {
      console.log(`Coping files: ${scanPath} => ${pathOut}`);

      let files = fs.readdirSync(scanPath);

      files.forEach((file) => {
        let newPath = path.join(scanPath, file);
        let elmType = fs.statSync(newPath);

        if (elmType.isDirectory()) {
          CopyFiles(newPath, err);
          return;
        }

        OrgonizedFileMove(newPath, err);
      });
    } catch (er) {
      err(er);
    }
  };

  const OrgonizedFileMove = (file, err) => {
    let name = path.parse(file).base;
    let dirToCopy = name.charAt(0).toUpperCase();

    dirToCopy = path.join(pathOut, dirToCopy);
    let destFilePath = path.join(dirToCopy, name);

    if (!fs.existsSync(dirToCopy)) fs.mkdirSync(dirToCopy);

    if (fs.existsSync(destFilePath)) {
      if (skipExists === "true") {
        if (deleteSrc === "true") fs.unlinkSync(file);
        return;
      } else fs.unlinkSync(destFilePath);
    }

    if (deleteSrc !== "true") {
      fs.linkSync(file, destFilePath);
    } else {
      fs.renameSync(file, destFilePath);
    }
  };

  return PromisedScanFolder();
};
