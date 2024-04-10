document.addEventListener("DOMContentLoaded", function() {
    // Load tasks from local storage
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
      addTaskToList(task);
    });
  });
  
  function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");
  
    if (taskInput.value.trim() === "") {
      alert("Please enter a task.");
      return;
    }
  
    var task = {
      text: taskInput.value,
      completed: false
    };
  
    addTaskToList(task);
    saveTasksToLocalStorage(task);
  
    taskInput.value = "";
  }
  
  function addTaskToList(task) {
    var taskList = document.getElementById("taskList");
    var li = document.createElement("li");
    li.textContent = task.text;
    
    if (task.completed) {
      li.classList.add("completed");
    }
  
    li.onclick = function() {
      task.completed = !task.completed;
      this.classList.toggle("completed");
      saveTasksToLocalStorage(task);
    };
  
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.onclick = function(event) {
      event.stopPropagation();
      taskList.removeChild(li);
      var index = tasks.findIndex(function(t) {
        return t.text === task.text;
      });
      if (index !== -1) {
        tasks.splice(index, 1);
        saveTasksToLocalStorage();
      }
    };
  
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  }
  
  function clearTasks() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
  }
  
  function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  