import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import UserPage from './pages/UserPage';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:userId" element={<UserPage />} />
      </Routes>
    </>
  );
}