import { useState } from 'react';
import { Project, StageTask } from '../types';
import './ProjectList.css';

interface ProjectListProps {
  projects: Project[];
  onSelectProject?: (projectId: string) => void;
  selectedProjectId?: string;
  onEditProject?: (project: Project) => void;
  onDeleteProject?: (projectId: string) => void;
  onAddTask?: (projectId: string, stageId: string) => void;
  onEditTask?: (projectId: string, stageId: string, task: StageTask) => void;
  onDeleteTask?: (projectId: string, stageId: string, taskId: string) => void;
}

const ProjectList = ({ 
  projects, 
  onSelectProject, 
  selectedProjectId,
  onEditProject,
  onDeleteProject,
  onAddTask,
  onEditTask,
  onDeleteTask
}: ProjectListProps) => {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  const getProjectStatus = (project: Project) => {
    let totalTasks = 0;
    let completedTasks = 0;
    project.stages.forEach((stage) => {
      stage.tasks.forEach((task) => {
        totalTasks++;
        if (task.status === 'completed') {
          completedTasks++;
        }
      });
    });
    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    return { totalTasks, completedTasks, percentage };
  };

  const handleDelete = (e: React.MouseEvent, projectId: string, projectName: string) => {
    e.stopPropagation();
    if (window.confirm(`¿Estás seguro de eliminar el proyecto "${projectName}"? Esta acción no se puede deshacer.`)) {
      onDeleteProject?.(projectId);
    }
  };

  const handleEdit = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    onEditProject?.(project);
  };

  const handleDeleteTask = (e: React.MouseEvent, projectId: string, stageId: string, taskId: string, taskName: string) => {
    e.stopPropagation();
    if (window.confirm(`¿Estás seguro de eliminar la tarea "${taskName}"?`)) {
      onDeleteTask?.(projectId, stageId, taskId);
    }
  };

  if (projects.length === 0) {
    return (
      <div className="project-list-empty">
        <p>No hay proyectos disponibles</p>
      </div>
    );
  }

  return (
    <div className="project-list">
      <h3 className="project-list-title">Proyectos Activos</h3>
      <div className="project-cards">
        {projects.map((project) => {
          const status = getProjectStatus(project);
          const isSelected = selectedProjectId === project.id;
          const isExpanded = expandedProjects.has(project.id);

          return (
            <div key={project.id} className={`project-card ${isSelected ? 'selected' : ''}`}>
              <div className="project-card-header" onClick={() => onSelectProject && onSelectProject(project.id)}>
                <div className="project-header-left">
                  <button className="accordion-button" onClick={(e) => { e.stopPropagation(); toggleProject(project.id); }}>
                    {isExpanded ? '▼' : '▶'}
                  </button>
                  <h4>{project.name}</h4>
                </div>
                <div className="project-header-right">
                  <span className="project-percentage">{status.percentage}%</span>
                  {onEditProject && (
                    <button className="btn-icon btn-edit" onClick={(e) => handleEdit(e, project)} title="Editar proyecto">✏️</button>
                  )}
                  {onDeleteProject && (
                    <button className="btn-icon btn-delete" onClick={(e) => handleDelete(e, project.id, project.name)} title="Eliminar proyecto">🗑️</button>
                  )}
                </div>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-progress-bar">
                <div className="project-progress-fill" style={{ width: `${status.percentage}%` }} />
              </div>
              <div className="project-card-footer">
                <span className="project-tasks">📋 {status.completedTasks}/{status.totalTasks} tareas</span>
                <span className="project-dates">📅 {new Date(project.startDate).toLocaleDateString('es-PY')} - {new Date(project.endDate).toLocaleDateString('es-PY')}</span>
              </div>
              {isExpanded && (
                <div className="project-stages">
                  <div className="stages-header">
                    <h5 className="stages-title">Etapas:</h5>
                    {onAddTask && (
                      <button className="btn-add-task-small" onClick={() => onAddTask(project.id, project.stages[0]?.id)} title="Agregar nueva tarea">
                        ➕ Tarea
                      </button>
                    )}
                  </div>
                  {project.stages.sort((a, b) => a.order - b.order).map((stage) => (
                    <div key={stage.id} className="stage-item">
                      <div className="stage-header">
                        <span className="stage-name">📋 {stage.name}</span>
                        <span className="stage-task-count">{stage.tasks.filter(t => t.status === 'completed').length}/{stage.tasks.length}</span>
                      </div>
                      {stage.tasks.length > 0 && (
                        <ul className="task-list">
                          {stage.tasks.map((task) => (
                            <li key={task.id} className={`task-item task-${task.status}`}>
                              <span className="task-status-icon">{task.status === 'completed' ? '✅' : task.status === 'in-progress' ? '🔄' : '⏸️'}</span>
                              <div className="task-info">
                                <span className="task-name">{task.name}</span>
                                {task.responsable && <span className="task-responsable">👤 {task.responsable}</span>}
                              </div>
                              <span className="task-progress">{task.progress}%</span>
                              <div className="task-actions">
                                {onEditTask && (
                                  <button className="btn-task-icon" onClick={(e) => { e.stopPropagation(); onEditTask(project.id, stage.id, task); }} title="Editar tarea">✏️</button>
                                )}
                                {onDeleteTask && (
                                  <button className="btn-task-icon" onClick={(e) => handleDeleteTask(e, project.id, stage.id, task.id, task.name)} title="Eliminar tarea">🗑️</button>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectList;
