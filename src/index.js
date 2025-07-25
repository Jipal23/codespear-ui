import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from "react-router-dom";
import { AuthProvider } from './AuthContext'; // ✅ import AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider> {/* ✅ Wrap App with AuthProvider */}
      <Route component={App} />
    </AuthProvider>
  </BrowserRouter>
);

reportWebVitals();
