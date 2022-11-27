
const electron = require('electron');
const path = require('path');

const save = document.getElementById('save-block');
let inputBlock = document.getElementById('input-block');

const elemBtn = 


inputBlock.addEventListener('input', () => {
	console.log(inputBlock.value);
})

save.addEventListener('click', () => {
	newBlock()
});


const clearInput = () => {
	inputBlock.value = ""
}

const addBtn = (elem) => {
	let btn = document.createElement('button')
	btn.innerText = 'name button'
	elem.before(btn)
}

const newBlock = () => {
	let parentElement = document.getElementById('listBtn');
	let newElement = document.createElement('div');
	newElement.classList.add('block');

	newElement.appendChild(document.createTextNode(inputBlock.value))
  
	parentElement.appendChild(newElement)

	let createBtn = document.createElement('div');
	createBtn.classList.add('add-btn')
	let btn = document.createElement('button')
	btn.innerText = '+'
	createBtn.appendChild(btn)

	createBtn.addEventListener('click', ()=>console.log("вот так ну и ну"))
	newElement.appendChild(createBtn)
	clearInput()
}
document.addEventListener('click',e => {
	let target = e.target
	if(target.innerText == '+') {
		addBtn(target)
	}
	
});

let acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");

    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}


