import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Logo from '../assets/logo.png'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        navigate('/consulta')
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Usuário não encontrado')
      }
    } catch (error) {
      setError('Erro ao fazer login')
    } finally {
      setLoading(false)
    } 
  }

  const handleRegisterClick = () => {
    navigate('/cadastro')
  }

  return (
    <main className="bg-slate-100 min-h-screen">
      <div className="flex flex-col gap-4 max-w-lg mx-auto p-20">
        <h1 className="text-sky-900 text-2xl font-bold mb-6 text-center flex flex-col"><img src={Logo} alt="logo" />Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className='border p-3 rounded-lg'
            type='text'
            id='nome'
            placeholder='Nome'
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className='border p-3 rounded-lg'
            type='password'
            id='password'
            placeholder='Senha'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className='bg-sky-900 text-white p-3 rounded-lg'
            type='submit'
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>
        <button
            className='bg-green-900 text-white p-3 rounded-lg'
            onClick={handleRegisterClick}
          >
            Cadastrar
          </button>
        {error && <p className='text-red-500'>{error}</p>}
      </div>
    </main>
  )
}
