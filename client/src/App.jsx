import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Login from './pages/Login'
import Consulta from './pages/Consulta'
import Cadastro from './pages/Cadastro'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/consulta" element={<Consulta />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
