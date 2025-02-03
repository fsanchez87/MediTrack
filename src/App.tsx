import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import './App.css'

import UsersList from './components/UsersList'
import UserProfile from './components/UserProfile';
import { ThemeProvider } from "./context/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path='/' element={<UsersList/>} />
            <Route path='/users/:userId' element={<UserProfile/>} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
