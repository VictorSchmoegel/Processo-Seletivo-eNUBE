import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Consulta() {
  const [partners, setPartners] = useState([])
  const [customers, setCustomers] = useState([])
  const [product, setProduct] = useState(null);
  const [country, setCountry] = useState('')
  const [productId, setProductId] = useState('');
  const [countryCustomers, setCountryCustomers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    partners: false,
    customers: false,
    product: false,
    countryCustomers: false
  });
  const [errors, setErrors] = useState({
    partners: null,
    customers: null,
    product: null,
    countryCustomers: null
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/checkauth", {
          method: "GET",
          credentials: "include"
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          alert("Usuário não autorizado, faça o login");
          navigate("/login");
        }
      } catch (error) {
        console.error("falha ao autenticar autorização:", error);
        alert("Usuário não autorizado, faça o login");
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  const fetchPartners = async () => {
    setLoading(prev => ({ ...prev, partners: true }));
    try {
      const response = await fetch('/api/partners');
      const data = await response.json();
      const uniquePartners = Array.from(new Set(data.map(p => JSON.stringify(p)))).map(p => JSON.parse(p));
      setPartners(uniquePartners);
      setErrors(prev => ({ ...prev, partners: null }));
    } catch (error) {
      setErrors(prev => ({ ...prev, partners: 'Erro ao carregar parceiros' }));
    } finally {
      setLoading(prev => ({ ...prev, partners: false }));
    }
  };

  const fetchCustomers = async () => {
    setLoading(prev => ({ ...prev, customers: true }));
    try {
      const response = await fetch('/api/customers');
      const data = await response.json();
      const uniqueCustomers = Array.from(new Set(data.map(p => JSON.stringify(p)))).map(p => JSON.parse(p));
      setCustomers(uniqueCustomers);
      setErrors(prev => ({ ...prev, customers: null }));
    } catch (error) {
      setErrors(prev => ({ ...prev, customers: 'Erro ao carregar clientes' }));
    } finally {
      setLoading(prev => ({ ...prev, customers: false }));
    }
  };

  const fetchProduct = async () => {
    setLoading(prev => ({ ...prev, product: true }));
    setErrors(prev => ({ ...prev, product: null }));
    try {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      if (response.status === 404) {
        setErrors(prev => ({ ...prev, product: 'Produto não encontrado' }));
        setProduct(null);
      } else {
        setProduct(data);
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, product: 'Erro ao carregar produto' }));
    } finally {
      setLoading(prev => ({ ...prev, product: false }));
    }
  };

  const fetchCountryCustomers = async () => {
    setLoading(prev => ({ ...prev, countryCustomers: true }));
    setErrors(prev => ({ ...prev, countryCustomers: null }));
    try {
      const response = await fetch(`/api/customers/${country}`);
      const data = await response.json();
      const uniqueCustomers = Array.from(new Set(data.map(p => JSON.stringify(p)))).map(p => JSON.parse(p));
      if (response.status === 404) {
        setErrors(prev => ({ ...prev, countryCustomers: 'País não encontrado' }));
        setCountryCustomers([]);
      } else {
        setCountryCustomers(uniqueCustomers);
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, countryCustomers: 'Erro ao carregar clientes por país' }));
    } finally {
      setLoading(prev => ({ ...prev, countryCustomers: false }));
    }
  };

  return (
    <main className="bg-slate-100 flex mx-auto">
    <div className="flex flex-col gap-4 max-w-lg mx-auto p-20">
      <h1 className="text-2xl font-bold mb-4 text-center">Consulta</h1>
      <form className="flex flex-col gap-4">

        {/* consulta de parceiros */}
        <section className="border max-w-lg flex justify-between">
          <h2 className="mt-auto mb-auto p-2 text-center">Consulte Parceiros</h2>
          <button
            onClick={fetchPartners}
            className="bg-blue-500 text-white p-2 rounded"
            disabled={loading.partners}
          >
            {loading.partners ? 'Carregando...' : 'Consultar Parceiros'}
          </button>
        </section>
        {errors.partners && <p className="text-red-500">{errors.partners}</p>}

        {/* consulta de clientes */}
        <section className="border max-w-lg flex justify-between">
          <h2 className="mt-auto mb-auto p-2">Consulte Clientes</h2>
          <button
            onClick={fetchCustomers}
            className="bg-blue-500 text-white p-2 rounded"
            disabled={loading.customers}
          >
            {loading.customers ? 'Carregando...' : 'Consultar Clientes'}
          </button>
        </section>
        {errors.customers && <p className="text-red-500">{errors.customers}</p>}

        {/* consulta de produtos */}
        <section className="border max-w-lg flex justify-between">
          <input
            type="text"
            placeholder="Nome ou ID do Produto"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={fetchProduct}
            className="bg-blue-500 text-white p-2 rounded min-w-28"
            disabled={loading.product}
          >
            {loading.product ? 'Carregando...' : 'Consultar Produto'}
          </button>
        </section>
        {errors.product && <p className="text-red-500">{errors.product}</p>}

        {/* consulta de clientes por país */}
        <section className="border max-w-lg flex justify-between">
          <input
            type="text"
            placeholder="País"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={fetchCountryCustomers}
            className="bg-blue-500 text-white p-2 rounded"
            disabled={loading.countryCustomers}
          >
            {loading.countryCustomers ? 'Carregando...' : 'Consultar Clientes por País'}
          </button>
        </section>
        {errors.countryCustomers && <p className="text-red-500">{errors.countryCustomers}</p>}
      </form>
    </div>

    <div className="flex flex-col gap-4 max-w-lg mx-auto p-20">
      <section>
        {loading.partners ? '' : (
          partners.length > 0 && (
            <ul className="mt-4">
              {partners.map((partner, index) => (
                <li key={index}>
                  <div className="border font-semibold">
                    <h3 className="text-center p-3 uppercase underline">Consulta de Parceiros</h3>
                    <p>Nome do Parceiro: {partner.partner_name}</p>
                    <p>Parceiro ID: {partner.partner_id}</p>
                    <button
                      className="bg-red-500 text-white p-2 rounded"
                      onClick={() => setPartners([])}
                    >
                      Limpar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )
        )}
      </section>
      <section>
        {loading.customers ? '' : (
          customers.length > 0 && (
            <div>
              <h3 className="text-center p-3 uppercase underline">Consulta de Clientes</h3>
              <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="border p-2">Nome do Cliente</th>
                    <th className="border p-2">Cliente ID</th>
                    <th className="border p-2">Domínio</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => (
                    <tr key={index}>
                      <td className="border p-2">{customer.customer_name}</td>
                      <td className="border p-2">{customer.customer_id}</td>
                      <td className="border p-2">{customer.customer_domain}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className="bg-red-500 text-white p-2 rounded mt-4"
                onClick={() => setCustomers([])}
              >
                Limpar
              </button>
            </div>
          )
        )}
      </section>
      <section>
        {loading.product ? '' : (
          product ? (
            <div className="border flex flex-col gap-2">
              <p className="font-semibold p-2">ID do Produto: {product.product_id}</p>
              <p className="font-semibold p-2">Nome do produto: {product.product_name}</p>
              <p className="font-semibold p-2">Quantidade: {product.quantity}</p>
              <p className="font-semibold p-2">Preço Unitário: {product.unit_price}</p>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => setProduct(null)}
              >
                Limpar
              </button>
            </div>
          ) : (
            errors.product && <p>{errors.product}</p>
          )
        )}
      </section>
      <section>
          {loading.countryCustomers ? '' : (
            countryCustomers.length > 0 ? (
              <div>
                <h3 className="text-center p-3 uppercase underline">Consulta de Clientes por País</h3>
                <table className="table-auto w-full border-collapse border border-gray-200">
                  <thead>
                    <tr>
                      <th className="border p-2">Nome do Cliente</th>
                      <th className="border p-2">Cliente ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {countryCustomers.map((customer, index) => (
                      <tr key={index}>
                        <td className="border p-2">{customer.customer_name}</td>
                        <td className="border p-2">{customer.customer_id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  className="bg-red-500 text-white p-2 rounded mt-4"
                  onClick={() => setCountryCustomers([])}
                >
                  Limpar
                </button>
              </div>
            ) : (
              errors.countryCustomers && <p className="text-red-500">{errors.countryCustomers}</p>
            )
          )}
        </section>
    </div>
  </main>
  );
}
