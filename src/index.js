
const { ipcRenderer } = require("electron");

let draggables = null; 
let containers = null;
let switchEditor = document.querySelector('.switch-input').checked;
console.log(switchEditor);
const copyText = (text) => {
    navigator.clipboard.writeText(text)
};
const link = (url) => {
    window.open(url).focus
}
const hideBlock = (target) => {
	const block = target.closest('.block');
	const blockElem = block.querySelectorAll('.block-elem');
	const btnOfBlocks = block.querySelectorAll('.btn-of-block');
	btnOfBlocks.forEach(block => {
		block.classList.toggle('h')
		block.classList.toggle('hide')
	});

};


const saveStore = () => {
	const getBody = document.querySelector('#body');
	const contBody = getBody.outerHTML.toString().slice(16, -7);
	ipcRenderer.send('save-store', contBody);	
  }

const newBlock = () => {
	let parentElement = document.getElementById('listBtn');

	let newBlock = document.createElement('div');
	newBlock.classList.add('block');

	

	let tittleBlock = newBlock.appendChild(document.createElement('div'));
	tittleBlock.classList.add('tittle-block');

	let btnsMove = tittleBlock.appendChild(document.createElement('div'));
	btnsMove.classList.add('btns-move');
	let btnUp = btnsMove.appendChild(document.createElement('button'));
	btnUp.classList.add('btn-move-up');
	btnUp.setAttribute('onClick', 'moveBlockUp(this)')
	let btnDown = btnsMove.appendChild(document.createElement('button'));
	btnDown.classList.add('btn-move-down');
	btnDown.setAttribute('onClick', 'moveBlockDown(this)')
	

	
	let wrapperNameBlock = tittleBlock.appendChild(document.createElement('div'));
	wrapperNameBlock.classList.add('wrapper-name-block');


	
	let nameBlockInput = wrapperNameBlock.appendChild(document.createElement('input'));
	nameBlockInput.classList.add('name-block-input');
	nameBlockInput.classList.add('hide-edit-name-block');

	let nameBlock = wrapperNameBlock.appendChild(document.createElement('div'));
	nameBlock.classList.add('name-block');
	nameBlock.innerText = 'Name Block'



	let btnEditNameBlock = tittleBlock.appendChild(document.createElement('button'));
	btnEditNameBlock.classList.add('btn-edit-name-block');
	btnEditNameBlock.setAttribute('id', 'enb');

	let btnDisplayBlock = tittleBlock.appendChild(document.createElement('button'));
	btnDisplayBlock.classList.add('btn-display-block');
	btnDisplayBlock.setAttribute('id', 'disp');

	let btnDeleteBlock = tittleBlock.appendChild(document.createElement('button'));
	btnDeleteBlock.classList.add('btn-delete-block');
	btnDeleteBlock.setAttribute('id', 'x');
	
	parentElement.appendChild(newBlock);

	let createBtn = document.createElement('div');
	createBtn.classList.add('btn-of-block');
	addListenerToCont(createBtn)

	let btn = document.createElement('button');
	btn.classList.add('add-btn');
	btn.setAttribute('id', 'ab');

	newBlock.appendChild(createBtn);
	newBlock.appendChild(btn);

	saveStore();
};


document.addEventListener('click',e => {
	let target = e.target
	if(target.id == 'ab') {
		createElement(target)
		saveStore();
	}	
});


function createElement(parent) {
	const elem = document.createElement('div');
	elem.classList.add('block-elem');
	elem.setAttribute('draggable', 'true');
	addListenerToBtn(elem);

    const btn = elem.appendChild(document.createElement('button'));
	const optionsBlock = elem.appendChild(document.createElement('div'));
	optionsBlock.classList.add('options-block');
	optionsBlock.classList.add('hide');

	let inputNameBtn = optionsBlock.appendChild(document.createElement('input'));
	inputNameBtn.classList.add('input-name-btn')
	inputNameBtn.setAttribute("placeholder", "Name button");
	inputNameBtn.setAttribute("value", "");
	
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
			deleteBtn.setAttribute('id', 'db');
			const saveOptionsBtn = btnsAction.appendChild(document.createElement('button'));
			saveOptionsBtn.classList.add('save-options-btn');
			saveOptionsBtn.innerText = "Save";
			saveOptionsBtn.setAttribute('id', 'sob');

};

