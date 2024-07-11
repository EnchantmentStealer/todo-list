import {getAllProjects, getCurrentProject } from "./StorageManager.js"

export function getProjectList() {
  const projects = getAllProjects();
  const projectList = document.createElement("ul");

  projects.forEach(project => {
    const li = document.createElement("li");
    li.textContent = project.name;
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
    li.textContent = item.title;
    todoList.appendChild(li);
  })

  return todoList;
}