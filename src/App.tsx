import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import './App.css'

import { ThemeProvider } from "./context/theme-provider";
import DashboardLayout from "./app/dashboard/layout";
import UserDetails from "./app/user-details/page";
import UsersList from "./app/user-list/page";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route index path='/' element={<Navigate to="/dashboard/users" replace />} />
          <Route element={<DashboardLayout/>} >
            <Route index path='/dashboard/' element={<Navigate to="/dashboard/users" replace />} />
            <Route path='/dashboard/users' element={<UsersList/>} />                
            <Route path='/dashboard/users/:userId/overview' element={<UserDetails/>} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;
