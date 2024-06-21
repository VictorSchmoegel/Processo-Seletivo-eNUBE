package db

import (
	"context"
	"log"
	"os"
	"sync"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	clientInstance *mongo.Client
	clientOnce     sync.Once
)

func getClient() *mongo.Client {
	clientOnce.Do(func() {
		if err := godotenv.Load(); err != nil {
			log.Println("No .env file found")
		}

		uri := os.Getenv("MONGO_URI")
		if uri == "" {
			log.Fatal("No MONGO_URI provided")
		}

		client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
		if err != nil {
			panic(err)
		}

		clientInstance = client
	})

	return clientInstance
}

func GetUsersCollection() *mongo.Collection {
	client := getClient()
	return client.Database("processo_seletivo").Collection("users")
}

func Disconnect() {
	if clientInstance != nil {
		if err := clientInstance.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}
}
