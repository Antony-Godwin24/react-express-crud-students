import './App.css';
import Home from './Home.js';
import Add from './Add.js';
import Update from './Update.js';
import Show from './Show.js';
import Delete from './Delete.js';
import Search from './Search.js';
import Nav from './Nav.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Nav />
        <Routes>  
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/search' element={<Search />} />
          <Route path='/show' element={<Show />} />
          <Route path='/update' element={<Update />} />
          <Route path='/delete' element={<Delete />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
