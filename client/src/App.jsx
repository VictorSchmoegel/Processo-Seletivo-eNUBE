import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Login from './pages/Login'
import Consulta from './pages/Consulta'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/consulta" element={<Consulta />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
