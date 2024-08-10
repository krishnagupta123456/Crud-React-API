import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Crud from './Crud';
import './App.css';

function App() {
  return (
    <Router>
            <div className="App">
                <header className="app-header">
                    <h1>My Application</h1>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Crud />} /> 
                        
                    </Routes>
                </main>
            </div>
        </Router>
  );
}

export default App;
