import { useState } from 'react'
import { AppLayout } from '../layouts/AppLayout'
import { UploadPanel } from '../components/workspace/UploadPanel'
import { OutputPanel } from '../components/workspace/OutputPanel'
import { useOCR } from '../hooks/useOCR'

export function WorkspacePage() {
  const {
    file,
    preview,
    text,
    setText,
    instruction,
    setInstruction,
    history,
    busy,
    selected,
    error,
    chooseFile,
    extract,
    deleteHistoryItem,
    selectHistoryItem,
  } = useOCR()
  const [notice, setNotice] = useState('')

  const handleDeleteHistoryItem = async (id) => {
    const deleted = await deleteHistoryItem(id)
    if (deleted) {
      setNotice('History item deleted successfully.')
      window.setTimeout(() => setNotice(''), 3000)
    }
  }

  return (
    <AppLayout
      history={history}
      selectedItem={selected}
      onSelectItem={selectHistoryItem}
      onDeleteItem={handleDeleteHistoryItem}
      notice={notice}
    >
      <UploadPanel
        file={file}
        preview={preview}
        instruction={instruction}
        busy={busy}
        error={error}
        onFileChange={chooseFile}
        onInstructionChange={setInstruction}
        onExtract={extract}
      />

      <OutputPanel
        text={text}
        selectedItem={selected}
        onTextChange={setText}
      />
    </AppLayout>
  )
}
