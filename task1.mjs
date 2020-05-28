import path from "path";
import fs from "fs";

export const FileOrgonizer = (
  pathIn = "E:\\temp\\In",
  pathOut = null,
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
        console.warn(err ? err : "Break signal recived");
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

  const OrgonizedFileMove = (file) => {
    let name = path.parse(file).base;
    let dirToCopy = name.charAt(0).toUpperCase();

    dirToCopy = path.join(pathOut, dirToCopy);

    if (!fs.existsSync(dirToCopy)) fs.mkdirSync(dirToCopy);

    if (deleteSrc !== "true") {
      fs.link(file, path.join(dirToCopy, name), (err) => {
        if (err) {
          errorBreak = true;
          console.log(err);
        }
      });
    } else {
      fs.rename(file, path.join(dirToCopy, name), (err) => {
        if (err) {
          errorBreak = true;
          console.log(err);
        }
      });
    }
  };

  const CopyFiles = (scanPath) => {
    console.log(`Coping files: ${scanPath} => ${pathOut}`);
    DeleteSrc(scanPath);
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

      CopyFiles(pathIn);
    });
  };

  AsyncScaner();
  return 1;
};
