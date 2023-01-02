export interface IFolder {
  name: string
  color: keyof IColors
  tasks: ITask[]
}

export interface IFolderEntries {
  [key: string]: IFolder
}

export interface ITask {
  id: string
  name: string
  state: boolean
  color: keyof IColors
}

export interface IColors {
  [key: string]: { bg: string; text: string; border: string }
}
