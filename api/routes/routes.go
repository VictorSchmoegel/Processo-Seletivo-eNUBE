package routes

import (
	"processo-seletivo/api/controllers"

	"github.com/gin-gonic/gin"
)

func HandleRequests() *gin.Engine {
	r := gin.Default()
	r.POST("/createuser", controllers.CreateUser)
	return r
}
