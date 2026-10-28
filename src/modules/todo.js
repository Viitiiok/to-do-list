export function createTodoItem(title, description, dueDate, priority) {
   return {
      id: Date.now().toString(),
      title, 
      description, 
      dueDate, 
      priority,
      completed: false,
   }
} 

export function updateTodoItem(todo, updateData) {
   Object.assign(todo, updateData)
}

export function toggleTodoComplete(todo) {
   todo.completed = !todo.completed
}