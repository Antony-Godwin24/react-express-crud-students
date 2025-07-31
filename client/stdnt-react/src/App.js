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
import Profile from './Profile.js';
import Notice from './Notice.js';
import NoticeView from './NoticeView.js';
import UpdateMe from './UpdateMe.js';
import EditNotice from './EditNotice.js';
import Logout from './Logout.js';
import React,{useState} from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '');
  const [roll,setRoll]=useState('');
  const [dept,setDept]=useState('');
  const [city,setCity]=useState('');
  const [pin,setPin]=useState('');
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
          <Route path='/login' element={<Login userName={userName} setUserName={setUserName} roll={roll} setRoll={setRoll} dept={dept} setDept={setDept} city={setCity} setCity={setCity} pin={pin} setPin={setPin} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/admin' element={<Admin Login userName={userName}/>} />
          <Route path='/stdnts' element={<Stdnts Login userName={userName}/>} />
          <Route path='/profile' element={<Profile Login userName={userName} setUserName={setUserName} roll={roll} setRoll={setRoll} dept={dept} setDept={setDept} city={setCity} setCity={setCity} pin={pin} setPin={setPin} />} />
          <Route path='/notice' element={<Notice />} />
          <Route path='/notice-view' element={<NoticeView />} />
          <Route path='/update-me/:userName' element={<UpdateMe />} />
          <Route path='/editNotice/:info/:id' element={<EditNotice />} />
          <Route path='/logout' element={<Logout userName={userName} setUserName={setUserName} />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
