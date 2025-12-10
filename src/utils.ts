import { Project, Task } from './types';

export const convertProjectsToGanttTasks = (projects: Project[]): Task[] => {
  const tasks: Task[] = [];

  projects.forEach((project) => {
    // Agregar el proyecto como tarea principal
    tasks.push({
      id: project.id,
      name: `📁 ${project.name}`,
      start: project.startDate,
      end: project.endDate,
      progress: calculateProjectProgress(project),
      custom_class: 'project-bar',
    });

    // Agregar etapas y sus tareas
    project.stages
      .sort((a, b) => a.order - b.order)
      .forEach((stage) => {
        if (stage.tasks.length > 0) {
          // Agregar la etapa como tarea
          const stageStartDate = stage.tasks[0].startDate;
          const stageEndDate = stage.tasks[stage.tasks.length - 1].endDate;
          
          tasks.push({
            id: stage.id,
            name: `  📋 ${stage.name}`,
            start: stageStartDate,
            end: stageEndDate,
            progress: calculateStageProgress(stage.tasks),
            dependencies: project.id,
            custom_class: 'stage-bar',
          });

          // Agregar tareas individuales
          stage.tasks.forEach((task) => {
            tasks.push({
              id: task.id,
              name: `    • ${task.name}`,
              start: task.startDate,
              end: task.endDate,
              progress: task.progress,
              dependencies: stage.id,
              custom_class: getTaskClass(task.status),
            });
          });
        }
      });
  });

  return tasks;
};

const calculateProjectProgress = (project: Project): number => {
  let totalTasks = 0;
  let totalProgress = 0;

  project.stages.forEach((stage) => {
    stage.tasks.forEach((task) => {
      totalTasks++;
      totalProgress += task.progress;
    });
  });

  return totalTasks > 0 ? Math.round(totalProgress / totalTasks) : 0;
};

const calculateStageProgress = (tasks: any[]): number => {
  if (tasks.length === 0) return 0;
  const totalProgress = tasks.reduce((sum, task) => sum + task.progress, 0);
  return Math.round(totalProgress / tasks.length);
};

const getTaskClass = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'task-completed';
    case 'in-progress':
      return 'task-in-progress';
    case 'pending':
      return 'task-pending';
    default:
      return 'task-pending';
  }
};

export const formatDate = (date: string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('es-PY', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
