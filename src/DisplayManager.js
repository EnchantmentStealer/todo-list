import {getAllProjects, getCurrentProject, addNewProject, saveAllProjects, setCurrentProject, } from "./StorageManager.js"
import { addTodoItem, removeTodoItem, updateItemIndexes } from "./TodoListController.js";
import TodoItem from "./TodoItem.js";

export function getProjectList() {
  const projects = getAllProjects();
  const projectList = document.createElement("ul");

  projects.forEach(project => {
    const li = document.createElement("li");
    li.textContent = project.name;
    li.addEventListener("click", () => {
      setCurrentProject(project.index);
      renderTodoList();
    })
    projectList.appendChild(li);
  })

  return projectList;
}

export function getTodoList() {
  const currentProject = getCurrentProject();
  const projects = getAllProjects();
  const todoList = document.createElement("ul");

  projects[currentProject].todoList.forEach(item => {
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Remove";
    deleteButton.addEventListener("click", () => {
      removeTodoItem(projects[currentProject].todoList, item.index);
      updateItemIndexes(projects[currentProject].todoList);
      saveAllProjects(projects);
      renderTodoList();
    });

    li.textContent = item.title;
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  })

  return todoList;
}

export function renderProjects() {
  const div = document.getElementById("sidebar");
  div.innerHTML = '';
  div.appendChild(getProjectList());
}

export function renderTodoList() {
  const div = document.getElementById("content");
  div.innerHTML = "";
  div.appendChild(getTodoList());
}
const projectForm = document.getElementById("newProject");
projectForm.addEventListener("submit", e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  addNewProject(formData.get("projectName"));
  renderProjects();
});

const todoForm = document.getElementById("newItem");
todoForm.addEventListener("submit", e => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const todoItem = new TodoItem(
    formData.get("title"),
    formData.get("description"),
    formData.get("date"),
    formData.get("priority")
  )
  console.log(todoItem);
  const projects = getAllProjects();
  const currentProject = getCurrentProject();

  addTodoItem(projects[currentProject].todoList, todoItem);
  saveAllProjects(projects);
  renderTodoList();
})

renderProjects();
renderTodoList();
