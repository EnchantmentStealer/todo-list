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