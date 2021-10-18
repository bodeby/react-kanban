import './App.css';

// Components
import { Header } from './Components/Header/Header';
import { Kanban } from './Components/Kanban/Kanban';

function App() {
  return (
    <div className="App">
        <Header/>

        <main>

          <Kanban/>
        </main>
    </div>
  );
}

export default App;
