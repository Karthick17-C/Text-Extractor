import { useState } from 'react'
import { ConfirmDialog } from '../common/ConfirmDialog'

export function HistoryItem({ item, isActive, onSelect, onDelete }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDelete = (e) => {
    e.stopPropagation()
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    setShowDeleteConfirm(false)
    onDelete(item.id)
  }

  return (
    <div
      className={`history-item ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(item)}
    >
      <div className="history-header">
        <strong>{item.filename || 'Untitled image'}</strong>
        <button
          className="delete-btn"
          onClick={handleDelete}
          aria-label="Delete history item"
          title="Delete history item"
        >
          <span aria-hidden="true">🗑</span>
        </button>
      </div>
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete history item?"
        message={`Are you sure you want to delete "${item.filename || 'Untitled image'}"?`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  )
}
