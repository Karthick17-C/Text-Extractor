import { HistoryItem } from './HistoryItem'

export function Sidebar({
  isOpen,
  onClose,
  userName,
  onLogout,
  history,
  selectedItem,
  onSelectItem,
  onDeleteItem,
}) {
  return (
    <>
      <div
        className={`sidebar-backdrop ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-top">
          <span className="sidebar-brand">Menu</span>
          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close menu"
            title="Close menu"
          >
            ×
          </button>
        </div>

        <div className="menu-user">
          <strong>{userName || 'User'}</strong>
          <button
            className="logout"
            onClick={onLogout}
            title="Log out"
            aria-label="Log out"
          >
            Log out
          </button>
        </div>

        <div className="history-list">
          <h2>Recent History</h2>
          {history.length === 0 ? (
            <p className="history-empty">No extraction history yet.</p>
          ) : (
            history.map((item) => (
              <HistoryItem
                key={item.id}
                item={item}
                isActive={selectedItem?.id === item.id}
                onSelect={(selected) => {
                  onSelectItem(selected)
                  onClose()
                }}
                onDelete={onDeleteItem}
              />
            ))
          )}
        </div>
      </aside>
    </>
  )
}
