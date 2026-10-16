export function UploadPanel({
  file,
  preview,
  instruction,
  busy,
  error,
  onFileChange,
  onInstructionChange,
  onExtract,
}) {
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      onFileChange(selectedFile)
    }
  }

  return (
    <div className="panel">
      <h2>Upload image</h2>

      <label className="dropzone">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
        />
        <span className="upload-icon">↑</span>
        <strong>{file ? file.name : 'Choose an image'}</strong>
        <small>Click to browse JPG, PNG, or WEBP files</small>
      </label>

      {preview && (
        <img
          className="preview"
          src={preview}
          alt="Selected document preview"
        />
      )}

      <label>
        Prompt instruction
        <textarea
          className="instruction"
          value={instruction}
          onChange={(e) => onInstructionChange(e.target.value)}
          placeholder="Enter prompt instructions for extraction..."
        />
      </label>

      <button
        className="primary"
        onClick={onExtract}
        disabled={busy}
      >
        {busy ? 'Extracting...' : 'Extract text'}
      </button>

      {error && <p className="error-text">{error}</p>}
    </div>
  )
}
