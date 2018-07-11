const { app, BrowserWindow,  } = require('electron')

let mainWindow

function createWindow() {
  
  mainWindow = new BrowserWindow({ 
    width: 800 + 6, 
    height: 600 + 49,
    center: true,
    resizable: false
  })
  mainWindow.loadURL('http://localhost:8080/')

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () { mainWindow = null })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () { if (process.platform !== 'darwin') app.quit() })

app.on('activate', function () { if (mainWindow === null) createWindow() })
