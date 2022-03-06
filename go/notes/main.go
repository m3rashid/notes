package main

import (
	mypack "booking-app/myPack"
	"fmt"
	"strconv"
)

func main() {
	const conferenceName = "Go Conference"
	const conferenceTickets = 50
	var remainingTickets uint = 50
	// variables (var) can be declared with shorthand notation like
	// conferenceTickets := 50 would do the same thing
	mypack.PrintName()

	// types of the variables
	fmt.Printf("conferenceTickets: %T\n", conferenceTickets)
	fmt.Printf("conferenceName %T\n", conferenceName)

	fmt.Println("Welcome to the", conferenceName, "booking application")
	fmt.Println("Get your tickets here to attend the conference")

	fmt.Println("There are", conferenceTickets, "tickets available")
	fmt.Printf("There are %v tickets remaining\n", remainingTickets)
	// learn more about other format specifiers here: https://golang.org/pkg/fmt/

	// var bookings [50]string // initializing an array
	var bookings []string // initializing a slice

	var username string
	var userTickets uint

	fmt.Printf("Enter your name: ") // taking user input with fmt.Scan
	fmt.Scan(&username)

	fmt.Printf("\nEnter the number of tickets you want: ")
	fmt.Scan(&userTickets)

	// getting this functionality from the helper.go file
	isValidName, isValidEmail, isValidTIcketCount := validateUserInput("username", "me@me.com", 12)
	if isValidName && isValidEmail && isValidTIcketCount {
		fmt.Println("Everything is valid")
	}
	//  to now run this file, you need to run the following command:
	// go run main.go helper.go
	// or
	// tell go to run all the files in the current directory like
	// go run *.go
	// or
	// go run .

	// Arrays and slices in go
	// bookings[0] = username // accessing an arary
	bookings = append(bookings, username) // appending to a slice
	fmt.Println(bookings)

	fmt.Println("\nHi", username, "you have", userTickets, "tickets")
	remainingTickets = conferenceTickets - userTickets
	fmt.Println("Remaining tickets:", remainingTickets)

	// for loop in go (the below examples run indefinitely till you break out of them)
	// for{
	// code block
	// if else in go
	// if condition {
	// code block if condition is true
	// } else {
	// code block if condition is false
	// }
	// }

	// for loop with conditions
	// for remainingTIckets > 0 && conferenceTickets > 0 { code block  }

	// for each loop in go
	// for index,booking := bookings {
	// first variable is the index, second is the value
	// }

	// switch statements
	// switch condition {
	// case "condition":
	// check for single condition
	// case "condition1", "condition2""
	// case with multiple conditions
	// }

	// maps in go
	var userData = make(map[string]string)
	// stored as key, value pairs
	userData["username"] = username
	userData["email"] = "me@email.com"
	// to convert the map to a string, use the following syntax
	//  go maps doesnt support mixed types, we can only have one type of data (key, value pairs) in a map
	userData["phone"] = strconv.FormatUint(uint64(userTickets), 10)

	var bookingsMap = make([]map[string]string, 0)
	bookingsMap = append(bookingsMap, userData)

	fmt.Println(bookingsMap)

	// structs in go
	type UserData struct {
		firstName       string
		lastName        string
		email           string
		numberOfTickets uint
	}

	var newBookings = make([]UserData, 0)
	var user = UserData{
		firstName:       "MD Rashid",
		lastName:        "Hussain",
		email:           "rashid@gmail.com",
		numberOfTickets: 12,
	}
	newBookings = append(newBookings, user)
	fmt.Println(newBookings)

	// use go keyword in front of the functions which take more time to complete

}

// go routines
// creating wait groups
// var wg = sync.WaitGroup{}

// func main() {
// 	// this function takes time, so we add a separate thread in this
// 	wg.Add(1) // add 1 (number of threads)
// 	longTimeFunction()
// 	wg.Wait() // wait for the inner functions to complete
// }

// func longTimeFunction() {
// 	time.Sleep(20 * time.Second)
// 	wg.Done() // removes the thread after completion
// }

// go routines implement something called "green threads", these are not the OS threads but go's internal implementation of threads, go routines can talk to each other in a safe and secure manner (different from other languages which support concurrency like java)

// about wg.Add(n)
// n depends on how much we want to wait
//  or in general terms how many green threads are required
// for example, if we want to stop for two functions that take time, we can separate out two additional threads. so n will be 2 like wg.Add(2)

// about wg.Wait()
// tells go that we want to wait for all the threads to complete before exiting