document.addEventListener('click',e => {
	let target = e.target;
	if(target.id == 'sob') {		
		saveOptionsBtn(target);
	} else if(target.id == 'db') {
		deleteButton(target);
	} else if(target.classList.contains('btn-select-link') || target.classList.contains('btn-select-copy')) {
		selectFunction(target);
	} else if(!target.closest('.options-block')) {
		closeOptions();
	}
});
const removeDel = () => {
	const elements = document.querySelectorAll('.del');
	elements.forEach(elem => {
		elem.classList.remove('del')
	})
};
document.addEventListener('click', e => {
	if(e.target.id == 'x') {
		e.target.classList.add('del')
		e.target.addEventListener('click', function delBlock(e) {
			if(e.target.classList.contains('del')) {
				deleteBlock(e.target)
			} 
			if(!e.target) {
				e.target.classList.remove('del')
			}
			e.target.removeEventListener('click', delBlock)
		})
	} else {
		removeDel();
	}
})

document.addEventListener('click', e => {
	let target = e.target;
	let switchEditor = document.querySelector('.switch-input').checked;
	if(target.classList.contains('btn-display-block')) {
		changeDisplay(target);
	}
	if(target.classList.contains('name-block')) {
		if(!switchEditor) {
			hideBlock(target);
			saveStore();
		}
		
	}
});

const closeOptions = () => {
	const allOptionsBlock = document.querySelectorAll('.options-block');
	const allBtns = document.querySelectorAll('.btn');
	allOptionsBlock.forEach( btn => {
		btn.classList.add('hide');		
	});
	allBtns.forEach(btn => {
		btn.classList.remove('btn-has-options-open');
	})
};

const openOptions = (target) => {
	let allOptionsBlock = document.querySelectorAll('.options-block');	
	if(target.classList.contains('btn')) {	
		let blockElem = target.closest('.block-elem');
		let optionsBlock = blockElem.querySelector('.options-block');	
		allOptionsBlock.forEach( btn => {
			if(btn == optionsBlock) {
				// let parent = btn.previousSibling
				// console.log(parent);
				btn.classList.remove('hide');
				target.classList.add('btn-has-options-open');
			} else if(!btn.classList.contains('hide') && btn != optionsBlock) {
				btn.classList.add('hide');
			}		
		})
	} else if(!target.closest('.options-block')) {
		allOptionsBlock.forEach( btn => {
			btn.classList.add('hide');
		})
	};
};

document.addEventListener('contextmenu', e => {
	let target = e.target
	if(target.classList.contains('btn')) {
		openOptions(target);
		document.addEventListener('contextmenu', function x(e) {
			if(e.target !== target) {   
				closeOptions();
			}
			document.removeEventListener('contextmenu', x)
		})
	}
	
})

const saveOptionsBtn = (target) => {
	let optionsBlock = target.closest('.options-block');
	let inputNameBtn = optionsBlock.querySelector('.input-name-btn');
	let inputOptionsBtn = optionsBlock.querySelector('.option');
	let selectedFunction = optionsBlock.querySelector('.selected');	
	let btn = optionsBlock.previousSibling;
	if(inputNameBtn !== "" && inputOptionsBtn !== "") {
		btn.innerText = inputNameBtn.value;
		inputNameBtn.setAttribute('value', inputNameBtn.value);
		if(selectedFunction.classList.contains('btn-select-copy')) {
			btn.setAttribute("onClick", `copyText("${inputOptionsBtn.value}")`);
			inputOptionsBtn.setAttribute('value', inputOptionsBtn.value);
		}
		if(selectedFunction.classList.contains('btn-select-link')) {
			btn.setAttribute("onClick", `link("${inputOptionsBtn.value}")`);
			inputOptionsBtn.setAttribute('value', inputOptionsBtn.value);
		}
	}
	closeOptions();
	saveStore();	
}

const deleteButton = (parent) => {
	const blockElem = parent.closest('.block-elem');
	blockElem.remove();
	saveStore();
}
const deleteBlock = (parent) => {
	const block = parent.closest('.block');
	block.remove();
	saveStore();
}

