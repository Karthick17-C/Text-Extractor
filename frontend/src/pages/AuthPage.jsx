import { useEffect, useState } from 'react'
import { AuthLayout } from '../layouts/AuthLayout'
import { LoginForm } from '../components/auth/LoginForm'
import { SignupForm } from '../components/auth/SignupForm'
import { TermsModal } from '../components/auth/TermsModal'
import { AlertMessage } from '../components/common/AlertMessage'
import { authService } from '../services/authService'
import { useAuth } from '../hooks/useAuth'

export function AuthPage() {
  const [tab, setTab] = useState('login')
  const [message, setMessage] = useState(null)
  const [busy, setBusy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [notice, setNotice] = useState('')
  const { login } = useAuth()

  useEffect(() => {
    const storedNotice = sessionStorage.getItem('authNotice')
    if (storedNotice) {
      setNotice(storedNotice)
      sessionStorage.removeItem('authNotice')
    }
  }, [])

  useEffect(() => {
    if (!notice) return undefined

    const timeout = window.setTimeout(() => setNotice(''), 3000)
    return () => window.clearTimeout(timeout)
  }, [notice])

  useEffect(() => {
    if (message?.type !== 'success') return undefined

    const timeout = window.setTimeout(() => setMessage(null), 3000)
    return () => window.clearTimeout(timeout)
  }, [message])

  const handleLogin = async ({ email, password, rememberMe }) => {
    setMessage(null)
    setBusy(true)

    try {
      const data = await authService.login(email, password, rememberMe)
      sessionStorage.setItem('authNotice', 'Logged in successfully.')
      login(data)
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setBusy(false)
    }
  }

  const handleSignup = async ({ name, email, password, confirm, terms }) => {
    setMessage(null)

    if (password !== confirm) {
      return setMessage({ type: 'error', text: 'Passwords do not match!' })
    }

    if (!terms) {
      return setMessage({ type: 'error', text: 'Please accept the Terms & Conditions.' })
    }

    setBusy(true)

    try {
      await authService.signup(name, email, password)
      setMessage({ type: 'success', text: 'Account created. You can now log in.' })
      setTab('login')
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthLayout>
      {notice && <div className="workspace-notice">{notice}</div>}
      <div className="tab-container">
        <button
          className={tab === 'login' ? 'tab active' : 'tab'}
          onClick={() => {
            setTab('login')
            setMessage(null)
          }}
        >
          Login
        </button>
        <button
          className={tab === 'signup' ? 'tab active' : 'tab'}
          onClick={() => {
            setTab('signup')
            setMessage(null)
          }}
        >
          Sign Up
        </button>
      </div>

      <AlertMessage message={message} />

      {tab === 'login' ? (
        <LoginForm onSubmit={handleLogin} busy={busy} />
      ) : (
        <SignupForm
          onSubmit={handleSignup}
          busy={busy}
          onOpenTerms={() => setShowTerms(true)}
        />
      )}

      <TermsModal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
      />
    </AuthLayout>
  )
}
