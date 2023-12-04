import * as fs from "fs";

const INPUT_FILEPATH = "./input.txt";
const STRING_NUMBERS = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
const STRING_NUMBERS_KEYS = Object.keys(STRING_NUMBERS);
const REVERSED_STRING_NUMBERS_KEYS = STRING_NUMBERS_KEYS.map((number) => {
  return number.split("").reverse().join("");
});

const raw = fs.readFileSync(INPUT_FILEPATH, "utf-8");

const input = raw.split("\n");

const convertStrToNumber = (item: string) => {
  const firstMatch = item.match(STRING_NUMBERS_KEYS.join("|"));
  if (firstMatch) {
    const firstMatchIndex = item.indexOf(firstMatch[0]);
    const firstNumberIndex = item.search("1|2|3|4|5|6|7|8|9");
    if (firstNumberIndex > firstMatchIndex) {
      let match = firstMatch[0];
      item = item.replace(match, STRING_NUMBERS[match]);
    }
  }

  const reversedKeys = REVERSED_STRING_NUMBERS_KEYS.join("|");
  const lastMatch = item.split("").reverse().join("").match(reversedKeys);
  if (lastMatch) {
    const lastMatchIndex = item.split("").reverse().join("").indexOf(lastMatch[0]);
    const lastNumberIndex = item
      .split("")
      .reverse()
      .join("")
      .search("1|2|3|4|5|6|7|8|9");
    if (lastNumberIndex > lastMatchIndex) {
      let match = lastMatch[0];
      let originalKey = match.split("").reverse().join("");
      item = item
        .split("")
        .reverse()
        .join("")
        .replace(match, STRING_NUMBERS[originalKey])
        .split("")
        .reverse()
        .join("");
    }
  }

  return item;
};

const findForLine = (item: string, original: string) => {
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
  // console.log(original, item, leftInt, rightInt, finalValue);

  return finalValue;
};

const partOne = (inputArray: string[]) => {
  let result = 0;
  for (let item of inputArray) {
    result += findForLine(item, null);
  }
  return result;
};

const partTwo = (inputArray: string[]) => {
  let result = 0;
  for (let item of inputArray) {
    const original = item;
    item = convertStrToNumber(item);
    // console.log(item)
    result += findForLine(item, original);
  }
  return result;
};

const resultPartOne = partOne(input);
console.log("partOne", resultPartOne);
const resultPartTwo = partTwo(input);
console.log("partTwo", resultPartTwo);

// Special: If we have 4twonex then it should be 3tw1x not 42nex
