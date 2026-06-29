import { browserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Catalogo from './Catalogo';
import Cestaspersonalizadas from './cestaspersonalizadas';
import Contato from './Contato';
import Pedidos from './Pedidos';
import ProdutosRegionais from './ProdutosRegionais';
import Sobre from './Sobre';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/catalogo" 
        element={<Catalogo />} />

        <Route path="/cestas-personalizadas" 
        element={<Cestaspersonalizadas />} />

        <Route path="/contato" 
        element={<Contato />} />

        <Route path="/pedidos" 
        element={<Pedidos />} />

        <Route path="/produtos-regionais" 
        element={<ProdutosRegionais />} />

        <Route path="/sobre" 
        element={<Sobre />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App;