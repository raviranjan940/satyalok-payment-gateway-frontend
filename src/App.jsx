import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Success from './components/success/Success';
import Failure from './components/failure/Failure';
import Payment from './components/payment/Payment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
      </Routes>
    </Router>
  );
}

export default App;
