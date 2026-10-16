export function OutputPanel({ text, selectedItem, onTextChange }) {
  return (
    <div className="panel output-panel">
      <h2>Extracted text</h2>
      <textarea
        className="output"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Your extracted text will appear here..."
      />
      <div className="output-meta">
        {text.length} characters
        {selectedItem && ` ${selectedItem.filename || 'Untitled image'}`}
      </div>
    </div>
  )
}
