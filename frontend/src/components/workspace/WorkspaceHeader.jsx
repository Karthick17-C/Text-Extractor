export function WorkspaceHeader({ onToggleMenu, isMenuOpen }) {
  return (
    <header className="app-header">
      <button
        className="menu-toggle"
        onClick={onToggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        title={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? '×' : '☰'}
      </button>
      <h1 className="app-title">Text Extracter</h1>
    </header>
  )
}
