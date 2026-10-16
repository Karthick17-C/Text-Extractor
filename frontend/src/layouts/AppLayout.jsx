import { useEffect, useState } from 'react'
import { WorkspaceHeader } from '../components/workspace/WorkspaceHeader'
import { Sidebar } from '../components/workspace/Sidebar'
import { HistoryTextModal } from '../components/workspace/HistoryTextModal'
import { ConfirmDialog } from '../components/common/ConfirmDialog'
import { useAuth } from '../hooks/useAuth'

export function AppLayout({
  children,
  history,
  selectedItem,
  onSelectItem,
  onDeleteItem,
  notice,
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [authNotice, setAuthNotice] = useState('')
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const { user, logout } = useAuth()

  useEffect(() => {
    const storedNotice = sessionStorage.getItem('authNotice')
    if (storedNotice) {
      setAuthNotice(storedNotice)
      sessionStorage.removeItem('authNotice')
    }
  }, [])

  useEffect(() => {
    if (!authNotice) return undefined

    const timeout = window.setTimeout(() => setAuthNotice(''), 3000)
    return () => window.clearTimeout(timeout)
  }, [authNotice])

  const handleLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    setShowLogoutConfirm(false)
    sessionStorage.setItem('authNotice', 'You have been logged out successfully.')
    logout()
  }

  return (
    <main className="app-shell">
      {(notice || authNotice) && (
        <div className="workspace-notice">{notice || authNotice}</div>
      )}
      <WorkspaceHeader
        onToggleMenu={() => setMenuOpen(!menuOpen)}
        isMenuOpen={menuOpen}
      />

      <Sidebar
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        userName={user?.name}
        onLogout={handleLogout}
        history={history}
        selectedItem={selectedItem}
        onSelectItem={onSelectItem}
        onDeleteItem={onDeleteItem}
      />

      <section className="main-content">
        {children}
      </section>
      <HistoryTextModal item={selectedItem} onClose={() => onSelectItem(null)} />
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        title="Log out?"
        message="Are you sure you want to log out?"
        confirmLabel="Log out"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </main>
  )
}
