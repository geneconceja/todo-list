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
      checkBox.id = `task${task.id}`;
      checkBox.dataset.id = task.id;
      checkBox.checked = task.isDone ? true : false;
      checkBox.classList.add("task");

      let p = document.createElement("p");
      p.textContent = `${task.task} ${task.id}`;
      if(task.isDone) p.classList.add("completed");

      let li = document.createElement("li");
      li.classList.add("task");

      li.appendChild(checkBox);
      li.appendChild(p);
      ul.appendChild(li);
    }

    div.appendChild(ul);

  }

}

function addTask(){

  let task = document.getElementById("inputTask");
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

// EVENT LISTENERS

// checkbox listener


document.getElementById("tasks").addEventListener("change", function(event){

  if (event.target.matches('input[type="checkbox"]')) {
    const id = Number(event.target.dataset.id);
    checkTask(id);
  }

});

localStorage.clear();
displayTasks();