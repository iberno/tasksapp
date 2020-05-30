import { collactedTasks } from '../constants';
export const collactedTasksExist = selectedProject => 
    collactedTasks.find(task => task.key === selectedProject);