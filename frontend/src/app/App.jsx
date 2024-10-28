import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import NotFound404 from '../pages/NotFound404';
import store from '../app/store';
import { Provider } from 'react-redux';



function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='*' element={<NotFound404/>} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
