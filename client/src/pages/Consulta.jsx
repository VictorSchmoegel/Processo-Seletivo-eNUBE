import { useState } from "react"

export default function Consulta() {
  const [partners, setPartners] = useState([])
  const [customers, setCustomers] = useState([])
  const [product, setProduct] = useState(null);
  const [country, setCountry] = useState('')
  const [productId, setProductId] = useState('');
  const [countryCustomers, setCountryCustomers] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPartners = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('/api/partners')
    const data = await response.json()
    const uniquePartners = Array.from(new Set(data.map(p => JSON.stringify(p)))).map(p => JSON.parse(p));
    setPartners(uniquePartners)
    setLoading(false)
  }

  const fetchCustomers = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('/api/customers')
    const data = await response.json()
    const uniqueCustomers = Array.from(new Set(data.map(p => JSON.stringify(p)))).map(p => JSON.parse(p));
    setCustomers(uniqueCustomers)
    setLoading(false)
  }

  const fetchProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`/api/products/${productId}`);
    const data = await response.json();
    console.log(data);
    setProduct(data);
    setLoading(false);
  };

  const fetchCountryCustomers = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`/api/customers/${country}`);
    const data = await response.json();
    setCountryCustomers(data);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Consulta</h1>
      <form onSubmit={fetchPartners} className="mb-6">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Consultar Parceiros
        </button>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          partners.length > 0 && (
            <ul className="mt-4">
              {partners.map((partner, index) => (
                <li key={index}>
                  <div className="border font-semibold">
                    <p>Parceiro ID: {partner.partner_id}</p>
                    <p>Nome do Parceiro: {partner.partner_name}</p>
                  </div>
                </li>
              ))}
            </ul>
          )
        )}
      </form>

      <form onSubmit={fetchCustomers} className="mb-6">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Consultar Clientes
        </button>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          customers.length > 0 && (
            <ul className="mt-4">
              {customers.map((customer, index) => (
                <li key={index}>
                  <div className="border">
                    <p className="underline font-semibold">Nome do Cliente: {customer.customer_name}</p>
                    <p className="font-semibold">Cliente ID: {customer.customer_id}</p>
                  </div>
                </li>
              ))}
            </ul>
          )
        )}
      </form>

      <form onSubmit={fetchProduct} className="mb-6">
        <input
          type="text"
          placeholder="Nome do Produto"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Consultar Produto
        </button>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          product && (
            <div className="mt-4 border">
              <p>Produto ID: {product.product_id}</p>
              <p>Nome do Produto: {product.product_name}</p>
              <p>Quantidade: {product.quantity}</p>
              <p>Preço unitário: {product.unit_price}</p>
            </div>
          )
        )}
      </form>

      <form onSubmit={fetchCountryCustomers} className="mb-6">
        <input
          type="text"
          placeholder="País"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Consultar Clientes por País
        </button>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          countryCustomers.length > 0 && (
            <ul className="mt-4">
              {countryCustomers.map((customer, index) => (
                <li key={index}>
                  {customer.customer_id} - {customer.customer_name}
                </li>
              ))}
            </ul>
          )
        )}
      </form>
    </div>
  );
}
