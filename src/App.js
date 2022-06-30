import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/protectedRoute';
import SearchJob from './pages/searchJob'
import ShowProfile from './pages/showProfile';
import Login from './pages/auth/login';
import Register from './pages/auth/register';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        <Route exact path="/register" element={<Register/>}></Route>
        <Route exact path="/" element={<ProtectedRoute/>}>
          <Route exact path="/dashboard" element={<SearchJob/>}></Route>
        </Route>
        <Route exact path="/" element={<ProtectedRoute/>}>
          <Route exact path="/viewProfile/:id" element={<ShowProfile/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
