import { ipcMain, BrowserWindow, app, net } from 'electron'
import { CreateChatProps } from './types'
import { createProvider } from './providers/createProvider'
import { configManager } from './config'
import { createContextMenu, updateMenu } from './menu'
import fs from 'fs/promises'
import path from 'path'
import url from 'url'

export function setupIPC(mainWindow: BrowserWindow) {
  // Context menu handler
  ipcMain.on('show-context-menu', (event, id) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (!win) return
    createContextMenu(win, id)
  })

  // Chat handler
  ipcMain.on('start-chat', async (event, data: CreateChatProps) => {
    console.log('hey', data)
    const { providerName, messages, messageId, selectedModel } = data
    try {
      const provider = createProvider(providerName)
      const stream = await provider.chat(messages, selectedModel)
      for await (const chunk of stream) {
        console.log('the chunk', chunk)
        const content = {
          messageId,
          data: chunk
        }
        mainWindow.webContents.send('update-message', content)
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorContent = {
        messageId,
        data: {
          is_end: true,
          result: error instanceof Error ? error.message : '与AI服务通信时发生错误',
          is_error: true
        }
      }
      mainWindow.webContents.send('update-message', errorContent)
    }
  })

  // Config handlers
  ipcMain.handle('get-config', () => {
    return configManager.get()
  })

  ipcMain.handle('update-config', async (event, newConfig) => {
    const updatedConfig = await configManager.update(newConfig)
    // 如果语言发生变化，更新菜单
    if (newConfig.language) {
      updateMenu(mainWindow)
    }
    return updatedConfig
  })

  // File handling
  ipcMain.handle('copy-image-to-user-dir', async (event, sourcePath: string) => {
    const userDataPath = app.getPath('userData')
    const imagesDir = path.join(userDataPath, 'images')
    await fs.mkdir(imagesDir, { recursive: true })
    const fileName = path.basename(sourcePath)
    const destPath = path.join(imagesDir, fileName)
    await fs.copyFile(sourcePath, destPath)
    return destPath
  })
} 