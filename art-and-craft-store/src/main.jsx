import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import routes from './routes/mainRoutes.jsx';
import { BrowserRouter, Routes } from 'react-router-dom';
import AuthProvider from './provider/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {routes}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,


)
