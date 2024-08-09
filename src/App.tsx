import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import theme from './utils/theme';
import Sidebar from './components/Sidebar';
import Customers from './pages/Customers';
import CreateCustomer from './pages/CreateCustomer';
import Jobs from './pages/Jobs';
import CreateJob from './pages/CreateJob';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
            <Route path="/" element={<Customers />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/customers/create" element={<CreateCustomer />} />
              <Route path="/customers/customer" element={<Jobs />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/create" element={<CreateJob />} />
            </Routes>
          </Box>
        </Box>
      </Router>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;