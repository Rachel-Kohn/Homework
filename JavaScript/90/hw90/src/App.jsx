import { Outlet } from 'react-router';
import Header from './Header';
import './App.css';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}