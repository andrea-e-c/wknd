// PRELOAD CONNECTS THE ELECTRON APP TO THE GLOBAL ENVIRONMENT AND THE NODE.JS ENVIRONMENT

const { contextBridge, ipcRenderer } = require('electron')
const path = require('path')

// THIS REGULATES THE DARK MODE FUNCTIONS
contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})

// THIS IS A FUNCTION THAT IS NO LONGER BEING USED
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
  })

  // THIS IS PART OF DRAG AND DROP
  contextBridge.exposeInMainWorld('electron', {
    startDrag: (fileName) => {
      ipcRenderer.send('ondragstart', path.join(process.cwd(), fileName))
    }
  })
