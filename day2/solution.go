package main

import (
	"aoc/common"
	"fmt"
	"strconv"
	"strings"
)

const INPUT_FILEPATH = "day2/input.txt"

type GameData = []map[string]int

func splitInTwo(line, separator string) (string, string) {
	splited := strings.Split(line, separator)

	return splited[0], splited[1]
}

func rawItemsReducer(rawItems []string) map[string]int {
	toReturn := make(map[string]int)
	for _, item := range rawItems {
		item = strings.TrimSpace(item)
		val, key := splitInTwo(item, " ")
		parsedVal, _ := strconv.Atoi(val)
		toReturn[key] = parsedVal
	}
	return toReturn
}

func main() {
	input := common.ReadLineAsArray(INPUT_FILEPATH)
	parsedInput := make(map[int]GameData)
	for _, line := range input {
		gameName, gamesData := splitInTwo(line, ":")
		gameId := strings.Split(gameName, " ")[1]

		rawDrawList := strings.Split(gamesData, ";")

		drawList := []map[string]int{}
		for _, draw := range rawDrawList {
			rawItems := strings.Split(draw, ",")
			items := rawItemsReducer(rawItems)
			drawList = append(drawList, items)
		}

		gId, _ := strconv.Atoi(gameId)
		parsedInput[int(gId)] = drawList
	}

	partOne(parsedInput)
	partTwo(parsedInput)
}

func partOne(input map[int]GameData) {
	MAX_RED, MAX_GREEN, MAX_BLUE := 12, 13, 14

	var possibleGames []int

	for gameId, gameData := range input {
		possible := true
		for _, draw := range gameData {
			if draw["red"] > MAX_RED {
				possible = false
				break
			}
			if draw["green"] > MAX_GREEN {
				possible = false
				break
			}
			if draw["blue"] > MAX_BLUE {
				possible = false
				break
			}
		}

		if possible {
			possibleGames = append(possibleGames, gameId)
		}
	}

	sum := 0
	for _, game := range possibleGames {
		sum += game
	}

	fmt.Println("PartOne", sum)
}

func partTwo(input map[int]GameData) {
	result := 0
	for _, gameData := range input {
		minCubes := map[string]int{"red": 0, "green": 0, "blue": 0}

		for _, draw := range gameData {
			for key := range draw {
				if draw[key] > minCubes[key] {
					minCubes[key] = draw[key]
				}
			}
		}

		power := 1
		for _, val := range minCubes {
			power *= val
		}
		result += power
	}
	fmt.Println("PartTwo", result)
}
