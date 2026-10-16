export function HistoryTextModal({ item, onClose }) {
  if (!item) return null

  return (
    <div className="history-modal-backdrop" onClick={onClose}>
      <section
        className="history-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="history-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="history-modal-close"
          onClick={onClose}
          aria-label="Close extracted text"
          title="Close"
        >
          ×
        </button>
        <h2 id="history-modal-title">{item.filename || 'Untitled image'}</h2>
        <div className="history-modal-text">
          {item.extracted_text || 'No extracted text was saved for this image.'}
        </div>
      </section>
    </div>
  )
}
