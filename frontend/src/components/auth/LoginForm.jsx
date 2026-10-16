import { useState } from 'react'

export function LoginForm({ onSubmit, busy }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ email, password, rememberMe })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email Address
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
        />
      </label>

      <label>
        Password
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          minLength={8}
          required
        />
      </label>

      <button
        type="button"
        className="password-toggle"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? 'Hide password' : 'Show password'}
      </button>

      <label className="check">
        <input
          type="checkbox"
          name="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        Remember me
      </label>

      <button className="primary" type="submit" disabled={busy}>
        {busy ? 'Please wait...' : 'Login'}
      </button>
    </form>
  )
}
