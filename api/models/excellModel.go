package models

type Partner struct {
	PartnerId   string `json:"partner_id"`
	PartnerName string `json:"partner_name"`
}

type Customer struct {
	CustomerId   string `json:"customer_id"`
	CustomerName string `json:"customer_name"`
}

type Invoice struct {
	InvoiceNumber string `json:"invoice_number"`
	ProductId     string `json:"product_id"`
	ProductName   string `json:"product_name"`
	Quantity      string `json:"quantity"`
	UnitPrice     string `json:"unit_price"`
	TotalPrice    string `json:"total_price"`
}

type Product struct {
	ProductId   string `json:"product_id"`
	ProductName string `json:"product_name"`
	Quantity    string `json:"quantity"`
	UnitPrice   string `json:"unit_price"`
	TotalPrice  string `json:"total_price"`
}
