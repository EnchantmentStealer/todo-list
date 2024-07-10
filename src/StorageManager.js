import Project from "./Project.js";

export function getAllProjects() {

  if (!localStorage.getItem("projects")) {
    localStorage.setItem(
      "projects",
      JSON.stringify([new Project("default")])
    )
  }

  return JSON.parse(localStorage.getItem("projects"));
}

export function saveAllProjects(projects) {
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function updateIndexes() {
  const projects = getAllProjects();

  projects.forEach((project, idx) => {
    project.index = idx;
  })
  
  saveAllProjects(projects);
}

export function removeProject(index) {
  const projects = getAllProjects();

  projects.splice(index, 1);

  saveAllProjects(projects);
  updateIndexes();
}

export function addNewProject(projectName) {
  const projects = getAllProjects();
  const newProject = new Project(projectName);
  projects.push(newProject);

  saveAllProjects(projects);
  updateIndexes();
}

export function setCurrentProject(projectIndex) {
  const projects = getAllProjects();
  console.log(projects);
  console.log(projects[projectIndex]);
  localStorage.setItem("currentProject", JSON.stringify(projects[projectIndex]));
}

export function getCurrentProject() {

  // If currentProject doesn't exist in local storage set default project as current
  if(!localStorage.getItem("currentProject")) {
    setCurrentProject(0);
  }

  return JSON.parse(localStorage.getItem("currentProject"));
}