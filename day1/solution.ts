import * as fs from "fs";

const INPUT_FILEPATH = "./input.txt";
const raw = fs.readFileSync(INPUT_FILEPATH, "utf-8");

const input = raw.split("\n");

const partOne = (inputArray: string[]) => {
  let result = 0;
  for (let item of inputArray) {
    let leftCursor = 0;
    let rightCursor = item.length - 1;

    let leftInt = null;
    let rightInt = null;
    while (leftCursor <= rightCursor && (!leftInt || !rightInt)) {
      if (!leftInt) {
        const value = parseInt(item[leftCursor]);
        if (value) {
          leftInt = value;
        } else {
          leftCursor++;
        }
      }

      if (!rightInt) {
        const value = parseInt(item[rightCursor]);
        if (value) {
          rightInt = value;
        } else {
          rightCursor--;
        }
      }
    }

    if (leftInt == null) leftInt = rightInt;
    if (rightInt == null) rightInt = leftInt;
    const finalValue = leftInt * 10 + rightInt;
    result += finalValue;
  }
  return result;
};

const resultPartOne = partOne(input);
console.log('partOne', resultPartOne);
