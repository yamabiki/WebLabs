import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import Catalog from './components/Catalog';
import Item from './components/Item';
import './App.css';

const App = () => (
    <div className="App">
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/catalog/:id" element={<Item />} />
            </Routes>
            <Footer />
        </Router>
    </div>
);

export default App;