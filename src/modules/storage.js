const STORAGE_KEY = 'TOP_TODO_PROJECTS';

export function saveProjects(projects) {
   localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function loadProjects() {
   const data = localStorage.getItem(STORAGE_KEY)
   if (!data) return null;

   try {
      return JSON.parse(data);
   } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return null;
   }
}
