package main

import (
	"processo-seletivo/api/db"
	"processo-seletivo/api/routes"
)

func main() {
	defer db.Disconnect()
	r := routes.HandleRequests()
	if err := r.Run(":3000"); err != nil {
		panic(err)
	}
}
