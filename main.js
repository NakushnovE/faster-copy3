const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: false,
      preload: path.join(__dirname, './src/preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, '/src/index.html'));
  
  mainWindow.webContents.openDevTools();


  let wc = mainWindow.webContents

  // wc.on("dom-ready", () => {
  //   let tit = wc.getTitle()
  //   const filepathlocal = path.join(__dirname, './index.html');
  //   wc.savePage(filepathlocal, 'HTMLComplete').then(()=> {
  //     console.log('save op');
  //   }).catch(err => {
  //     console.log(err);
  //   })
  //   console.log(tit)
  // })
};

app.on('ready', createWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
// Сохранение страницы
// app.on('web-contents-created', (_, wc) => {

//   wc.on('dom-ready', () => {

//     wc.on('console-message', () => {
//         const filepathlocal = path.join(__dirname, './src/index.html');
//         wc.savePage(filepathlocal, 'HTMLComplete').then(()=> {
//           console.log('save page');
//         }).catch(err => {
//           console.log(err);
//         })
//     })
//   })    
// });






