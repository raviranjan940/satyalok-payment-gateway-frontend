import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Payment from './components/payment/Payment';
import Status from './components/status/Status';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Payment />} />
        <Route path="/status/:id" element={<Status />} />
      </Routes>
    </Router>
  );
}

export default App;
