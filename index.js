function displayTasks(){

  const ul = document.getElementById("tasks");
  ul.style.listStyleType = 'none';
  ul.innerHTML = '';

  const taskList = getTasks();

  if(!taskList){

    let p = document.createElement('p');
    p.textContent = "No tasks yet";
    ul.appendChild(p);

  }else{

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

      li.appendChild(checkBox);
      li.appendChild(p);
      ul.appendChild(li);
    }

  }

}

function addTask(){

  let task = document.getElementById("inputTask");
  if(task.value=='') return;

  let taskList = getTasks();

  if(!taskList){
    localStorage.setItem("tasks", JSON.stringify([{id: 1, task: task.value, isDone: false}]));
  }else{
    taskList.push({id: taskList.length, task: task.value, isDone: false});
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

// add task listener
document.getElementById("add-task-btn").addEventListener('click', addTask);

// document.getElementById
localStorage.clear()
displayTasks();