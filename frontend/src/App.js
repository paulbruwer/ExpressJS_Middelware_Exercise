import './App.css';
import { React } from "react";
import { Routes, Route } from 'react-router-dom';
import Landing from './Components/Landing';
import Users from './Components/Users';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
