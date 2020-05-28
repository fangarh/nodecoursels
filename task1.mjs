import path from "path";
import fs from "fs";

export const FileOrgonizer = (
  pathIn = "E:\\temp\\In",
  pathOut = null,
  skipExists = "true",
  deleteSrc = "",
  delAwait = 1
) => {
  let errorBreak = false;
  const DeleteSrc = (delPath) => {
    //console.log("Src deleting: ", pathIn);

    if (deleteSrc !== "true" || errorBreak === true) return;

    fs.readdir(delPath, (err, files) => {
      if (err || errorBreak === true) {
        console.log("Something go bad =(((");
        console.log(err ? err : "Break signal recived");
        return;
      }

      if (files.length === 0)
        fs.rmdir(delPath, (err) => {
          if (err) {
            errorBreak = true;
            console.log(err);
          } else console.log(`Folder ${delPath} remooved success`);
        });
      else
        setTimeout(() => {
          DeleteSrc(delPath);
        }, delAwait);
    });
  };

  const Error = (err) => {
    if (err) {
      errorBreak = true;
      console.log(err);
    }
  };

  const OrgonizedFileMove = (file) => {
    let name = path.parse(file).base;
    let dirToCopy = name.charAt(0).toUpperCase();

    dirToCopy = path.join(pathOut, dirToCopy);
    let destFilePath = path.join(dirToCopy, name);

    if (!fs.existsSync(dirToCopy)) fs.mkdirSync(dirToCopy);

    try {
      if (fs.existsSync(destFilePath)) {
        if (skipExists === "true") {
          if (deleteSrc === "true") fs.unlinkSync(file);
          return;
        } else fs.unlinkSync(destFilePath);
      }
    } catch (err) {
      Error(err);
    }

    if (deleteSrc !== "true") {
      fs.link(file, destFilePath, (err) => {
        Error(err);
      });
    } else {
      fs.rename(file, destFilePath, (err) => {
        Error(err);
      });
    }
  };

  const CopyFiles = (scanPath) => {
    console.log(`Coping files: ${scanPath} => ${pathOut}`);

    fs.readdir(scanPath, (err, files) => {
      files.forEach((file) => {
        let newPath = path.join(scanPath, file);
        let elmType = fs.statSync(newPath);

        if (elmType.isDirectory()) {
          CopyFiles(newPath);
          return;
        }

        OrgonizedFileMove(newPath);
      });
    });
    DeleteSrc(scanPath);
  };

  const AsyncScaner = () => {
    if (!pathOut) pathOut = path.join(pathIn, "..", "Out");

    console.log("Async mode:", pathIn, pathOut);
    console.log("Delete mode:", deleteSrc === "true");
    fs.stat(pathIn, (err, stat) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!stat.isDirectory()) {
        console.log("Invalid input path");
        return;
      }

      if (!fs.existsSync(pathOut)) fs.mkdirSync(pathOut);

      CopyFiles(pathIn);
    });
  };

  AsyncScaner();
  return 1;
};
