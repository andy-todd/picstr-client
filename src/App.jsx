import React from 'react';
import { useAuth } from './contexts/AuthContext.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes/routes.jsx';
import Navbar from './components/Navbar';

const App = () => {
  const { loading } = useAuth();

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <Router>
      <Navbar />
      <Routes>
        {routes.map(({ path, element }, i) => (
          <Route key={i} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
