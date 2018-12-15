const electron = require('electron'),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow,
  path = require('path'),
  url = require('url')

let mainWindow

function createWindow() {
  let fullscreen = true
  if (process.platform === 'darwin') {
    fullscreen = false
  }

  const size = electron.screen.getPrimaryDisplay().size
  mainWindow = new BrowserWindow({
    left: 0,
    top: 0,
    width: size.width,
    height: size.height,
    frame: false,
    show: true,
    kiosk: true,
    alwaysOnTop: true,
    ignoreMouseEvents: true,
    maximize: true,
    fullscreen: fullscreen,
    focusable: false,
    skipTaskbar: true,
    transparent: true,
    resizable: false
  })

  //mainWindow.setAlwaysOnTop(true, 'screen');
  //mainWindow.maximize()
  mainWindow.setIgnoreMouseEvents(true)
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.on('closed', () => { mainWindow = null })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
app.on('activate', () => { if (mainWindow === null) createWindow() })
