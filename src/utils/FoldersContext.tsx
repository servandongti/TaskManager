import { createContext, ReactNode, useContext, useEffect, useReducer } from 'react'
import { FoldersReducer } from './FoldersReducer'

const FoldersContext = createContext<any>([])

export const FoldersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(FoldersReducer, {})

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('folders') || '{}')
    if (Object.keys(storedData)) dispatch({ type: 'setFolders', payload: storedData })
    console.log('localStorage: get')
  }, [])

  useEffect(() => {
    if (JSON.stringify(state) === '{}') return
    localStorage.setItem('folders', JSON.stringify(state))
    console.log('localStorage: set')
  }, [state])

  return <FoldersContext.Provider value={[state, dispatch]}>{children}</FoldersContext.Provider>
}

export const useFolders = () => {
  const context = useContext(FoldersContext)
  if (typeof context === undefined) throw Error('Context must be used within Provider!')
  else return context
}
