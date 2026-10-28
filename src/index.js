import "./style.css";
import { createProject, addTodoToProject, removeTodoItemFromProject, removeProjectFromProjects } from "./modules/project.js"
import { saveProjects, loadProjects } from "./modules/storage.js"
import { renderTodos, renderProjects } from "./modules/dom.js"

let projects = loadProjects() || [createProject('Inbox')]
let activeProject = projects[0]

function handleNewToDoItem(title, description, dueDate, priority) {
   addTodoToProject(activeProject, title, description, dueDate, priority)
   saveProjects(projects)

   renderTodos(activeProject, handleDeleteTodoItem);
}

function handleDeleteTodoItem(todoId) {
   removeTodoItemFromProject(activeProject, todoId)
   saveProjects(projects)
   renderTodos(activeProject, handleDeleteTodoItem)
}

function handleSelectProject(project) {
   activeProject = project
   document.querySelector('#active-project-title').textContent = project.name
   renderProjects(projects, activeProject, handleSelectProject, handleDeleteProject)
   renderTodos(activeProject, handleDeleteTodoItem)
}

function handleDeleteProject(projectId) {
   if (projects.length === 1) return

   const deletingActiveProject = activeProject.id === projectId
   projects = removeProjectFromProjects(projects, projectId)

   if (deletingActiveProject) {
      activeProject = projects[0]
   }

   saveProjects(projects)
   document.querySelector('#active-project-title').textContent = activeProject.name
   renderProjects(projects, activeProject, handleSelectProject, handleDeleteProject)
   renderTodos(activeProject, handleDeleteTodoItem)
}

function handleNewProject(name) {
   const project = createProject(name)
   projects.push(project)
   activeProject = project
   saveProjects(projects)
   document.querySelector('#active-project-title').textContent = project.name
   renderProjects(projects, activeProject, handleSelectProject, handleDeleteProject)
   renderTodos(activeProject, handleDeleteTodoItem)
}

document.addEventListener('DOMContentLoaded', () => {
   renderProjects(projects, activeProject, handleSelectProject, handleDeleteProject)
   renderTodos(activeProject, handleDeleteTodoItem);

   const projectForm = document.querySelector('#project-form');
   projectForm.addEventListener('submit', (e) => {
      e.preventDefault()

      const projectName = document.querySelector('#project-input').value.trim()
      if (!projectName) return

      handleNewProject(projectName)
      projectForm.reset()
   })

   const todoForm = document.querySelector('#todo-form');

   todoForm.addEventListener('submit', (e) => {
      e.preventDefault()

      const title = document.querySelector('#title-input').value;
      const description = document.querySelector('#desc-input').value;
      const dueDate = document.querySelector('#date-input').value;
      const priority = document.querySelector('#priority-input').value;

      
      handleNewToDoItem(title, description, dueDate, priority);
      todoForm.reset();
   })
})