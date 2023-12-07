import * as fs from "fs";

export const readFile = (path: string) => {
  return fs.readFileSync(path, "utf-8");
};

export const readLineAsArray = (path: string) => {
    return readFile(path).split("\n");
}
