import Link from 'next/link'
import { useDarkMode } from '../../utils/DarkModeContext'
import { ReactNode } from 'react'
import InputColors from '../../components/InputColors'
import { useFolders } from '../../utils/FoldersContext'
import { useRouter } from 'next/router'

const Layout = ({ children, folder }: { children: ReactNode; folder: string }) => {
  const router = useRouter()
  const { darkMode, setDarkMode } = useDarkMode()
  const [folders, dispatch] = useFolders()

  const deleteFolder = () => {
    dispatch({ type: 'deleteFolder', folder })
    router.push('/')
  }
  const addTask = (data: { name: string; color: string }) => {
    dispatch({ type: 'addTask', folder, payload: data })
  }

  return (
    <div className="h-full max-w-2xl mx-auto flex flex-col justify-between overflow-hidden">
      <div className="flex flex-col gap-5 overflow-auto">
        <nav className="flex justify-between items-center text-xl">
          <Link href={'/'} className="bi bi-chevron-left"></Link>
          <div className="flex gap-6">
            <button onClick={deleteFolder} className="bi bi-trash3"></button>
            <button onClick={() => setDarkMode(!darkMode)} className="bi bi-moon"></button>
          </div>
        </nav>
        {children}
      </div>
      <InputColors onSubmit={addTask} />
    </div>
  )
}

export default Layout
