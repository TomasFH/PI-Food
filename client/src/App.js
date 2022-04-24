import './App.css';
import Contador from './componentes1/contador';
import NavBar from './componentes1/NavBar';
import RecipeCards from './componentes1/recipeCard';

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <Contador /> si algo llega a romper, recordemos que al menos hice un contador :') */} 
      <RecipeCards />
    </div>
  );
}

export default App;
