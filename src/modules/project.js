import { createTodoItem } from "./todo.js";

export function createProject(name) {
   return {
      id: Date.now().toString(),
      name, 
      todos: [],
   }
}

export function addTodoToProject(project, title, description, dueDate, priority) {

   const todo = createTodoItem(title, description, dueDate, priority)
   project.todos.push(todo)
}

export function removeTodoItemFromProject(project, todoId) {
   project.todos = project.todos.filter(todo => todo.id !== todoId)
}

export function removeProjectFromProjects(projects, projectId) {
   return projects.filter(project => project.id !== projectId)
}
