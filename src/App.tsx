import { useState, useEffect } from 'react';
import GanttChart from './components/GanttChart';
import Controls from './components/Controls';
import ProjectList from './components/ProjectList';
import Modal from './components/Modal';
import ProjectForm from './components/ProjectForm';
import { Project, ViewMode, Task } from './types';
import { convertProjectsToGanttTasks } from './utils';
import { sampleProjects } from './sampleData';
import './App.css';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [ganttTasks, setGanttTasks] = useState<Task[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('Week');
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  
  // Estados para modales
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | undefined>();

  // Cargar proyectos al iniciar
  useEffect(() => {
    loadProjects();
  }, []);

  // Convertir proyectos a tareas de Gantt cuando cambien
  useEffect(() => {
    const tasks = convertProjectsToGanttTasks(projects);
    setGanttTasks(tasks);
  }, [projects]);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      // Por ahora usamos datos de ejemplo
      // Más adelante puedes conectar con Firebase usando projectService
      setProjects(sampleProjects);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProject = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveNewProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProjects(prev => [...prev, newProject]);
    setIsAddModalOpen(false);
    
    // TODO: Guardar en Firebase
    // await projectService.createProject(projectData);
  };

  const handleEditProject = (project: Project) => {
    setProjectToEdit(project);
    setIsEditModalOpen(true);
  };

  const handleSaveEditProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!projectToEdit) return;

    const updatedProject: Project = {
      ...projectData,
      id: projectToEdit.id,
      createdAt: projectToEdit.createdAt,
      updatedAt: new Date(),
    };

    setProjects(prev => 
      prev.map(p => p.id === projectToEdit.id ? updatedProject : p)
    );
    
    setIsEditModalOpen(false);
    setProjectToEdit(undefined);

    // TODO: Actualizar en Firebase
    // await projectService.updateProject(projectToEdit.id, projectData);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    
    if (selectedProjectId === projectId) {
      setSelectedProjectId(undefined);
    }

    // TODO: Eliminar de Firebase
    // await projectService.deleteProject(projectId);
  };

  const handleTaskChange = (updatedTask: Task) => {
    console.log('Tarea actualizada:', updatedTask);
    // TODO: Implementar la actualización en Firebase
    alert(`Tarea actualizada:\n${updatedTask.name}\nNuevo rango: ${updatedTask.start} - ${updatedTask.end}`);
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId === selectedProjectId ? undefined : projectId);
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
        />

        <GanttChart
          tasks={ganttTasks}
          viewMode={viewMode}
          onTaskChange={handleTaskChange}
        />
      </main>

      <footer className="app-footer">
        <p>Desarrollado por Paco | Versión 5.0.0 - CRUD Completo</p>
      </footer>

      {/* Modal para agregar proyecto */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Nuevo Proyecto"
      >
        <ProjectForm
          onSave={handleSaveNewProject}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Modal para editar proyecto */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setProjectToEdit(undefined);
        }}
        title="Editar Proyecto"
      >
        <ProjectForm
          project={projectToEdit}
          onSave={handleSaveEditProject}
          onCancel={() => {
            setIsEditModalOpen(false);
            setProjectToEdit(undefined);
          }}
        />
      </Modal>
    </div>
  );
}

export default App;
