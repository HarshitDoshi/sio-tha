import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
// import App from './App.tsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  RouterProvider,
} from "react-router-dom";
import router from './router.tsx';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { BrandingProvider } from './utilities/theme/provider.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <CssBaseline />
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <QueryClientProvider client={queryClient}>
        <BrandingProvider>
          <RouterProvider router={router} />
        </BrandingProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  </StrictMode>,
)
