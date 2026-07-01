let confirmingIds = new Set();
let selectedTasks = new Set();
document.getElementById("delete-completed-tasks").disabled = true;

function displayTasks(){

  const div = document.getElementById("tasks");
  div.innerHTML = '';
  selectedTasks.clear();

  const taskList = getTasks();

  if(taskList.length===0){

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
      checkBox.classList.add("task-cb");

      let p = document.createElement("p");
      p.textContent = `${task.task} ${task.id}`;
      if(task.isDone){
        p.classList.add("completed");
        selectedTasks.add(task.id);
      }else{
        p.classList.remove("completed");
      }

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
  
  toggleDisableDeleteCompleted();

}

function addTask(){

  let task = document.getElementById("input-task");
  if(task.value=='') return;

  let taskList = getTasks();

  let latestId = parseInt(localStorage.tasksLatestId) || 0;
  taskList.push({id: ++latestId, task: task.value.trim(), isDone: false});
  localStorage.setItem("tasksLatestId", latestId);
  localStorage.setItem("tasks", JSON.stringify(taskList));

  task.value = '';
  displayTasks();

}

function getTasks(){

  let taskList = localStorage.getItem("tasks");
  if(!taskList) return [];
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

function deleteCompletedTasks(){

  let taskList = getTasks();
  let updatedTasks = taskList.filter(task=>task.isDone===false);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));

  let btn = document.getElementById("delete-completed-tasks");
  let cancelBtn = document.getElementById("cancel-delete-completed");
  let confirmBtn = document.getElementById("confirm-delete-completed");

  btn.style.display = "inline-block";
  cancelBtn.style.display = "none";
  confirmBtn.style.display = "none";

  displayTasks();

}

function toggleDisableDeleteCompleted(){
  if(selectedTasks.size>0){
    document.getElementById("delete-completed-tasks").disabled = false;
  }else{
    document.getElementById("delete-completed-tasks").disabled = true;
  }
}

// EVENT LISTENERS

document.getElementById("input-task").addEventListener('keydown', e => e.key == 'Enter' && addTask());

document.getElementById("tasks").addEventListener("change", function(event){

  if (event.target.matches('.task-cb')) {
    const id = Number(event.target.dataset.id);
    checkTask(id);
  }
  
});

document.getElementById("tasks").addEventListener("click", function(event){

  if (event.target.matches('.open-delete-btn')) {
    confirmingIds.add(Number(event.target.dataset.id));
    displayTasks();
  }else if(event.target.matches('.cancel-delete')){
    confirmingIds.delete(Number(event.target.dataset.id));
    displayTasks();
  }else if(event.target.matches('.confirm-delete')){
    const id = Number(event.target.dataset.id);
    confirmingIds.delete(id);
    deleteTask(id);
  }

});

document.getElementById("delete-completed-tasks").addEventListener("click", function(event){
  
  let btn = document.getElementById("delete-completed-tasks");
  let cancelBtn = document.getElementById("cancel-delete-completed");
  let confirmBtn = document.getElementById("confirm-delete-completed");

  btn.style.display = "none";
  cancelBtn.style.display = "inline-block";
  confirmBtn.style.display = "inline-block";

});

document.getElementById("cancel-delete-completed").addEventListener("click", function(event){
  
  let btn = document.getElementById("delete-completed-tasks");
  let cancelBtn = document.getElementById("cancel-delete-completed");
  let confirmBtn = document.getElementById("confirm-delete-completed");

  btn.style.display = "inline-block";
  cancelBtn.style.display = "none";
  confirmBtn.style.display = "none";

});

document.getElementById("confirm-delete-completed").addEventListener("click", deleteCompletedTasks);

displayTasks();