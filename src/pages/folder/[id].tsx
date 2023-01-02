import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import CheckCircle from '../../components/CheckCircle'
import { colors } from '../../utils/colors'
import { useFolders } from '../../utils/FoldersContext'
import { IFolder, IFolderEntries, ITask } from '../../utils/interfaces'
import Layout from './layout'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

const Folder = () => {
  const router = useRouter()
  const { id } = router.query
  const [folders, dispatch] = useFolders()
  const [folder, setFolder] = useState<IFolder | undefined>(undefined)
  const [isDragging, setIsDragging] = useState(false)

  const editFolder = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'editFolder', folder: id, payload: { name: event.target.value } })
  }
  const editTask = (event: ChangeEvent<HTMLInputElement>, task: ITask) => {
    dispatch({ type: 'editTask', folder: id, task: task.id, payload: { name: event.target.value } })
  }

  const onDragEnd = (result: DropResult) => {
    console.log(result)
    if (result.destination?.droppableId === 'droppable-trash') dispatch({ type: 'deleteTask', folder: id, task: result.draggableId })
    else dispatch({ type: 'dndTask', folder: id, source: result.source.index, destination: result.destination?.index })
    setIsDragging(false)
  }

  useEffect(() => {
    if (!id || !folders || !Object.keys(folders)) return
    setFolder(folders[id as keyof IFolderEntries])
  }, [folders, id])

  if (folder && Object.keys(folder)) {
    return (
      <Layout folder={id as string}>
        <div className="flex flex-col gap-4">
          <input type="text" className="text-2xl font-medium bg-inherit" value={folder.name} onChange={editFolder} />
          <DragDropContext onDragStart={() => setIsDragging(true)} onDragEnd={result => onDragEnd(result)}>
            <Droppable droppableId="droppable-tasks">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {folder.tasks &&
                    folder.tasks.map((task, index) => (
                      <Draggable draggableId={task.id} index={index} key={task.id}>
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`flex items-center justify-between px-2 py-1 rounded-2xl ${colors[task.color].text} ${snapshot.isDragging ? 'bg-gray-100/60 dark:bg-gray-800/60' : 'bg-inherit'}`}>
                            <div className="flex items-center gap-3">
                              <CheckCircle task={task} folder={id as string} />
                              <input type="text" value={task.name} onChange={e => editTask(e, task)} className="bg-inherit" />
                            </div>
                            <div className="bi bi-grip-vertical text-xl opacity-40"></div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="droppable-trash">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className={`mt-10 py-10 relative rounded-2xl transtion duration-200 ${snapshot.isDraggingOver ? 'bg-gray-100/70 dark:bg-gray-800/70' : ''} ${isDragging ? 'visible' : 'invisible'}`}>
                  <div className="absolute inset-0 flex justify-center items-center">
                    <i className="bi bi-trash text-3xl text-gray-400 dark:text-gray-600"></i>
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </Layout>
    )
  }
}

export default Folder
