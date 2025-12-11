import { useState } from 'react';
import { Project } from '../types';
import './ProjectList.css';

interface ProjectListProps {
  projects: Project[];
  onSelectProject?: (projectId: string) => void;
  selectedProjectId?: string;
  onEditProject?: (project: Project) => void;
  onDeleteProject?: (projectId: string) => void;
}

const ProjectList = ({ 
  projects, 
  onSelectProject, 
  selectedProjectId,
  onEditProject,
  onDeleteProject 
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
            <div
              key={project.id}
              className={`project-card ${isSelected ? 'selected' : ''}`}
            >
              <div 
                className="project-card-header"
                onClick={() => onSelectProject && onSelectProject(project.id)}
              >
                <div className="project-header-left">
                  <button
                    className="accordion-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleProject(project.id);
                    }}
                  >
                    {isExpanded ? '▼' : '▶'}
                  </button>
                  <h4>{project.name}</h4>
                </div>
                <div className="project-header-right">
                  <span className="project-percentage">{status.percentage}%</span>
                  {onEditProject && (
                    <button
                      className="btn-icon btn-edit"
                      onClick={(e) => handleEdit(e, project)}
                      title="Editar proyecto"
                    >
                      ✏️
                    </button>
                  )}
                  {onDeleteProject && (
                    <button
                      className="btn-icon btn-delete"
                      onClick={(e) => handleDelete(e, project.id, project.name)}
                      title="Eliminar proyecto"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
              
              <p className="project-description">{project.description}</p>
              
              <div className="project-progress-bar">
                <div
                  className="project-progress-fill"
                  style={{ width: `${status.percentage}%` }}
                />
              </div>
              
              <div className="project-card-footer">
                <span className="project-tasks">
                  📋 {status.completedTasks}/{status.totalTasks} tareas
                </span>
                <span className="project-dates">
