// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer, contextBridge } from 'electron'
import { CreateChatProps, OnUpdatedCallback, AppConfig } from './types'

contextBridge.exposeInMainWorld('electronAPI', {
  startChat: (data: CreateChatProps) => ipcRenderer.send('start-chat', data),
  onUpdateMessage: (callback: OnUpdatedCallback) => ipcRenderer.on('update-message', (_event, value) => callback(value)),
  showContextMenu: (id: number) => ipcRenderer.send('show-context-menu', id),
  onDeleteConversation: (callback: (id: number) => void) => ipcRenderer.on('delete-conversation', (_event, id) => callback(id)),
  copyImageToUserDir: (sourcePath: string) => ipcRenderer.invoke('copy-image-to-user-dir', sourcePath),
  getConfig: () => ipcRenderer.invoke('get-config'),
  updateConfig: (config: Partial<AppConfig>) => ipcRenderer.invoke('update-config', config),
  onMenuNewConversation: (callback: () => void) => ipcRenderer.on('menu-new-conversation', () => callback()),
  onMenuOpenSettings: (callback: () => void) => ipcRenderer.on('menu-open-settings', () => callback())
})