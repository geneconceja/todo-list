let confirmingIds = new Set();

function displayTasks(){

  const div = document.getElementById("tasks");
  div.innerHTML = '';

  const taskList = getTasks();

  if(!taskList){

    let p = document.createElement('p');
    p.classList.add("no-tasks")
    p.textContent = "No tasks yet";
    div.appendChild(p);

  }else{

    let ul = document.createElement("ul");
    ul.id = "tasks-list";

    for(const task of taskList){

      let checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.dataset.id = task.id;
      checkBox.checked = task.isDone ? true : false;
      checkBox.classList.add("task");

      let p = document.createElement("p");
      p.textContent = `${task.task} ${task.id}`;
      if(task.isDone) p.classList.add("completed");

      let taskDiv = document.createElement("div");
      taskDiv.classList.add("task-div");
      taskDiv.appendChild(checkBox);
      taskDiv.appendChild(p);
      
      let actionBtnDiv = document.createElement("div");
      actionBtnDiv.classList.add("delete-action");

      if(confirmingIds.has(task.id)){

        let confirmDeleteBtn = document.createElement("button");
        confirmDeleteBtn.type = "button";
        confirmDeleteBtn.dataset.id = task.id;
        confirmDeleteBtn.classList.add("confirm-delete");
        confirmDeleteBtn.textContent = "✓";

        let cancelDeleteBtn = document.createElement("button");
        cancelDeleteBtn.type = "button";
        cancelDeleteBtn.dataset.id = task.id;
        cancelDeleteBtn.classList.add("cancel-delete");
        cancelDeleteBtn.textContent = "X";

        actionBtnDiv.appendChild(cancelDeleteBtn);
        actionBtnDiv.appendChild(confirmDeleteBtn);

      }else{
        let openDeleteBtn = document.createElement("button");
        openDeleteBtn.type = "button";
        openDeleteBtn.dataset.id = task.id;
        openDeleteBtn.classList.add("open-delete-btn");
        openDeleteBtn.textContent = "Delete";
        actionBtnDiv.appendChild(openDeleteBtn);
      }

      let li = document.createElement("li");
      li.classList.add("task");

      li.appendChild(taskDiv);
      li.appendChild(actionBtnDiv);
      ul.appendChild(li);
    }

    div.appendChild(ul);

  }

}

function addTask(){

  let task = document.getElementById("input-task");
  if(task.value=='') return;

  let taskList = getTasks();

  if(!taskList){
    localStorage.setItem("tasksCount", 1);
    localStorage.setItem("tasks", JSON.stringify([{id: 1, task: task.value, isDone: false}]));
  }else{
    let tasksCount = parseInt(localStorage.tasksCount);
    taskList.push({id: ++tasksCount, task: task.value, isDone: false});
    localStorage.setItem("tasksCount", tasksCount);
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }

  task.value = '';
  displayTasks();

}

function getTasks(){

  let taskList = localStorage.getItem("tasks");
  if(!taskList) return;
  return JSON.parse(taskList);

}

function checkTask(id){

  let taskList = getTasks();
  let target = taskList.find(task => task.id===id);

  if(target) target.isDone = !target.isDone;

  localStorage.setItem("tasks", JSON.stringify(taskList));
  displayTasks();

}

function deleteTask(id){
  let taskList = getTasks();
  let updatedTasks = taskList.filter(task => task.id!==id);

  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  displayTasks();
}


// EVENT LISTENERS

// checkbox listener

document.getElementById("tasks").addEventListener("change", function(event){
  if (event.target.matches('input[type="checkbox"]')) {
    const id = Number(event.target.dataset.id);
    checkTask(id);
  }
});

document.getElementById("input-task").addEventListener('keydown', e => e.key == 'Enter' && addTask());

document.getElementById("tasks").addEventListener("click", function(event){
  if (event.target.matches('.open-delete-btn')) {
    const id = Number(event.target.dataset.id);
    confirmingIds.add(id);
    displayTasks();
  }
});

document.getElementById("tasks").addEventListener("click", function(event){
  if (event.target.matches('.cancel-delete')) {
    const id = Number(event.target.dataset.id);
    confirmingIds.delete(id);
    displayTasks();
  }
});

document.getElementById("tasks").addEventListener("click", function(event){
  if (event.target.matches('.confirm-delete')) {
    const id = Number(event.target.dataset.id);
    deleteTask(id);
  }
});

localStorage.clear();
displayTasks();