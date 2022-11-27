"use strtct"

const electron = require('electron');
const path = require('path');
// const BrowserWindow = electron.remote.BrowserWindow;
//let win = BrowserWindow.getFocusedWindow();

const filepathlocal = path.join(__dirname, '../assets/page.html');
const filepathload = path.join(__dirname, '../assets/geeksforgeeks.html');


console.log(global.location.BrowserWindow);
const save = document.getElementById('save');
save.addEventListener('click', () => {
    console.log('Page was saved successfully.')
	newBlock()
	
});

const load = document.getElementById('load');
load.addEventListener('click', (event) => {
	// Creating a New BrowserWindow Instance, Loading GeeksForGeeks.org
	// And Saving it as an External Page
	let window = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});
	window.loadURL('https://www.geeksforgeeks.org/');
	window.webContents.openDevTools();
	window.webContents.on('did-finish-load', async () => {
		window.webContents.savePage(filepathload, 'HTMLOnly').then(() => {
			console.log('Page was saved successfully.')
		}).catch(err => {
			console.log(err)
		});
	});
});

const newBtn = (aliasBtn) => {
	let parentElement = document.getElementById('listBtn');
	console.log(parentElement);
	let newElement = document.createElement('div');
	newElement.classList.add('element')

	newElement.innerHTML += ` 
		<div>
			<button>${aliasBtn}</button> 
		</div>                      
	`
	parentElement.appendChild(newElement) 

	setAliasBtn('')
}

const newBlock = () => {
	let parentElement = document.getElementById('listBtn');
	let newElement = document.createElement('div');
	newElement.classList.add('block');

	// newElement.innerHTML += ` 
	//     <div>
	//         Some name of Block
		   
	//     </div>                       
	// `   
	newElement.appendChild(document.createTextNode('Some name of Block'))  
	parentElement.appendChild(newElement)

	let createBtn = document.createElement('div');
	// createBtn.innerHTML += `
	// <button>+</button>`
	createBtn.appendChild(document.createElement('button'))

	createBtn.addEventListener('click', ()=>newBtn())
	newElement.appendChild(createBtn)
	
}

