import './App.css';
import Contador from './componentes/Recipe/Recipes';
import { NavBar } from './componentes/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Contador />
    </div>
  );
}

export default App;
