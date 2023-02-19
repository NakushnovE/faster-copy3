const { app, BrowserWindow, ipcMain } = require('electron');
const Config = require('electron-config');
const path = require('path');
const Store = require('electron-store');
const { log } = require('console');
const config = new Config();
const store = new Store();

let mainWindow;


const createWindow = () => {
  const size = config.get('winBounds');
  let w = 400;
  let h = 500;
  let x = 1000;
  let y = 250;
  if(size) {
    w = size.width;
    h = size.height;
    x = size.x;
    y = size.y;
  }
  
  mainWindow = new BrowserWindow({
    width: w,
    height: h,
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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on("save-store", (_, data) => {
  store.set('block', data)
  console.log('MAIN: block saved');
});

