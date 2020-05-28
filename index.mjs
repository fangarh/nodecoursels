import path from "path";
import { FileOrgonizer } from "./task1.mjs";

const firstParam = process.argv.slice(2, 3)[0];
if (
  !firstParam ||
  firstParam === "-h" ||
  firstParam === "-help" ||
  firstParam === "/?"
) {
  console.log("Apllicatyon for copy and orgonize files.");
  console.log();
  console.log("Parameters:");
  console.log(
    "[workPath], <[destPath], [skipExists], [deleteSrc], [deleteScanTimeout]>"
  );
  console.log();
  console.log("workPath - folder which will be scaned");
  console.log("destPath - folder where copy files (default : 'workPath..Out')");
  console.log(
    "skipExists - if file already exists in dest folder, it wont be copyed (default: true)"
  );
  console.log("deleteSrc - delete source folder (default: false)");
  console.log("deleteAwait - await in async folder delete (default: 1ms)");
} else FileOrgonizer(...process.argv.slice(2, 6));
