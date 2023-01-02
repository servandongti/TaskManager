import Link from 'next/link'
import InputColors from '../components/InputColors'
import { colors } from '../utils/colors'
import { useFolders } from '../utils/FoldersContext'
import { IFolderEntries } from '../utils/interfaces'
import Layout from './layout'

export default function Home() {
  const [folders, dispatch] = useFolders()

  const addFolder = (data: { name: string; color: string }) => {
    dispatch({ type: 'addFolder', payload: data })
  }
  return (
    <Layout>
      <InputColors onSubmit={addFolder} colorsOnTop={false} />
      {Object.keys(folders).length > 0 ? (
        <main className="flex flex-wrap gap-3">
          {Object.entries(folders as IFolderEntries).map(([id, folder]) => (
            <Link key={id} href={`/folder/${id}`} className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-5">
              <div className={`text-xl whitespace-nowrap font-medium ${colors[folder.color].text}`}>{folder.name}</div>
            </Link>
          ))}
        </main>
      ) : null}
    </Layout>
  )
}
