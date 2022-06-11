import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";  
import SearchJob from './components/searchJob';
import ShowProfile from './components/showProfile';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path="/" element={<SearchJob/>}></Route>
        <Route exact path="/viewProfile/:id" element={<ShowProfile/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
