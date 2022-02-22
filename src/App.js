import './App.css';
import List from './pages/List';
import Main from './pages/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </Router>
  );
}

export default App;
