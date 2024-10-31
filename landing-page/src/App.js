import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
      <div className="App">
        <Header />
          <Features />
        <Hero />
        <Footer />
      </div>
  );
}

export default App;
