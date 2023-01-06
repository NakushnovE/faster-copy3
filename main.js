const { log } = require('console');
const { app, BrowserWindow, ipcMain, webContents } = require('electron');
const path = require('path');
const url = require('url')



let mainWindow;
//let wc;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: false,
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });



  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  // mainWindow.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, '/src/index.html'),
  //     protocol: "file:",
  //     slashes: true
  //   })
  // );

  mainWindow.setMenu(null);
  mainWindow.webContents.openDevTools();


// mainWindow.webContents.on('dom-ready', () => {
//   let getStore = localStorage.getItem('page')
//   if(getStore) {  
//     let parent = document.getElementById('listBtn');
//     let doc = new DOMParser().parseFromString(getStore, 'text/xml');
//     parent.appendChild(doc)
//   }
// })
  //wc = mainWindow.webContents;
//mainWindow.on('')


};

app.on('ready', createWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// app.on('window-all-closed', () => {
//   // On macOS it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// Сохранение страницы
// app.on('web-contents-created', (_, wc) => {
// console.log("BOT WC", wc);
//   wc.on('dom-ready', () => {
//     wc.on('console-message', () => { 
//       let count = 0;
//         const filepathlocal = path.join(__dirname, 'src/index.html');
//           wc.savePage(filepathlocal, 'HTMLOnly').then(()=> {
//             console.log('save page');         
//           }).catch(err => {
//             console.log(err);
//             console.log("Не удалось сохранить файл");
//           })     
//     })
//   })    
// });


// app.on('web-contents-created', (_, wc) => {
//   ipcMain.on("save-page", (_, data) => {
//     const filepathlocal = path.join(__dirname, '1/index.html');
//     console.log("MAIN", data);
  
//     wc.savePage(filepathlocal, 'HTMLOnly').then(()=> {
//       console.log('save page');         
//     }).catch(err => {
//       console.log(err);
//       console.log("Не удалось сохранить файл");
//     })
  
//   })
// })


ipcMain.on("save-page", (e, data) => {
  const filepathlocal = path.join(__dirname, '1/index.html');
  // console.log("MAIN", "e.sender");   
 
  e.sender.savePage(filepathlocal, 'HTMLComplete').then(()=> {
    console.log('save page');        
    e.sender.send('save renderer', "save renderer")
  
  }).catch(err => {
    console.log(err);
    console.log("Не удалось сохранить файл");
  })

})



