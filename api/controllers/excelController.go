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
			CustomerId:   row[2],
			CustomerName: row[3],
		}
		customers = append(customers, customer)
	}

	c.JSON(http.StatusOK, customers)
}

func GetInvoice(c *gin.Context) {
	invoiceNumber := c.Param("invoiceNumber")
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
		if row[9] == invoiceNumber {
			invoice := models.Invoice{
				InvoiceNumber: row[9],
				ProductId:     row[10],
				ProductName:   row[11],
				Quantity:      row[12],
				UnitPrice:     row[13],
				TotalPrice:    row[14],
			}
			c.JSON(http.StatusOK, invoice)
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"error": "Invoice not found"})
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

	c.JSON(http.StatusOK, customers)
}
