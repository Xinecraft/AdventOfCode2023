package common

import (
	"os"
	"strings"
)

func ReadFile(path string) string {
	data, err := os.ReadFile(path)
	if err != nil {
		panic("Error in reading file")
	}

	return string(data)
}

func ReadLineAsArray(path string) []string {
	data := ReadFile(path)

	return strings.Split(data, "\n")
}
