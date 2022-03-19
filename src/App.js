import List from './pages/List';
import Main from './pages/Main';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  const [showSaveMsg, setShowSaveMsg] = useState(false);
  const [showCompleteModifiedMsg, setShowCompleteModifiedMsg] = useState(false);

  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route
          path="/"
          element={<Main showSaveMsg={showSaveMsg} setShowSaveMsg={setShowSaveMsg} showCompleteModifiedMsg={showCompleteModifiedMsg} setShowCompleteModifiedMsg={setShowCompleteModifiedMsg} />}
        />
        <Route path="/list" element={<List setShowSaveMsg={setShowSaveMsg} />} />
      </Routes>
    </Router>
  );
}

export default App;
