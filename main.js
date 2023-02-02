const { app, BrowserWindow, ipcMain } = require('electron');
const Config = require('electron-config');
const path = require('path');
const Store = require('electron-store');
const config = new Config();
const store = new Store();

let mainWindow;


const createWindow = () => {
  const size = config.get('winBounds');
  const w = size.width;
  const h = size.height;
  const x = size.x;
  const y = size.y;
  mainWindow = new BrowserWindow({
    width: w?w:400,
    height: h?h:500,
    x: x,
    y: y,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: false,
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });



  mainWindow.loadFile(path.join(__dirname, 'index.html'));


  mainWindow.setMenu(null);
  //mainWindow.webContents.openDevTools();

  let block = store.get('block');

  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.webContents.send('load-store', block)
  })

  mainWindow.on('close', () => {
    config.set('winBounds', mainWindow.getBounds())
  })

};



app.on('ready', createWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("save-store", (_, data) => {
  store.set('block', data)
  console.log('MAIN: block saved');
});

