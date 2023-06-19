import React from 'react';
import Forms from './components/Forms';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className='app'>
        <div className='auth-wrapper'>
          <div className='auth-inner'>
            <Routes>
              <Route exact path='/' element={<Forms/>}/>
              <Route path='/login' element={<Forms/>}/>
              <Route path='/register' element={<Forms/>}/>
              <Route path='/home' element={<Home />}/>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
