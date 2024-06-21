package controllers

import (
	"net/http"
	"processo-seletivo/api/db"
	"processo-seletivo/api/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func CreateUser(c *gin.Context) {
	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	collection := db.GetUsersCollection()

	result, err := collection.InsertOne(c, bson.M{
		"id":       user.Id,
		"username": user.UserName,
		"password": user.Password,
	})

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User created successfully", "id": result.InsertedID})
}
