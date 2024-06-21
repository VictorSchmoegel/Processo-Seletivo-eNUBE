import Logo from '../assets/logo.png'

export default function SignIn() {
  return (
    <main className="bg-slate-100 min-h-screen">
      <div className="flex flex-col gap-4 max-w-lg mx-auto p-20">
        <h1 className="text-sky-900 text-2xl font-bold mb-6 text-center flex flex-col"><img src={Logo} alt="" />Sign In</h1>
        <form className="flex flex-col gap-4">
          <input
            className='border p-3 rounded-lg'
            type='text'
            id='nome'
            placeholder='Nome'
          />
          <input
            className='border p-3 rounded-lg'
            type='password'
            id='password'
            placeholder='Senha'
          />
          <button
            className='bg-sky-900 text-white p-3 rounded-lg'
            type='submit'
          >
            Cadastrar
          </button>
        </form>
      </div>
    </main>
  )
}
