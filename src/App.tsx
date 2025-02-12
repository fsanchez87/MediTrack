import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import './App.css'

import UserProfile from './components/UserProfile';
import { ThemeProvider } from "./context/theme-provider";
import UsersList from "./app/user-list/page";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <div>
          {/* <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
            </ul>
            <ModeToggle/>
          </nav> */}
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
