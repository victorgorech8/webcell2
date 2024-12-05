import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Chat from './Chat';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:id" element={<Chat />} />
        </Routes>
    );
};

export default App;
