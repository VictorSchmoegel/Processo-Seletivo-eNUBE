package controllers

import (
	"net/http"
	"processo-seletivo/api/models"

	"github.com/gin-gonic/gin"
	"github.com/xuri/excelize/v2"
)

func ReadExcel(c *gin.Context) (*excelize.File, error) {
	f, err := excelize.OpenFile("../file.xlsx")
	if err != nil {
		return nil, err
	}
	return f, nil
}

func GetPartners(c *gin.Context) {
	f, err := ReadExcel(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer f.Close()

	rows, err := f.GetRows("Planilha1")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var partners []models.Partner
	for _, row := range rows[1:] {
		partner := models.Partner{
			PartnerId:   row[0],
			PartnerName: row[1],
		}
		partners = append(partners, partner)
	}

	c.JSON(http.StatusOK, partners)
}

func GetCustomers(c *gin.Context) {
	f, err := ReadExcel(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer f.Close()

	rows, err := f.GetRows("Planilha1")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var customers []models.Customer
	for _, row := range rows[1:] {
		customer := models.Customer{
			CustomerId:     row[2],
			CustomerName:   row[3],
			CustomerDomain: row[4],
		}
		customers = append(customers, customer)
	}

	c.JSON(http.StatusOK, customers)
}

func GetProducts(c *gin.Context) {
	productIdOrName := c.Param("productId")
	f, err := ReadExcel(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer f.Close()

	rows, err := f.GetRows("Planilha1")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	for _, row := range rows[1:] {
		if row[9] == productIdOrName || row[13] == productIdOrName {
			product := models.Product{
				ProductId:   row[8],
				ProductName: row[13],
				Quantity:    row[34],
				UnitPrice:   row[33],
			}
			c.JSON(http.StatusOK, product)
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
}

func GetCustomersByCountry(c *gin.Context) {
	country := c.Param("country")
	f, err := ReadExcel(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer f.Close()

	rows, err := f.GetRows("Planilha1")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var customers []models.Customer
	for _, row := range rows[1:] {
		if row[5] == country {
			customer := models.Customer{
				CustomerId:   row[2],
				CustomerName: row[3],
			}
			customers = append(customers, customer)
		}
	}
	if len(customers) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "No customers found for the specified country"})
		return
	}

	c.JSON(http.StatusOK, customers)
}
