import { useState, useEffect } from 'react';
import GanttChart from './components/GanttChart';
import Controls from './components/Controls';
import ProjectList from './components/ProjectList';
import Modal from './components/Modal';
import ProjectForm from './components/ProjectForm';
import TaskForm from './components/TaskForm';
import { Project, ViewMode, Task, StageTask } from './types';
import { convertProjectsToGanttTasks } from './utils';
import { sampleProjects } from './sampleData';
import './App.css';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [ganttTasks, setGanttTasks] = useState<Task[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('Week');
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  
  // Estados para modales de proyectos
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | undefined>();

  // Estados para modales de tareas
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [taskContext, setTaskContext] = useState<{
    projectId: string;
    stageId: string;
    task?: StageTask;
  } | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    const tasks = convertProjectsToGanttTasks(projects);
    setGanttTasks(tasks);
  }, [projects]);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      setProjects(sampleProjects);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProject = () => {
    setIsAddProjectModalOpen(true);
  };

  const handleSaveNewProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProjects(prev => [...prev, newProject]);
    setIsAddProjectModalOpen(false);
  };

  const handleEditProject = (project: Project) => {
    setProjectToEdit(project);
    setIsEditProjectModalOpen(true);
  };

  const handleSaveEditProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!projectToEdit) return;
    const updatedProject: Project = {
      ...projectData,
      id: projectToEdit.id,
      createdAt: projectToEdit.createdAt,
      updatedAt: new Date(),
    };
    setProjects(prev => prev.map(p => p.id === projectToEdit.id ? updatedProject : p));
    setIsEditProjectModalOpen(false);
    setProjectToEdit(undefined);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    if (selectedProjectId === projectId) {
      setSelectedProjectId(undefined);
    }
  };

  const handleAddTask = (projectId: string, stageId: string) => {
    setTaskContext({ projectId, stageId });
    setIsAddTaskModalOpen(true);
  };

  const handleEditTask = (projectId: string, stageId: string, task: StageTask) => {
    setTaskContext({ projectId, stageId, task });
    setIsEditTaskModalOpen(true);
  };

  const handleSaveNewTask = (stageId: string, taskData: Omit<StageTask, 'id'>) => {
    if (!taskContext) return;
    const newTask: StageTask = { ...taskData, id: `task-${Date.now()}` };
    setProjects(prev => prev.map(project => {
      if (project.id === taskContext.projectId) {
        return {
          ...project,
          stages: project.stages.map(stage => {
            if (stage.id === stageId) {
              return { ...stage, tasks: [...stage.tasks, newTask] };
            }
            return stage;
          }),
          updatedAt: new Date(),
        };
      }
      return project;
    }));
    setIsAddTaskModalOpen(false);
    setTaskContext(null);
  };

  const handleSaveEditTask = (stageId: string, taskData: Omit<StageTask, 'id'>) => {
    if (!taskContext || !taskContext.task) return;
    const updatedTask: StageTask = { ...taskData, id: taskContext.task.id };
    setProjects(prev => prev.map(project => {
      if (project.id === taskContext.projectId) {
        return {
          ...project,
          stages: project.stages.map(stage => {
            if (stage.id === stageId) {
              return {
                ...stage,
                tasks: stage.tasks.map(t => t.id === taskContext.task!.id ? updatedTask : t),
              };
            }
            return stage;
          }),
          updatedAt: new Date(),
        };
      }
      return project;
    }));
    setIsEditTaskModalOpen(false);
    setTaskContext(null);
  };

  const handleDeleteTask = (projectId: string, stageId: string, taskId: string) => {
    setProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          stages: project.stages.map(stage => {
            if (stage.id === stageId) {
              return { ...stage, tasks: stage.tasks.filter(t => t.id !== taskId) };
            }
            return stage;
          }),
          updatedAt: new Date(),
        };
      }
      return project;
    }));
  };

  const handleTaskChange = (updatedTask: Task) => {
    console.log('Tarea actualizada:', updatedTask);
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId === selectedProjectId ? undefined : projectId);
  };

  const getCurrentProject = () => {
    if (!taskContext) return undefined;
    return projects.find(p => p.id === taskContext.projectId);
  };

  const getCurrentStage = () => {
    const project = getCurrentProject();
    if (!project || !taskContext) return undefined;
    return project.stages.find(s => s.id === taskContext.stageId);
  };

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando proyectos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 Gestor de Proyectos con Gantt</h1>
        <p className="app-subtitle">Visualiza y gestiona todos tus proyectos en paralelo</p>
      </header>
      <main className="app-main">
        <Controls
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onAddProject={handleAddProject}
          projectCount={projects.length}
        />
        <ProjectList
          projects={projects}
          onSelectProject={handleSelectProject}
          selectedProjectId={selectedProjectId}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
        <GanttChart tasks={ganttTasks} viewMode={viewMode} onTaskChange={handleTaskChange} />
      </main>
      <footer className="app-footer">
        <p>Desarrollado por Paco | Versión 6.0.0 - CRUD Completo con Tareas</p>
      </footer>
      <Modal isOpen={isAddProjectModalOpen} onClose={() => setIsAddProjectModalOpen(false)} title="Nuevo Proyecto">
        <ProjectForm onSave={handleSaveNewProject} onCancel={() => setIsAddProjectModalOpen(false)} />
      </Modal>
      <Modal isOpen={isEditProjectModalOpen} onClose={() => { setIsEditProjectModalOpen(false); setProjectToEdit(undefined); }} title="Editar Proyecto">
        <ProjectForm project={projectToEdit} onSave={handleSaveEditProject} onCancel={() => { setIsEditProjectModalOpen(false); setProjectToEdit(undefined); }} />
      </Modal>
      <Modal isOpen={isAddTaskModalOpen} onClose={() => { setIsAddTaskModalOpen(false); setTaskContext(null); }} title="Nueva Tarea">
        <TaskForm stages={getCurrentProject()?.stages || []} currentStage={getCurrentStage()} onSave={handleSaveNewTask} onCancel={() => { setIsAddTaskModalOpen(false); setTaskContext(null); }} />
      </Modal>
      <Modal isOpen={isEditTaskModalOpen} onClose={() => { setIsEditTaskModalOpen(false); setTaskContext(null); }} title="Editar Tarea">
        <TaskForm task={taskContext?.task} stages={getCurrentProject()?.stages || []} currentStage={getCurrentStage()} onSave={handleSaveEditTask} onCancel={() => { setIsEditTaskModalOpen(false); setTaskContext(null); }} />
      </Modal>
    </div>
  );
}

export default App;
