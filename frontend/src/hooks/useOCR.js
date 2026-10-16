import { useState, useEffect, useCallback } from 'react'
import { ocrService } from '../services/ocrService'
import { DEFAULT_INSTRUCTION } from '../utils/constants'

export function useOCR() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [text, setText] = useState('')
  const [instruction, setInstruction] = useState(DEFAULT_INSTRUCTION)
  const [history, setHistory] = useState([])
  const [busy, setBusy] = useState(false)
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState('')

  const loadHistory = useCallback(async () => {
    try {
      const data = await ocrService.getHistory(50)
      setHistory(data.history || [])
    } catch (err) {
      setError(err.message)
    }
  }, [])

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  const chooseFile = (selectedFile) => {
    if (!selectedFile) return
    setFile(selectedFile)
    setPreview(URL.createObjectURL(selectedFile))
    setText('')
    setError('')
  }

  const extract = async () => {
    if (!file) {
      setError('Choose an image first.')
      return
    }

    setBusy(true)
    setError('')

    try {
      const result = await ocrService.extractText(file, instruction)
      setText(result.text || '')
      await loadHistory()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const deleteHistoryItem = async (id) => {
    try {
      await ocrService.deleteHistory(id)
      setHistory((prev) => prev.filter((item) => item.id !== id))
      if (selected?.id === id) {
        setSelected(null)
      }
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  const selectHistoryItem = (item) => {
    if (!item) {
      setSelected(null)
      return
    }
    setSelected(item)
    setText('')
  }

  return {
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
    setError,
    chooseFile,
    extract,
    deleteHistoryItem,
    selectHistoryItem,
    reloadHistory: loadHistory,
  }
}