const changeNameBtn = (target) => {
	if(target.classList.contains('name-block-input')) {
		const parent = target.closest('.wrapper-name-block');
		const nameBlock = parent.querySelector('.name-block');
		if(target.value !== "") {
			nameBlock.innerText = target.value;
			saveStore();
		}
		
	}
	
};
let isVisibleInput;
const editNameBlock = (target) => {
	const parent = target.closest('.tittle-block');
	const nameBlock = parent.querySelector('.name-block');
	const nameBlockInput = parent.querySelector('.name-block-input');
	const btnEditNameBlock = parent.querySelector('.btn-edit-name-block');
	const btnDisplayBlock = parent.querySelector('.btn-display-block');
	const btnDeleteBlock = parent.querySelector('.btn-delete-block');

	nameBlock.classList.add('hide-edit-name-block');
	btnEditNameBlock.classList.add('hide-edit-name-block');
	btnDisplayBlock.classList.add('hide-edit-name-block');
	btnDeleteBlock.classList.add('hide-edit-name-block');
	nameBlockInput.classList.remove('hide-edit-name-block');
	nameBlockInput.focus();
	isVisibleInput = nameBlockInput;
}
const closeEditNameBlock = () => {
	const nameBlock = document.querySelectorAll('.name-block');
	const nameBlockInput = document.querySelectorAll('.name-block-input');
	const btnEditNameBlock = document.querySelectorAll('.btn-edit-name-block');
	const btnDisplayBlock = document.querySelectorAll('.btn-display-block');
	const btnDeleteBlock = document.querySelectorAll('.btn-delete-block');

	nameBlock.forEach((el) => {
			el.classList.remove('hide-edit-name-block');
		});
	nameBlockInput.forEach((el) => {
		el.classList.add('hide-edit-name-block');
	});
	btnEditNameBlock.forEach((el) => {
		el.classList.remove('hide-edit-name-block');
	});
	btnDisplayBlock.forEach((el) => {
		el.classList.remove('hide-edit-name-block');
	});
	btnDeleteBlock.forEach((el) => {
		el.classList.remove('hide-edit-name-block');
	});

	isVisibleInput = false;
};



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

function closeInputClick(e) {
	document.addEventListener('click', function x() {
		if(!e.target.classList.contains('name-block-input')) {
			closeEditNameBlock();
		};
		document.removeEventListener('click', x)
	})
}

document.addEventListener('click', function clickEditNameBlock(e) {
	if(e.target.classList.contains('btn-edit-name-block')) {
		editNameBlock(e.target);
		changeNameBtn(e.target);
		document.addEventListener('click', function clickOutInputAfterClickBtnEdit(e) {
			if(isVisibleInput) {
				if(e.target !== isVisibleInput) {
					changeNameBtn(isVisibleInput);
					closeEditNameBlock();					
				}
			}
			this.removeEventListener('click', clickOutInputAfterClickBtnEdit)
			this.removeEventListener('click', clickEditNameBlock)
			document.addEventListener('click', clickEditNameBlock)
		});
		document.addEventListener('keypress', function clickEnter(e) {			
			if (e.code === "Enter") {				
				if(isVisibleInput) {	
						changeNameBtn(isVisibleInput);
						closeEditNameBlock();										
				};				
			};			
			this.removeEventListener('click', clickEnter);
			this.removeEventListener('click', clickEditNameBlock);
			document.addEventListener('click', clickEditNameBlock);
		})
	};
	if(e.target.classList.contains('name-block-input')) {
		document.addEventListener('click', function clickOutInputFromInput(e) {
			
				if(e.target !== isVisibleInput) {
					if(isVisibleInput) {
						changeNameBtn(isVisibleInput);
					}
					
					closeEditNameBlock();					
				};	
			this.removeEventListener('click', clickOutInputFromInput);
			this.removeEventListener('click', clickEditNameBlock);
			document.addEventListener('click', clickEditNameBlock);			
		});
	}
});


const changeDisplay = (target) => {
	let block = target.closest('.block');
	let btnOfBlock = block.querySelector('.btn-of-block');
	btnOfBlock.classList.toggle('flex');
	saveStore();
}


