
const electron = require('electron');
const path = require('path');

const save = document.getElementById('save-block');
let addButton = document.getElementsByClassName('add-btn')
let inputBlock = document.getElementById('input-block');
inputBlock.addEventListener('input', () => {
	console.log(inputBlock.value);
})

save.addEventListener('click', () => {
	newBlock()
});


const clearInput = () => {
	inputBlock.value = ""
}

const addBtn = () => {
	let targetBtn = "WTF"//document.addEventListener('click',e => e.target)
	console.log(targetBtn);
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
	btn.onclick = function() {
		addBtn()
	} 
	createBtn.appendChild(btn)

	createBtn.addEventListener('click', ()=>console.log("вот так ну и ну"))
	newElement.appendChild(createBtn)
	clearInput()
}
//document.addEventListener('click',e => console.log('clicked me'))


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

// if(addButton) {
// 	addButton.addEventListener('click', () => {
// 		addBtn()
// 	});
// }
