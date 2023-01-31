const { log } = require('console');
const { app, BrowserWindow, ipcMain, webContents } = require('electron');
const path = require('path');
const url = require('url')
const Store = require('electron-store');

const store = new Store();

let mainWindow;


const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 500,
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
})

