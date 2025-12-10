import { Project } from '../types';
import './ProjectList.css';

interface ProjectListProps {
  projects: Project[];
  onSelectProject?: (projectId: string) => void;
  selectedProjectId?: string;
}

const ProjectList = ({ projects, onSelectProject, selectedProjectId }: ProjectListProps) => {
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

          return (
            <div
              key={project.id}
              className={`project-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectProject && onSelectProject(project.id)}
            >
              <div className="project-card-header">
                <h4>{project.name}</h4>
                <span className="project-percentage">{status.percentage}%</span>
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
                  📅 {new Date(project.startDate).toLocaleDateString('es-PY')} - {new Date(project.endDate).toLocaleDateString('es-PY')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectList;
