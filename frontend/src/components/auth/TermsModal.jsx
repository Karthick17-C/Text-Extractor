export function TermsModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <article className="modal" onClick={(event) => event.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <h2>Terms & Conditions</h2>
        <p>
          <strong>Last Updated: October 30, 2025</strong>
        </p>

        <h3>1. Acceptance of Terms</h3>
        <p>By using Text Extracter, you agree to these Terms and Conditions.</p>

        <h3>2. Service Description</h3>
        <p>
          Text Extracter is an AI-powered optical character recognition tool for
          extracting text from images.
        </p>

        <h3>3. Data Usage</h3>
        <p>
          Uploaded images are processed by third-party AI services. Extracted
          text and file metadata are stored in your account history, which you can
          delete at any time.
        </p>

        <h3>4. AI-Generated Content</h3>
        <p>
          OCR results may contain errors. You are responsible for verifying
          extracted content.
        </p>
      </article>
    </div>
  )
}
