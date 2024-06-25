package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID       primitive.ObjectID `bson:"_id,omitempty"`
	UserName string             `json:"username" bson:"username" validate:"required" unique:"true"`
	Password string             `json:"password" bson:"password" validate:"required"`
}
