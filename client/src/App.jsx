import {BrowserRouter, Route, Routes} from 'react-router-dom'

import SignIn from './pages/SignIn'
import Consulta from './pages/Consulta'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/consulta" element={<Consulta />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
