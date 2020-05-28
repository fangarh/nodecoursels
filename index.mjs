import path from "path";
import { FileOrgonizer } from "./task1.mjs";

console.log(process.argv);
FileOrgonizer(...process.argv.slice(2, 6));
