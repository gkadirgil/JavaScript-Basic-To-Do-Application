//UI vars

const form = document.querySelector('form');
//input action
const input = document.querySelector('#txtTaskName');
//delete button
const btnDeleteAll = document.querySelector('#btnDeleteAll');
//ul list
const taskList = document.querySelector('#task-list');
//li item
// const items=['item 1','item 2','item 3','item 4'];

let items;




//load items
loadItems();

//call event listeners
eventListeners();

function loadItems(){

    items=getItemsFromLS();
items.forEach(function(data){
    createItem(data);
})

}


//#region Local Storage

//get items from Local Storage
function getItemsFromLS(){
    if(localStorage.getItem('items')===null){
        //items converted to array type
        items=[];
    }
    else{
        items=JSON.parse(localStorage.getItem('items'));
    }

    return items;
}

//set items from Local Storage
function setItemToLS(text){
    //items bring as array type
    items=getItemsFromLS();
    //add an item to array
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

//delete item from LS
function deleteItemFromLS(text){
    items=getItemsFromLS();
    items.forEach(function(data,index){
        if(data===text){
            items.splice(index,1);
        }
    });

    localStorage.setItem('items',JSON.stringify(items));
}


//#endregion



//create li items
function createItem(text){
 //create li
 const li = document.createElement('li');
 li.className = 'list-group-item list-group-item-secondary';
 const textNode = document.createTextNode(text);
 li.appendChild(textNode);

 //create a
 const a = document.createElement('a');
 a.className = 'delete-item float-right';
 a.setAttribute('href', '#');
 a.innerHTML = '<i class="fas fa-times"></i>'

 // add a to li
 li.appendChild(a);

 //add li to ul
 taskList.appendChild(li);

 
}


function eventListeners() {

    //submit event
    form.addEventListener('submit', addNewItem);

    //delete item
    taskList.addEventListener('click', deleteItem);

    //delete all item
    btnDeleteAll.addEventListener('click', deleteAllItems);
}

//add new item
function addNewItem(e) {

    if (input.value === '') {
        alert('add new item');
    }

   //create item
    createItem(input.value);

    //save to Local Storage
    setItemToLS(input.value);
// clear input
input.value = '';
    e.preventDefault();
}

//delete an item
function deleteItem(e) {


    if (e.target.className === 'fas fa-times') {
        e.target.parentElement.parentElement.remove();
    }

    //delete item from LS
    deleteItemFromLS(e.target.parentElement.parentElement.textContent);


    e.preventDefault();
}

//delete all item
function deleteAllItems(e) {

    if (confirm('are you sure to delete all items?')) {
     while(taskList.firstChild){
taskList.removeChild(taskList.firstChild);
     }
        // taskList.innerHTML='';
    }
    
    localStorage.clear();


    e.preventDefault();

}
