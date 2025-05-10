import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ModalProvider } from './contexts/ModalContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Global.css';
import './styles/Themes.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
        </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
