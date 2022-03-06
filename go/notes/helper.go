package main

import "strings"

func validateUserInput(firstName string, email string, tickets int) (bool, bool, bool) {
	isValidName := len(firstName) >= 3
	isValidEmail := strings.Contains(email, "@")
	isValidTickets := tickets > 0

	return isValidName, isValidEmail, isValidTickets
}
