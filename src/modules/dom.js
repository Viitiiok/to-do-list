function createToDoCard(todo, onDelete) {
   const card = document.createElement('div');
   card.classList.add('todo-item');

   const titleSpan = document.createElement('span');
   titleSpan.textContent = todo.title;

   const dateSpan = document.createElement('span');
   dateSpan.textContent = todo.dueDate;

   const priorityLabel = document.createElement('label');
   priorityLabel.textContent = 'Priority: ';
   const prioritySelect = document.createElement('select');
   const priorities = ['low', 'medium', 'high'];
   priorities.forEach((p) => {
      const option = document.createElement('option');
      option.value = p;
      option.textContent = p.charAt(0).toUpperCase() + p.slice(1);
      prioritySelect.append(option);
   })
   const deleteBtn = document.createElement('button');
   deleteBtn.textContent = 'Delete';
   deleteBtn.classList.add('delete-btn');

   prioritySelect.value = todo.priority;
   priorityLabel.appendChild(prioritySelect);

   deleteBtn.addEventListener('click', () => {
      onDelete(todo.id);
   })

   card.appendChild(titleSpan);
   card.appendChild(dateSpan);
   card.appendChild(priorityLabel);
   card.appendChild(deleteBtn);

   return card;
}

export function renderTodos(activeProject, onDelete) {
   const container = document.querySelector('#todo-container');
   container.replaceChildren('')

   activeProject.todos.forEach(todo => {
      const card = createToDoCard(todo, onDelete);
      container.append(card);
   });
}

export function renderProjects(projects, activeProject, onSelectProject, onDeleteProject) {
   const projectList = document.querySelector('#project-list');
   projectList.replaceChildren();

   projects.forEach(project => {
      const li = document.createElement('li');
      li.classList.add('project-item');
      
      if (project === activeProject) {
         li.classList.add('active');
      }

      const projectName = document.createElement('span');
      projectName.textContent = project.name;
      li.appendChild(projectName);

      li.addEventListener('click', () => {
         onSelectProject(project);
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete-btn', 'project-delete-btn');
      deleteBtn.type = 'button';
      deleteBtn.disabled = projects.length === 1;
      deleteBtn.setAttribute(
         'aria-label',
         `Delete ${project.name} project${deleteBtn.disabled ? ' (at least one project is required)' : ''}`
      );

      deleteBtn.addEventListener('click', (event) => {
         event.stopPropagation();
         onDeleteProject(project.id);
      })

      li.appendChild(deleteBtn);
      projectList.appendChild(li);
   });
}