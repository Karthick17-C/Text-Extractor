export function AuthLayout({ children }) {
  return (
    <main className="auth-page">
      <section className="auth-container">
        <h1 className="auth-title">Text Extracter</h1>
        <p className="subtitle">Extract text from images with AI</p>
        {children}
      </section>
    </main>
  )
}
