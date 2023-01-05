


const { ipcRenderer, webContents, BrowserWindow } = require("electron");

 
//let win = BrowserWindow.getFocusedWindow();


let switcher = true;
const copyText = (text) => {
	console.log(text);
    navigator.clipboard.writeText(text)
};
const link = (url) => {
    window.open(url).focus
}
const hideBlock = (target) => {
	let block = target.closest('.block');
	let blockElem = block.querySelectorAll('.block-elem');
	console.log(switcher);
	if(switcher == false) {		
		blockElem.forEach(elem => {
			elem.classList.toggle('hide');
		})	
	}
}


// Create block
const newBlock = () => {
	let parentElement = document.getElementById('listBtn');

	let newBlock = document.createElement('div');
	newBlock.classList.add('block');

	let tittleBlock = newBlock.appendChild(document.createElement('div'));
	tittleBlock.classList.add('tittle-block');

	let btnDisplayBlock = tittleBlock.appendChild(document.createElement('button'));
	btnDisplayBlock.classList.add('btn-display-block');
	btnDisplayBlock.innerText = 'D';



	let wrapperNameBlock = tittleBlock.appendChild(document.createElement('div'));
	//wrapperNameBlock.classList.add('wrapper-name-block');
	let nameBlock = wrapperNameBlock.appendChild(document.createElement('input'));
	nameBlock.classList.add('name-block');
	nameBlock.setAttribute('value', 'New Block');
	nameBlock.setAttribute('readonly', true);

	let btnDeleteBlock = tittleBlock.appendChild(document.createElement('button'));
	btnDeleteBlock.classList.add('btn-delete-block');
	btnDeleteBlock.innerText = 'x';
	
	parentElement.appendChild(newBlock);

	let createBtn = document.createElement('div');
	createBtn.classList.add('btn-of-block');

	let btn = document.createElement('button');
	btn.classList.add('add-btn');
	btn.innerText = '+';

	newBlock.appendChild(createBtn);
	newBlock.appendChild(btn);
};

// add Btn
document.addEventListener('click',e => {
	let target = e.target
	if(target.innerText == '+') {
		//addBtn(target)
		createElement(target)
		console.log('added btn');
	}
	
});


function createElement(parent) {
	const elem = document.createElement('div');
	elem.classList.add('block-elem')

    const btn = elem.appendChild(document.createElement('button'));
	const optionsBlock = elem.appendChild(document.createElement('div'));
	optionsBlock.classList.add('options-block');
	optionsBlock.classList.add('hide');

	let inputNameBtn = optionsBlock.appendChild(document.createElement('input'));
	inputNameBtn.classList.add('input-name-btn')
	inputNameBtn.setAttribute("placeholder", "Name button");
	
	

	btn.classList.add('btn');
    btn.setAttribute("onClick", "copyText('text in the clipboard')");
    btn.innerText = 'New button';

	let block = parent.closest('.block');
	let btnsBlock = block.querySelector('.btn-of-block')
    btnsBlock.appendChild(elem);

	
	const inputOptionsBtn = optionsBlock.appendChild(document.createElement('input'));
	inputOptionsBtn.classList.add('option');
	inputOptionsBtn.setAttribute("placeholder", "Copy text / Link");

	const btnsOfBlockOptions = optionsBlock.appendChild(document.createElement('div'));
	btnsOfBlockOptions.classList.add('btns-block-options');

		const btnsSelectionFunction = btnsOfBlockOptions.appendChild(document.createElement('div'));
		btnsSelectionFunction.classList.add('btns-selection-function');
			const btnSelectCopy = btnsSelectionFunction.appendChild(document.createElement('button'));
			btnSelectCopy.classList.add('btn-select-copy');
			btnSelectCopy.classList.add('selected');
			btnSelectCopy.innerText = "copy text";
			const btnSelectLink = btnsSelectionFunction.appendChild(document.createElement('button'));
			btnSelectLink.classList.add('btn-select-link');
			btnSelectLink.innerText = "link";

		const btnsAction = btnsOfBlockOptions.appendChild(document.createElement('div'));
		btnsAction.classList.add('btns-action');
			const deleteBtn = btnsAction.appendChild(document.createElement('button'));
			deleteBtn.classList.add('delete-btn');
			deleteBtn.innerText = "Delete";
			const saveOptionsBtn = btnsAction.appendChild(document.createElement('button'));
			saveOptionsBtn.classList.add('save-options-btn');
			saveOptionsBtn.innerText = "Save";


	
	

};

// Listener
document.addEventListener('click',e => {
	let target = e.target;
	//let allOptionsBlock = document.querySelectorAll('.options-block');
	if(target.innerText == 'Save') {		
		saveOptionsBtn(target);
	} else if(target.innerText == 'Delete') { //заменить
		deleteButton(target);
	} else if(target.innerText == 'x') {   //заменить
		deleteBlock(target);
	} else if(target.classList.contains('btn-select-link') || target.classList.contains('btn-select-copy')) {
		selectFunction(target);
	} else if(!target.closest('.options-block')) {
		closeOptions();
	} else if(true) {
		console.log("1");
		//changeDisplay(target)
		
	}
});

