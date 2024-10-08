import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fontsource/poppins';
import HomePage from './HomePage.jsx';
import PastePage from './PastePage.jsx';
import ErrorPage from './ErrorPage.jsx';

const theme = extendTheme({
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:hash" element={<PastePage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  </StrictMode>
);
