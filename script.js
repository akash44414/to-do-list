document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
  
    addTaskButton.addEventListener("click", addTask);
  
    loadTasks();
  
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === "") return;
  
      const taskItem = createTaskItem(taskText);
      taskList.appendChild(taskItem);
  
      saveTasks();
  
      taskInput.value = "";
      taskInput.focus();
    }
  
    function createTaskItem(taskText) {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete">Delete</button>
      `;
  
      const deleteButton = li.querySelector(".delete");
      deleteButton.addEventListener("click", deleteTask);
  
      return li;
    }
  
    function deleteTask(event) {
      const taskItem = event.target.parentElement;
      taskList.removeChild(taskItem);
      saveTasks();
    }
  
    function saveTasks() {
      const tasks = Array.from(taskList.children).map((taskItem) => {
        return taskItem.querySelector("span").innerText;
      });
  
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function loadTasks() {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      savedTasks.forEach((taskText) => {
        const taskItem = createTaskItem(taskText);
        taskList.appendChild(taskItem);
      });
    }
  });
  