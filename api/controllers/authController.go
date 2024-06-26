package controllers

import (
	"net/http"
	"processo-seletivo/api/db"
	"processo-seletivo/api/models"
	"processo-seletivo/api/utils"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func CreateUser(c *gin.Context) {
	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	collection := db.GetUsersCollection()

	var existingUser models.User
	err := collection.FindOne(c, bson.M{"username": user.UserName}).Decode(&existingUser)
	if err != nil && err != mongo.ErrNoDocuments {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	if existingUser.UserName != "" {
		c.JSON(400, gin.H{"error": "Usuário já cadastrado"})
		return
	}

	hashedPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to hash password"})
		return
	}
	user.Password = hashedPassword

	_, err = collection.InsertOne(c, user)
	if err != nil {
		c.JSON(500, gin.H{"error": "Erro ao criar usuário"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Usuário criado com sucesso"})
}

func AuthUser(c *gin.Context) {
	var credentials struct {
		UserName string `json:"username" validate:"required"`
		Password string `json:"password" validate:"required"`
	}

	if err := c.ShouldBindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	collection := db.GetUsersCollection()
	var user models.User
	err := collection.FindOne(c, bson.M{"username": credentials.UserName}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuário ou senha inválidos"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if !utils.CheckPasswordHash(credentials.Password, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuário ou senha inválidos"})
		return
	}

	token, err := utils.GenerateJWT(user.ID.Hex())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erro ao gerar token de autenticação"})
		return
	}

	c.SetCookie("access_token", token, 3600*24, "/", "localhost", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "Atenticado com sucesso", "token": token})
}

func CheckAuth(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "User is authenticated"})
}
