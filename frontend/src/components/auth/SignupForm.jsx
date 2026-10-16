import { useState } from 'react'

export function SignupForm({ onSubmit, busy, onOpenTerms }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [terms, setTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ name, email, password, confirm, terms })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="username"
          required
        />
      </label>

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

      <label>
        Confirm Password
        <input
          type={showPassword ? 'text' : 'password'}
          name="confirm"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="••••••••"
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
          name="terms"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
        />
        I agree to the{' '}
        <button
          type="button"
          className="inline-link"
          onClick={onOpenTerms}
        >
          Terms & Conditions
        </button>
      </label>

      <button className="primary" type="submit" disabled={busy}>
        {busy ? 'Please wait...' : 'Create Account'}
      </button>
    </form>
  )
}
