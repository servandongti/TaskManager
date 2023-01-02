import { useFolders } from '../utils/FoldersContext'
import { ITask } from '../utils/interfaces'

const CheckCircle = ({ task, folder }: { task: ITask; folder: string }) => {
  const [folders, dispatch] = useFolders()

  const handleCheck = () => {
    dispatch({ type: 'editTask', task: task.id, folder, payload: { state: !task.state } })
  }

  return <button onClick={handleCheck} className={`text-xl bi ${task.state ? 'bi-check-circle-fill' : 'bi-circle'}`}></button>
}

export default CheckCircle
