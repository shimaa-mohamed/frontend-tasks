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
  const nodeId = e.target.parentNode.parentNode;
  mylist.removeChild(document.getElementById(nodeId.id));
  let newarr = [];
  myarr.forEach((item) => {
    if (`li-${item["name"]}` != nodeId.id) {
      newarr.push(item);
    }
  });
  myarr = newarr;
}
function labelListner(labelVal) {
  const labelItem = document.getElementById(labelVal);
  labelItem.addEventListener("click", () => {
    toogleItemState(labelVal);
    console.log("toggled");
  });
  let delBtn = document
    .getElementsByClassName("del-btn")
    .item(mylist.childElementCount - 1);
  delBtn.addEventListener("click", (e) => {
    deleteListItem(e);
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
    mylist.append(newListNode);
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
  const numberOfItems = mylist.childElementCount;
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
toggleTabs();
///////////////////////////////////////////
