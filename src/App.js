import VehicleState from './context/VehicleState'
import { Container } from './components/index'

import './layout/css/style.css'

function App() {
  return (
    <div className="main">
      <VehicleState>
        <Container />
      </VehicleState>
    </div>
  );
}

export default App;
