const todo = document.getElementById("search-input");
const form = document.getElementById("form");
const itemsLeftSpan = document.getElementById("items-left");
const submitBtn = document.getElementById("submit-btn");
const tabBtns = document.querySelectorAll(".tab");
const listLabels = document.getElementsByClassName("list-label");
let mylist = document.getElementById("my-todos");


// initial values
let myarr = [];


function generateMyCustomList(val) {
  const newItem = document.createElement("li");
  newItem.innerHTML = ` <div class="round">
      <input type="checkbox" id="item-${val}" />
      <label for="item-${val}" class="list-label" id="${val}">${val}</label>
    </div>
    <button class="del-btn"><img src="images/icon-cross.svg"/></button>`;
    
  return newItem;
}
function checkIfCompleted(item) {
  return item.querySelector('input[type="checkbox"]:checked') !== null;
}
function toogleItemState(val) {
    let toggleVal=false;
  myarr.forEach((listItem) => {
    if (listItem["name"] === val) {
      listItem["completed"] = !listItem["completed"];
      toggleVal=!listItem["completed"];
    }
  })
  let inputItem=document.getElementById(`item-${val}`);
  inputItem.checked=toggleVal;
  ;
}
function labelListner(labelVal){
    const labelItem=document.getElementById(labelVal);
    labelItem.addEventListener("click", () => {
        toogleItemState(labelVal);
        console.log(myarr);
        console.log("toggled");
      });
    //   console.log("#################3");
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function activeItems() {
  removeAllChildNodes(mylist);
  myarr.forEach((listItemObject) => {
    if (!listItemObject["completed"]) {
      const newListNode = generateMyCustomList(listItemObject["name"]);
      mylist.append(newListNode);
      let inputItem=document.getElementById(`item-${listItemObject["name"]}`);
      inputItem.checked=false;
    }
  });
}
function completedItems() {
  removeAllChildNodes(mylist);
  myarr.forEach((listItemObject) => {
    if (listItemObject["completed"]) {
      const newListNode = generateMyCustomList(listItemObject["name"]);
      mylist.append(newListNode);
      let inputItem=document.getElementById(`item-${listItemObject["name"]}`);
      inputItem.checked=true;
      
    }
  });
}
function allItems() {
  removeAllChildNodes(mylist);
  myarr.forEach((listItemObject) => {
    const newListNode = generateMyCustomList(listItemObject["name"]);
    mylist.append(newListNode);
    let inputItem=document.getElementById(`item-${listItemObject["name"]}`);
      inputItem.checked=listItemObject["completed"];
  });
}
function toggleTabs(){
    for (let i = 0; i < tabBtns.length; i++) {
        const tab = tabBtns[i];
        tab.addEventListener("click", (e) => {
          e.preventDefault();
          tabBtns.forEach((t) => {
            t.classList.remove("active");
          });
          tab.classList.add("active");
          if (tab.innerHTML === "All") {
            allItems();
          } 
          else if (tab.innerHTML === "Active") {
            activeItems();
          } 
          else {
            completedItems();
          }
        });
      }
}
function handleLeftItems(){
    const numberOfItems = mylist.childElementCount;
  itemsLeftSpan.innerHTML = `${numberOfItems} items left`;
}
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const itemToBeAdded = todo.value;
  const newItem = generateMyCustomList(itemToBeAdded);
  newItem.classList.add("list-item");
  mylist.append(newItem);
  myarr.push({ name: itemToBeAdded, completed: false });
  labelListner(itemToBeAdded);
  console.log("shklo d5l fya");
  handleLeftItems();
  todo.value = "";
});

toggleTabs();
