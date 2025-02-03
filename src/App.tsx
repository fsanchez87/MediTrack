import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import './App.css'

import UsersList from './components/UsersList'
import UserProfile from './components/UserProfile';

function App() {
  return (
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
  )
}

export default App
