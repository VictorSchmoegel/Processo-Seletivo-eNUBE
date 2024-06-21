package models

type User struct {
	Id       int    `json:"id"`
	UserName string `json:"username" validate:"required" unique:"true"`
	Password string `json:"password" validate:"required"`
}
