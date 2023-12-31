import React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MemberList from './pages/memberList';
import MemberDetails from './pages/MemberDetails';
import Login from './pages/login';
import './App.css';
import Scanner from './components/Scanner';

// import ProtectedRoute from './components/ProtectedRoute';
import LogoutButton from './pages/logout';

function App() {
  return (
    <ChakraProvider theme={theme} cssVarsRoot="#app">
      <Router>
        <Box>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<LogoutButton />} />
            <Route path="/scan" element={<Scanner />} />
            {/* <Route
              path="/home"
              element={<ProtectedRoute NewComponent={MemberList} />}
            /> */}
            <Route path="/member/all" element={<MemberList />} />

            <Route path="/member/one/:member_id" element={<MemberDetails />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
