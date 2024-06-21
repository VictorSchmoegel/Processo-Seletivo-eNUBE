import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Logo from '../assets/logo.png'

export default function Cadastro() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('/api/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      setError(false)
      const data = await response.json()
      console.log(data)
      navigate('/')
    } else {
      const data = await response.json()
      setError(data.error)
      console.log('Erro ao criar usuario', data.error)
    }
      
  }

  return (
    <main className="bg-slate-100 min-h-screen">
      <div className="flex flex-col gap-4 max-w-lg mx-auto p-20">
        <h1 className="text-sky-900 text-2xl font-bold mb-6 text-center flex flex-col"><img src={Logo} alt="" />SignIn</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className='border p-3 rounded-lg'
            required
            type='text'
            id='nome'
            placeholder='Nome'
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className='border p-3 rounded-lg'
            required
            type='password'
            id='password'
            placeholder='Senha'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className='bg-sky-900 text-white p-3 rounded-lg'
            type='submit'
          >
            Cadastrar
          </button>
        </form>
        {error && <p className='text-red-500'>Não foi possível cadastrar o usuário</p>}
      </div>
    </main>
  )
}
