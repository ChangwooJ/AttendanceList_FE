import './App.css';
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Attendance from './pages/Attendance';
import UserList from './pages/UserList';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/attendance' element={<Attendance />} />
        <Route path='/userlist' element={<UserList />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
