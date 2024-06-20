package routes

import (
	"log"
	"net/http"
	"processo-seletivo/api/controllers"
)

func HandleRequest() {
	http.HandleFunc("/", controllers.Home)
	log.Fatal(http.ListenAndServe(":3000", nil))
}
