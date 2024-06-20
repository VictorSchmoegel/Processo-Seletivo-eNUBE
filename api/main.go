package main

import (
	"fmt"
	"processo-seletivo/api/routes"
)

func main() {

	fmt.Println("Iniciando API...")
	routes.HandleRequest()
}
