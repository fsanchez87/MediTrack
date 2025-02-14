import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import './App.css'

import UserProfile from './components/UserProfile';
import { ThemeProvider } from "./context/theme-provider";
import UsersList from "./app/user-list/page";
import { ModeToggle } from "./components/mode-toggle";
import UserDetailsLayout from "./app/user-details/layout";
import UserSensorSummary from "./components/UserSensorSummary";
import DashboardLayout from "./app/dashboard/layout";


function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {/* TODO: extract paths to external file */}
      <Router>
        <div>
          {/* <ModeToggle/> */}
          {/* <Link to="/users">Users - </Link> */}
          {/* <Link to="/">Home</Link>
          <Link to="/dashboard/users">- Dashboard</Link> */}
        </div>
        <Routes>
          <Route index path='/' element={<DashboardLayout/>} />
          <Route element={<DashboardLayout/>} >
            <Route index path='/dashboard/' element={<div><h1>Index dashboard</h1></div>} />
            <Route path='/dashboard/users' element={<UsersList/>} />
            <Route element={<UserDetailsLayout/>} >
              <Route path='/users/:userId/overview' element={<UserProfile/>} />
              <Route path='/users/:userId/sensors-summary' element={<UserSensorSummary />}/>
              <Route path='/users/:userId/sensors-graphs' element={<div><h1>Chart data</h1></div>} />
          </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
