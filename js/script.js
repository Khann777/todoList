const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");

let taskArray = JSON.parse(localStorage.getItem("todos")) || [];

function clearData() {
  window.localStorage.removeItem("todos");
  location.reload();
}

const saveTask = (event) => {
  event.preventDefault();
  let taskListItem = document.createElement("li");

  let itemID = document.createElement("span");
  let itemName = document.createElement("span");
  let itemCheckbox = document.createElement("input");

  itemID.innerHTML = taskArray.length + 1;
  itemID.setAttribute("id", "itemID");
  itemName.innerHTML = taskInput.value;
  itemCheckbox.setAttribute("type", "checkbox");

  itemCheckbox.checked;

  taskListItem.appendChild(itemID);
  taskListItem.appendChild(itemName);
  taskListItem.appendChild(itemCheckbox);

  const task = {
    id: itemID.textContent,
    name: itemName.textContent,
    isChecked: itemCheckbox.checked,
  };

  taskListItem.style.listStyleType = "none";
  taskListItem.style.display = "flex";
  taskListItem.style.justifyContent = "space-between";
  taskListItem.style.width = "450px";
  taskListItem.style.flexWrap = "wrap";
  taskListItem.style.color = "#278ac4";
  taskListItem.style.fontWeight = "700";
  taskListItem.style.fontSize = "24px";
  taskListItem.style.textTransform = "capitalize";
  taskListItem.style.margin = "10px";
  itemCheckbox.style.width = "20px";
  itemCheckbox.style.height = "20px";
  itemCheckbox.setAttribute("onclick", `checkID(${taskArray.length + 1})`);

  if (taskInput.value !== "") {
    taskList.appendChild(taskListItem);
    taskArray.push(task);

    localStorage.setItem("todos", JSON.stringify(taskArray));
    taskInput.value = "";
  }
};

const update = () => {
  if (taskArray.length !== 0) {
    taskArray.forEach((item) => {
      let taskListItem = document.createElement("li");

      let itemID = document.createElement("span");
      let itemName = document.createElement("span");
      let itemCheckbox = document.createElement("input");

      itemID.innerHTML = item.id;
      itemID.setAttribute("id", "itemID");

      itemName.innerHTML = item.name;
      itemCheckbox.setAttribute("type", "checkbox");
      itemCheckbox.checked = item.isChecked;

      taskListItem.appendChild(itemID);
      taskListItem.appendChild(itemName);
      taskListItem.appendChild(itemCheckbox);

      taskListItem.style.listStyleType = "none";
      taskListItem.style.display = "flex";
      taskListItem.style.justifyContent = "space-between";
      taskListItem.style.width = "450px";
      taskListItem.style.flexWrap = "wrap";
      taskListItem.style.color = "#278ac4";
      taskListItem.style.fontWeight = "700";
      taskListItem.style.fontSize = "24px";
      taskListItem.style.textTransform = "capitalize";
      taskListItem.style.margin = "10px";
      itemCheckbox.style.width = "20px";
      itemCheckbox.style.height = "20px";
      itemCheckbox.setAttribute("onclick", `checkID(${item.id})`);

      taskList.appendChild(taskListItem);
    });
  }
};

const deleteTask = () => {
  console.log("taskArray: ", taskArray);
  let newTaskArray = taskArray.map((item) => {
    if (item.isChecked) {
      taskArray.splice(item.id - 1, 1);
    }
  });

  taskArray = newTaskArray;
  localStorage.setItem("todos", JSON.stringify(newTaskArray));
};

update();

const checkID = (id) => {
  let newTaskArray = taskArray.map((item) => {
    if (+item.id === +id) {
      return {
        ...item,
        isChecked: !item.isChecked,
      };
    } else {
      return;
    }
  });

  taskArray = newTaskArray;
  localStorage.setItem("todos", JSON.stringify(newTaskArray));
};
