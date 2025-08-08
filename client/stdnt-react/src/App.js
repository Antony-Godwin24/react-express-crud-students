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
import ShowAllUsers from './ShowAllUsers.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import {useState} from 'react'
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
          <Route path='/add' element={<ProtectedRoute role='admin'><Add /></ProtectedRoute>} />
          <Route path='/search' element={<ProtectedRoute role='both'><Search /></ProtectedRoute>} />
          <Route path='/show' element={<ProtectedRoute role='both'><Show /></ProtectedRoute>} />
          <Route path='/update' element={<ProtectedRoute role='admin'><Update /></ProtectedRoute>} />
          <Route path='/delete' element={<ProtectedRoute role='admin'><Delete /></ProtectedRoute>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login userName={userName} setUserName={setUserName} roll={roll} setRoll={setRoll} dept={dept} setDept={setDept} city={setCity} setCity={setCity} pin={pin} setPin={setPin} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/admin' element={
            <ProtectedRoute role='admin'>
              <Admin Login userName={userName} />
            </ProtectedRoute>
          } />

          <Route path='/stdnts' element={<ProtectedRoute role='stdnt'><Stdnts Login userName={userName}/></ProtectedRoute>} />

          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile Login userName={userName} setUserName={setUserName} roll={roll} setRoll={setRoll} dept={dept} setDept={setDept} city={city} setCity={setCity} pin={pin} setPin={setPin} />
            </ProtectedRoute>
          } />

          <Route path='/notice' element={
            <ProtectedRoute role='admin'>
              <Notice />
            </ProtectedRoute>
          } />
          <Route path='/notice-view' element={
            <ProtectedRoute>
              <NoticeView />
            </ProtectedRoute>
          } />

          <Route path='/update-me/:userName' element={<ProtectedRoute role='both'><UpdateMe /></ProtectedRoute>
            
          } />
          <Route path='/editNotice/:info/:id' element={
            <ProtectedRoute role='admin'>
              <EditNotice />
            </ProtectedRoute>
          } />
          <Route path='showAllUsers' element={
            <ProtectedRoute>
              <ShowAllUsers />
            </ProtectedRoute>
            }
          />
          <Route path='/logout' element={<Logout userName={userName} setUserName={setUserName} />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
