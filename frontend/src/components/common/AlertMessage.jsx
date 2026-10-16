export function AlertMessage({ message }) {
  if (!message || !message.text) return null

  return (
    <div className={`message ${message.type || 'error'}`}>
      {message.text}
    </div>
  )
}
