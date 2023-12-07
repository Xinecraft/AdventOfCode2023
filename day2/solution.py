import sys
import os
from functools import reduce

sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
from common.io import readLineAsArray

INPUT_FILEPATH = "day2/input.txt"
input = readLineAsArray(INPUT_FILEPATH)

def raw_items_reducer(acc, item):
    rawItem = item.strip()

    quantity, item = rawItem.split(" ")
    acc[item] = int(quantity)
    return acc

def parsed_input_reducer(acc, line):
    gameName, gamesData = line.split(":")
    gameId = gameName.split(" ")[1]

    rawDrawList = gamesData.split(";")
    drawList = []
    for draw in rawDrawList:
        rawItems = draw.split(",")
        items = reduce(raw_items_reducer, rawItems, {})
        drawList.append(items)
    
    acc[gameId] = drawList
    return acc

# Parse the Input
parsed_input = reduce(parsed_input_reducer, input, {})

def part_one():
    check = {
        "red": 12,
        "green": 13,
        "blue": 14
    }
    possibleGames = []
    for gameId,gameData in parsed_input.items():
        possible = True
        for draw in gameData:
            if (draw.get("red") != None and draw["red"] > check["red"]):
                possible = False
                break
            if (draw.get("blue") != None and draw["blue"] > check["blue"]):
                possible = False
                break
            if (draw.get("green") != None and draw["green"] > check["green"]):
                possible = False
                break
        if possible == True:
            possibleGames.append(int(gameId))

    sum = 0
    for gameId in possibleGames:
        sum += gameId
    print("PartOne", sum)

def part_two():
    result = 0
    for _, gameData in parsed_input.items():
        min_cubes = {
            "red": 0,
            "green": 0,
            "blue": 0
        }

        for draw in gameData:
            for key in draw:
                if draw[key] > min_cubes[key]:
                    min_cubes[key] = draw[key]

        power = 1
        for _, val in min_cubes.items():
            power *= val

        result += power
    
    print("PartTwo", result)


part_one()
part_two()