import './App.css';
import { Header } from './components/Header';
import { HandleTodoList } from './components/HandleTodoList';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="App">
      <div className='pageContent'>
        <Header />
        <HandleTodoList/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
