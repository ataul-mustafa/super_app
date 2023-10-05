import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/auth/SignUp';
import Categories from './components/categories/Categories';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/categories' element={<Categories />} />
      </Routes>
    </div>
  );
}

export default App;
