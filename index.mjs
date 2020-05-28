import path from "path";
import { FileOrgonizer } from "./task1.mjs";

const firstParam = process.argv.slice(2, 3)[0];
if (
  !firstParam ||
  firstParam === "-h" ||
  firstParam === "-help" ||
  firstParam === "/?"
) {
  console.log();
  console.log("\tApllicatyon for copy and orgonize files.");
  console.log();
  console.log("\tParameters:");
  console.log(
    "\t\t[workPath], <[destPath], [skipExists], [deleteSrc], [deleteScanTimeout]>"
  );
  console.log();
  console.log("\tworkPath - folder which will be scaned");
  console.log(
    "\tdestPath - folder where copy files (default : 'workPath..Out')"
  );
  console.log(
    "\tskipExists - if file already exists in dest folder, it wont be copyed (default: true)"
  );
  console.log("\tdeleteSrc - delete source folder (default: false)");
  console.log("\tdeleteAwait - await in async folder delete (default: 1ms)");
} else FileOrgonizer(...process.argv.slice(2, 6));
