import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import routes from './routes/mainRoutes.jsx';
import { BrowserRouter, Routes } from 'react-router-dom';
import AuthProvider from './provider/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {routes}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,


)
