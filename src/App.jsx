import { useState } from 'react'
import AppRouter from './router/AppRouter.jsx'

function App() {
  const [role, setRole] = useState(localStorage.getItem('role'))

  return <AppRouter role={role} setRole={setRole} />
}

export default App
