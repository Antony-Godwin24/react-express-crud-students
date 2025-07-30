import './App.css';
import Home from './Home.js';
import Add from './Add.js';
import Update from './Update.js';
import Show from './Show.js';
import Delete from './Delete.js';
import Search from './Search.js';
import Register from './Register.js';
import Login from './Login.js';
import Signup from './Signup.js';
import Admin from './Admin.js';
import Stdnts from './Stdnts.js';
import Notice from './Notice.js';
import NoticeView from './NoticeView.js';
import UpdateMe from './UpdateMe.js';
import React,{useState} from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [userName,setUserName]=useState('');
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/search' element={<Search />} />
          <Route path='/show' element={<Show />} />
          <Route path='/update' element={<Update />} />
          <Route path='/delete' element={<Delete />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login userName={userName} setUserName={setUserName}/>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/admin' element={<Admin userName={userName} setUserName={setUserName}/>} />
          <Route path='/stdnts' element={<Stdnts userName={userName} setUserName={setUserName}/>} />
          <Route path='/notice' element={<Notice />} />
          <Route path='/notice-view' element={<NoticeView />} />
          <Route path='/update-me/:userName' element={<UpdateMe />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
