import { readLineAsArray } from "../common/io";

const INPUT_FILEPATH = "day2/input.txt";
const input = readLineAsArray(INPUT_FILEPATH);

const parsedInput = input.reduce((acc, line) => {
  const [gameName, gamesData] = line.split(":");
  const gameId = gameName.split(" ")[1];

  const rawDrawList = gamesData.split(";");
  const drawList = rawDrawList.map((rawDraw) => {
    const rawItems = rawDraw.split(",");

    const items = rawItems.reduce((acc, rawItem) => {
      rawItem = rawItem.trim();

      const [quantity, item] = rawItem.split(" ");
      acc[item] = +quantity;
      return acc;
    }, {});

    return items;
  });

  acc[gameId] = drawList;
  return acc;
}, {});


const partOne = () => {
  const check = {
    red: 12,
    green: 13,
    blue: 14,
  };
  const validIds = [];
  for (let gIdx in parsedInput) {
    let isInvalid = false;
    const draws = parsedInput[gIdx];
    for (let draw of draws) {
      for (let key in draw) {
        if (draw[key] > check[key]) {
          isInvalid = true;
          break;
        }
      }
    }
    if (!isInvalid) {
      validIds.push(+gIdx);
    }
  }

  const sum = validIds.reduce((acc, item) => acc + item)
  console.log("PartOne", sum);
};
partOne();

const partTwo = () => {
    let result = 0;
    for (let gIdx in parsedInput) {
        const maxBalls = {
            red: 0,
            green: 0,
            blue: 0
        }
        const draws = parsedInput[gIdx]
        for (let draw of draws) {
            for (let key in draw) {
                if (draw[key] > maxBalls[key]) {
                    maxBalls[key] = draw[key]
                }
            }
        }

        const power = Object.values(maxBalls).reduce((acc, val) => acc * val, 1)
        result += power
    }

    console.log("PartTwo", result)
}
partTwo()
