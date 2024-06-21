package routes

import (
	"net/http"
	"processo-seletivo/api/controllers"
	"processo-seletivo/api/middlewares"

	"github.com/gin-gonic/gin"
)

func HandleRequests() *gin.Engine {
	r := gin.Default()
	r.POST("/createuser", controllers.CreateUser)
	r.POST("/auth", controllers.AuthUser)
	auth := r.Group("/")
	auth.Use(middlewares.AuthMiddleware())
	{
		auth.GET("/protected-route", func(c *gin.Context) {
			username := c.MustGet("username").(string)
			c.JSON(http.StatusOK, gin.H{"message": "Hello " + username})
		})
	}
	return r
}
