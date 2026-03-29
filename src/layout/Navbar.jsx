import { Link } from 'react-router-dom'

function Navbar({ role }) {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <Link className="topbar__brand" to="/">
          Startly
        </Link>
        <nav className="topbar__nav">
          {role === 'investor' && (
            <>
              <Link className="topbar__link" to="/browse">
                Browse
              </Link>
              <Link className="topbar__link" to="/saved">
                Saved
              </Link>
              <Link className="topbar__link" to="/investor/requests">
                Requests
              </Link>
              <Link className="topbar__link" to="/messages">
                Messages
              </Link>
              <Link className="topbar__link" to="/profile">
                Profile
              </Link>
            </>
          )}

          {role === 'founder' && (
            <>
              <Link className="topbar__link" to="/create">
                Create Startup
              </Link>
              <Link className="topbar__link" to="/requests">
                Requests
              </Link>
              <Link className="topbar__link" to="/profile">
                Profile
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