const changeSwitcher = () => {	
	let switchEditor = document.querySelector('.switch-input').checked;
	const btnsAddBtn = document.querySelectorAll('.add-btn');
	const btnsDelBlock = document.querySelectorAll('.btn-delete-block');
	const btnsDisplayBlock = document.querySelectorAll('.btn-display-block');
	const btnsEditNameBlock = document.querySelectorAll('.btn-edit-name-block');
	const btsAddBlock = document.querySelector('.btn-add-block');
	const btnOfBlock = document.querySelectorAll('.btn-of-block.h');
	const btnsMove = document.querySelectorAll('.btns-move');

	if(switchEditor) {
		btnsAddBtn.forEach((btn) => {
			btn.classList.remove('hide')
		});
		btnsDelBlock.forEach((btn) => {
			btn.classList.remove('hide')
		});
		btnsDisplayBlock.forEach((btn) => {
			btn.classList.remove('hide')
		});
		btnsEditNameBlock.forEach((btn) => {
			btn.classList.remove('hide')
		});
		btnOfBlock.forEach(btn => {
			btn.classList.remove('hide');
		});
		btnsMove.forEach(btn => {
			btn.classList.remove('hide');
		});
		btsAddBlock.classList.remove('hide');

	} else {
		btnsAddBtn.forEach((btn) => {
			btn.classList.add('hide')
		});
		btnsDelBlock.forEach((btn) => {
			btn.classList.add('hide')
		});
		btnsDisplayBlock.forEach((btn) => {
			btn.classList.add('hide')
		});
		btnsEditNameBlock.forEach((btn) => {
			btn.classList.add('hide')
		});
		btnOfBlock.forEach(btn => {
			btn.classList.add('hide');
		});
		btnsMove.forEach(btn => {
			btn.classList.add('hide');
		});

		btsAddBlock.classList.add('hide');

	}
}




  ipcRenderer.on('load-store', (_, data) => {
	console.log('LOAD');
	let body = document.getElementById('body');
	if(data) {
		body.innerHTML = data;
	}	
	dragAndDrop();
	changeSwitcher();
})



const addListenerToBtn = (elem) => {
	elem.addEventListener('dragstart', function dragStart (e){
			draggingItem = elem
			elem.classList.add('dragging');
		});
	elem.addEventListener('dragend', function dragEnd (e){
			elem.classList.remove('dragging');
			draggingItem = null;
		});
	elem.addEventListener('dragover', function dragOver (e) {
			e.preventDefault();
			droppedItem = e.target.closest('.block-elem')
			nextElement = (droppedItem === draggingItem.nextElementSibling) ? droppedItem.nextElementSibling: droppedItem
		});
}
const addListenerToCont = (cont) => {
	cont.addEventListener('dragover', function dragOverCont (e) {
			e.preventDefault();			
		});
	cont.addEventListener('dragenter', function dragEnter (e) {
		e.preventDefault();			
	});
	cont.addEventListener('drop', function dragDrop (e){
		cont.insertBefore(draggingItem, nextElement);
		saveStore();
	});		

}

let draggingItem = null;
let droppedItem = null;
let nextElement = null;
const dragAndDrop = () => {
	draggables = document.querySelectorAll('.block-elem');
	containers = document.querySelectorAll('.btn-of-block');

		draggables.forEach( draggable => {
			draggable.addEventListener('dragstart', dragStart);
			draggable.addEventListener('dragend', dragEnd);
			draggable.addEventListener('dragover', dragOver);
			
		});
	
	
	function dragStart (e){
		draggingItem = this
		this.classList.add('dragging');
	};
	function dragEnd (e){
		this.classList.remove('dragging');
		draggingItem = null;
	};
	function dragOver (e) {
		e.preventDefault();
		droppedItem = e.target.closest('.block-elem')
		nextElement = (droppedItem === draggingItem.nextElementSibling) ? droppedItem.nextElementSibling: droppedItem
	};


	containers.forEach(container => {
		container.addEventListener('dragover', dragOverCont)
		container.addEventListener('dragenter', dragEnter)
		container.addEventListener('drop', function dragDrop (e){
			container.insertBefore(draggingItem, nextElement);
			saveStore();
		});	
	})
	function dragOverCont (e) {
		e.preventDefault();			
	}
	function dragEnter (e) {
		e.preventDefault();			
	}
};

const moveBlockUp = (target) => {
	const block = target.closest('.block');
	const prevBlock = block.previousSibling;
	if(prevBlock) {
		block.after(prevBlock);
	}
}
const moveBlockDown = (target) => {
	const block = target.closest('.block');
	const nextBlock = block.nextSibling;
	if(nextBlock) {
		block.before(nextBlock);
	}
}


  //electron-builder --mac
  