document.addEventListener('click',e => {
	let target = e.target;

	if(target.classList.contains('btn-display-block')) {
		changeDisplay(target)
		//почему отдельно слушатель 
	}
	if(target.classList.contains('name-block')) {
		hideBlock(target);
	}
});


const closeOptions = () => {
	let allOptionsBlock = document.querySelectorAll('.options-block');
	allOptionsBlock.forEach( btn => {
		btn.classList.add('hide')
	})
};
// Open options
const openOptions = (target) => {
	let allOptionsBlock = document.querySelectorAll('.options-block');	
	if(target.classList.contains('btn')) {	
		let blockElem = target.closest('.block-elem');
		let optionsBlock = blockElem.querySelector('.options-block');	
		allOptionsBlock.forEach( btn => {
			if(btn == optionsBlock) {
				btn.classList.remove('hide')
			} else if(!btn.classList.contains('hide') && btn != optionsBlock) {
				btn.classList.add('hide')
			}		
		})
	} else if(!target.closest('.options-block')) {
		allOptionsBlock.forEach( btn => {
			btn.classList.add('hide')
		})
	}	
}

document.addEventListener('contextmenu', e => {
	let target = e.target;
	openOptions(target)
})

// Save Btn 
const saveOptionsBtn = (target) => {
	let optionsBlock = target.closest('.options-block');
	let inputNameBtn = optionsBlock.querySelector('.input-name-btn').value;
	let inputOptionsBtn = optionsBlock.querySelector('.option').value;
	let selectedFunction = optionsBlock.querySelector('.selected');
	
	let btn = optionsBlock.previousSibling;
	btn.innerText = inputNameBtn;

	if(selectedFunction.classList.contains('btn-select-copy')) {
		btn.setAttribute("onClick", `copyText("${inputOptionsBtn}")`);
	}
	if(selectedFunction.classList.contains('btn-select-link')) {
		btn.setAttribute("onClick", `link("${inputOptionsBtn}")`)
	}
	console.log(inputOptionsBtn);
	closeOptions()
}

//Delete Btn
const deleteButton = (parent) => {
	const blockElem = parent.closest('.block-elem');
	blockElem.remove();
}
const deleteBlock = (parent) => {
	const block = parent.closest('.block');
	block.remove();
}


const changeNameBtn = (target) => {
	target.removeAttribute('readonly', true);
	target.classList.add('wrapper-name-block');
	
	setWidthInput(target)
};
// Select function
const selectFunction = (target) => {
	let parent = target.closest('.btns-selection-function');
	let btnCopy = parent.querySelector('.btn-select-copy');
	let btnLink = parent.querySelector('.btn-select-link');	
	if(target.classList.contains('btn-select-link')) {
		btnLink.classList.add('selected');
		btnCopy.classList.remove('selected');
	} else if(target.classList.contains('btn-select-copy')) {
		btnCopy.classList.add('selected');
		btnLink.classList.remove('selected');
	}			
}

document.addEventListener('click', e => {
	let target = e.target;
	if(switcher == true) {
		if(target.classList.contains('name-block')) {
			changeNameBtn(target)
			if(!target.getAttribute('readonly')) {
				target.addEventListener("keydown", function (e) {
					if (e.code === "Enter") { 
						target.setAttribute('readonly', true);
						//target.style.setProperty('outline', 'none');
						target.classList.remove('wrapper-name-block');
					}
				});
				document.addEventListener('click', function (e) {
					if( e.target !== target ) {
						target.setAttribute('readonly', true);
						//target.style.setProperty('outline', 'none');
						target.classList.remove('wrapper-name-block');
					}
				})
			}
		};	
	}
	
})


const changeDisplay = (target) => {
	let block = target.closest('.block');
	let btnOfBlock = block.querySelector('.btn-of-block');
	btnOfBlock.classList.toggle('flex');
}


//возможность редактированрия только при включенной кнопке
const changeSwitcher = () => {	
	switcher = switcher == false? true: false;
	console.log(switcher);
	
	let btnsAddBtn = document.querySelectorAll('.add-btn');
	btnsAddBtn.forEach((btn) => {
		btn.classList.toggle('hide')
	});
	let btnsDelBlock = document.querySelectorAll('.btn-delete-block');
	btnsDelBlock.forEach((btn) => {
		btn.classList.toggle('hide')
	});

	let btnsDisplayBlock = document.querySelectorAll('.btn-display-block');
	btnsDisplayBlock.forEach((btn) => {
		btn.classList.toggle('hide')
	});
	const btsAddBlock = document.querySelector('.btn-add-block');
	btsAddBlock.classList.toggle('hide')
	
	
}
const setWidthInput = (target) => {
	target.addEventListener('input', resizeInput);
	resizeInput.call(target);

}
function resizeInput() {
	//this.style.width = this.value.length + "ch";
	this.style.width = ((this.value.length) * 11) + 'px';
  }



  const savePage = () => {
	const xxx = document.documentElement.outerHTML;
	//console.log(xxx);
	//console.log(win);
	ipcRenderer.send('save-page', webContents);


	// let file = new File([document.documentElement.outerHTML]
	// 	, "file-" + new Date().getTime() + ".html"
	// 	, {type:"text/html", lastModified:new Date().getTime()});
	// 	console.log(file);
  }


  //electron-builder --mac
  
