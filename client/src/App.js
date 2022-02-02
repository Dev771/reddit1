import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Form from './components/Form/Form';
import Auth from './components/auth/Auth';
import Tags from './components/tags/Tags';
import './Styles.css';

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/CreatePost' exact element={<Form />} />
                <Route path='/tag' exact element={<Tags />} />
                <Route path='/auth/:action' exact element={<Auth />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
