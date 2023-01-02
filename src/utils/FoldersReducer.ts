import { v4 } from 'uuid'
import { ITask } from './interfaces'

export const FoldersReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'setFolders': {
      return action.payload
    }
    case 'addFolder': {
      return { ...state, [v4()]: { ...action.payload, tasks: [] } }
    }
    case 'editFolder': {
      return { ...state, [action.folder]: { ...state[action.folder], ...action.payload } }
    }
    case 'deleteFolder': {
      const folderEntries = Object.entries(state)
      const folders = folderEntries.filter(folder => folder[0] !== action.folder)
      return Object.fromEntries(folders)
    }
    case 'addTask': {
      const targetFolder = state[action.folder]
      return {
        ...state,
        [action.folder]: {
          ...targetFolder,
          tasks: [...targetFolder?.tasks, { id: v4(), state: false, ...action.payload }],
        },
      }
    }
    case 'editTask': {
      const targetFolder = { ...state[action.folder] }
      const targetFolderTasks = targetFolder.tasks.map((task: ITask) => (task.id === action.task ? { ...task, ...action.payload } : task))
      return {
        ...state,
        [action.folder]: { ...targetFolder, tasks: targetFolderTasks },
      }
    }
    case 'deleteTask': {
      const targetFolder = { ...state[action.folder] }
      const targetTasks = targetFolder.tasks.filter((task: ITask) => task.id !== action.task)
      return {
        ...state,
        [action.folder]: { ...targetFolder, tasks: targetTasks },
      }
    }
    case 'dndTask': {
      const targetTasks = [...state[action.folder].tasks]
      const [task] = targetTasks.splice(action.source, 1)
      targetTasks.splice(action.destination, 0, task)
      return {
        ...state,
        [action.folder]: {
          ...state[action.folder],
          tasks: targetTasks,
        },
      }
    }
    default: {
      throw Error('FoldersReducer action is undefined')
    }
  }
}
