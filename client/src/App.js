import './App.css';
import Contador from './componentes/Recipe/Recipes';
import { NavBar } from './componentes/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <h1>Henry Food</h1>
      <Contador />
    </div>
  );
}

export default App;
