const todo = document.getElementById("search-input");
const form = document.getElementById("form");
const itemsLeftSpan = document.getElementById("items-left");
const submitBtn = document.getElementById("submit-btn");
const tabBtns = document.querySelectorAll(".tab");
const body=document.querySelector("body");
const searchRegion=document.querySelector(".search");
const todosContainer=document.querySelector(".todos-container");
const listLabels = document.getElementsByClassName("list-label");
let mylist = document.getElementById("my-todos");



// initial values
let myarr = [];
let dark= true;

function changeTheme(){
  const themeBtn=document.getElementById("theme-btn");
  const themeLogo=document.getElementById("theme-logo");
  const themeImg=document.getElementById("top-img");
  themeBtn.addEventListener("click",()=>{
    dark=!dark;
    if(dark){
      themeLogo.src="images/icon-moon.svg";
    themeImg.src="images/bg-desktop-light.jpg"
    body.style.backgroundColor="hsl(0, 0%, 98%)";
    searchRegion.style.backgroundColor="hsl(0, 0%, 98%)";
    todosContainer.style.backgroundColor="hsl(0, 0%, 98%)";
    todo.style.backgroundColor="hsl(0, 0%, 98%)";
    todo.style.color="#000"
    }
    else{
      themeLogo.src="images/icon-sun.svg";
      themeImg.src="images/bg-desktop-dark.jpg";
      body.style.backgroundColor="hsl(235, 24%, 19%)";
      searchRegion.style.backgroundColor="hsl(235, 24%, 19%)";
      todosContainer.style.backgroundColor="hsl(235, 24%, 19%)";
      todo.style.backgroundColor="hsl(235, 24%, 19%)";
      todo.style.color="#fff"

    }
    
  })
}
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
  let toggleVal = false;
  myarr.forEach((listItem) => {
    if (listItem["name"] === val) {
      listItem["completed"] = !listItem["completed"];
      toggleVal = !listItem["completed"];
    }
  });
  let inputItem = document.getElementById(`item-${val}`);
  inputItem.checked = toggleVal;
}
function deleteListItem(e) {
  let node = e.target.parentNode.parentNode;
  if(node.id==="my-todos"){
    node=e.target.parentNode;
  }
  mylist.removeChild(node);
  let newarr = [];
  myarr.forEach((item) => {
    if (`li-${item["name"]}` != node.id) {
      newarr.push(item);
    }
  });
  myarr = newarr;
  allItems();
  handleLeftItems();
}
function labelListner(labelVal) {
  const labelItem = document.getElementById(labelVal);
  labelItem.addEventListener("click", () => {
    toogleItemState(labelVal);
    console.log("toggled");
    handleLeftItems();
  });
  let delBtn = document
    .getElementsByClassName("del-btn")
    .item(mylist.childElementCount - 1);
  delBtn.addEventListener("click", (e) => {
    deleteListItem(e);
  });
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
      let inputItem = document.getElementById(`item-${listItemObject["name"]}`);
      inputItem.checked = false;
    }
  });
}
function completedItems() {
  removeAllChildNodes(mylist);
  myarr.forEach((listItemObject) => {
    if (listItemObject["completed"]) {
      const newListNode = generateMyCustomList(listItemObject["name"]);
      mylist.append(newListNode);
      let inputItem = document.getElementById(`item-${listItemObject["name"]}`);
      inputItem.checked = true;
    }
  });
}
function allItems() {
  removeAllChildNodes(mylist);
  myarr.forEach((listItemObject) => {
    const newListNode = generateMyCustomList(listItemObject["name"]);
    newListNode.classList.add("list-item");
    newListNode.setAttribute("id", `li-${listItemObject["name"]}`);
    mylist.append(newListNode);
    labelListner(listItemObject["name"]);
    let inputItem = document.getElementById(`item-${listItemObject["name"]}`);
    inputItem.checked = listItemObject["completed"];
  });
}
function clearCompleted(){
  myarr.forEach(item=>{
    if(item["completed"]===true){
      let index = myarr.indexOf(item);
      myarr.splice(index, 1);
    }
  })
}
function clearCompletedListner(){
  document.getElementById("del-btn-all").addEventListener("click",()=>{
    clearCompleted();
    console.log(myarr);
    allItems();
  })
}
function toggleTabs() {
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
      } else if (tab.innerHTML === "Active") {
        activeItems();
      } else {
        completedItems();
      }
    });
  }
}
function handleLeftItems() {
  let numberOfItems = 0;
  myarr.forEach((item)=>{
    if(item["completed"]===false){
      numberOfItems++;
    }
  })
  console.log(numberOfItems);
  itemsLeftSpan.innerHTML = `${numberOfItems} items left`;
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const itemToBeAdded = todo.value;
  const newItem = generateMyCustomList(itemToBeAdded);
  newItem.classList.add("list-item");
  newItem.setAttribute("id", `li-${itemToBeAdded}`);
  mylist.append(newItem);
  myarr.push({ name: itemToBeAdded, completed: false });
  todo.value = "";
  labelListner(itemToBeAdded);
  handleLeftItems();
  clearCompletedListner();
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
changeTheme();
toggleTabs();


/////////////////// for reordering by dragging////////////////////////
new Sortable(mylist,{
  animation: 350
});