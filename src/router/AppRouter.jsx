import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from '../layout/Navbar.jsx'
import Landing from '../pages/Landing.jsx'
import InvestorDashboard from '../pages/InvestorDashboard.jsx'
import BrowseStartups from '../pages/BrowseStartups.jsx'
import StartupProfile from '../pages/StartupProfile.jsx'
import Messages from '../pages/Messages.jsx'
import InvestorProfile from '../pages/InvestorProfile.jsx'
import CreateStartup from '../pages/CreateStartup.jsx'

function AppRouter({ role, setRole }) {
  return (
    <BrowserRouter>
      <Navbar role={role} />
      <Routes>
        <Route path="/" element={<Landing setRole={setRole} />} />
        <Route
          path="/dashboard"
          element={
            role === 'investor' ? (
              <InvestorDashboard />
            ) : role === 'founder' ? (
              <Navigate to="/create" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/browse"
          element={
            role === 'investor' ? (
              <BrowseStartups />
            ) : role === 'founder' ? (
              <Navigate to="/create" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/startup/:id"
          element={
            role === 'investor' ? (
              <StartupProfile />
            ) : role === 'founder' ? (
              <Navigate to="/create" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/messages"
          element={
            role === 'investor' ? (
              <Messages />
            ) : role === 'founder' ? (
              <Navigate to="/create" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="/profile" element={<InvestorProfile />} />
        <Route
          path="/create"
          element={
            role === 'founder' ? (
              <CreateStartup />
            ) : role === 'investor' ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
