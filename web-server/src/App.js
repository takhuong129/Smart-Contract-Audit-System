import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {Home} from './components/Home.js'
import {Login} from './components/Login.js'
import {Signup} from './components/Signup.js'
import {Navbar2} from './components/Navbar2.js';
import {Audit} from './components/Audit.js'
import { Account } from './components/Account.js';
import {Report} from './components/Report.js'
import { Footer } from './components/footer.js';
/**Remove after test */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  return (
    <div className="App">
        
          <Router>
            <Navbar2 isLoggedIn={isLoggedIn} setLoggedIn={setIsLoggedIn}/>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/audit-system' element={<Audit userData={userData} />}></Route>
              <Route path='/report-history' element={<Report userData={userData}/>}></Route>
              <Route path='/account' element={<Account  userData={userData}/>}></Route>
              <Route path='/login' element={<Login setLoggedIn={setIsLoggedIn} setUserData={setUserData}/>}></Route>
              <Route path='/signup' element={<Signup/>}></Route>
            </Routes>
          </Router>
        <Footer/>
    </div>
  );
}

export default App;
