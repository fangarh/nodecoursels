import { FileOrgonizerPr } from "./task1promise.mjs";
import { FileOrgonizer } from "./task1.mjs";

const firstParam = process.argv.slice(2)[0];
const secondParam = process.argv.slice(3)[0];
if (
  !firstParam ||
  !secondParam ||
  firstParam === "-h" ||
  firstParam === "-help" ||
  firstParam === "/?"
) {
  console.log();
  console.log("\tApllicatyon for copy and orgonize files.");
  console.log();
  console.log("\tParameters:");
  console.log(
    "\t\t [usePromises], [workPath], <[destPath], [skipExists], [deleteSrc], [deleteScanTimeout]>"
  );
  console.log();
  console.log(
    "\tusePromises - wich metod use: with or without promises. \n\t\tif usePromises is 'true' - promises will be used"
  );
  console.log("\tworkPath - folder which will be scaned\n");
  console.log(
    "\tdestPath - folder where copy files (default : 'workPath\\..\\Out')"
  );
  console.log(
    "\tskipExists - if file already exists in dest folder, it wont be copyed (default: true)"
  );
  console.log("\tdeleteSrc - delete source folder (default: false)");
  console.log("\tdeleteAwait - await in async folder delete (default: 1ms)");
} else {
  if (firstParam === "true")
    FileOrgonizerPr(...process.argv.slice(3))
      .then(() => {
        console.log("All done!!!!");
      })
      .catch((err) => {
        console.log("Wah!!! Was Error!!!\n\n", err);
      });
  else FileOrgonizer(...process.argv.slice(3));
}
