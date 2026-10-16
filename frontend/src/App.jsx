import './App.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { useAuth } from './hooks/useAuth'
import { AuthPage } from './pages/AuthPage'
import { WorkspacePage } from './pages/WorkspacePage'

function AppContent() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <WorkspacePage /> : <AuthPage />
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
