import { readLineAsArray } from "../common/io";

const INPUT_PATH = "day3/input.txt";

const raw = readLineAsArray(INPUT_PATH);
const input = raw.map((line) => {
  return line.split("");
});

function findNumberAt(x: number, y: number, arr: string[][]) {
  let val = arr[x][y];

  if (!isNumber(val)) {
    return {
      start: null,
      end: null,
      number: null,
    };
  }

  // Find start index of number
  let start = y - 1;
  while (true) {
    if (!isNumber(arr[x][start])) {
      break;
    }
    start--;
  }
  start = start + 1;

  // Generate the number
  let stNum = arr[x][start];
  let rawFinalNumber = "";
  let startCopy = start;
  while (isNumber(stNum)) {
    rawFinalNumber += stNum;

    start++;
    stNum = arr[x][start];
  }

  return {
    start: startCopy,
    end: start,
    number: getNumber(rawFinalNumber),
  };
}

function isNumber(str: string): boolean {
  let parsedInt = parseInt(str);

  return !Number.isNaN(parsedInt);
}

function getNumber(str: string): number {
  let parsedInt = parseInt(str);

  return parsedInt;
}

const numberMap = new Map();
let partTwoResult = 0;
for (let x = 0; x < input.length; x++) {
  for (let y = 0; y < input[x].length; y++) {
    // Check if Symbol
    const val = input[x][y];
    if (isNumber(val) || val == ".") {
      continue;
    }

    const DIAGONALS = [
      [0, -1],
      [0, 1],
      [-1, 0],
      [1, 0],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];
    let adjacentCounter = 0;
    let multipleOfAdj = 1;
    for (let i = 0; i < DIAGONALS.length; i++) {
      const diag = DIAGONALS[i];
      let res = findNumberAt(x + diag[0], y + diag[1], input);
      if (res.number) {
        if (!numberMap.has([x + diag[0], res.start, res.end].toString())) {
          adjacentCounter++;
          multipleOfAdj *= res.number
        }
        numberMap.set([x + diag[0], res.start, res.end].toString(), res.number);
      }
    }

    if (val == "*" && adjacentCounter == 2) {
      partTwoResult += multipleOfAdj
    }
  }
}

let finalSum = 0;
numberMap.forEach((item) => {
  finalSum += item;
});
console.log("PartOne", finalSum);
console.log("PartTwo", partTwoResult);
