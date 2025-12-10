import { useState, useEffect } from 'react';
import GanttChart from './components/GanttChart';
import Controls from './components/Controls';
import ProjectList from './components/ProjectList';
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
    alert('Funcionalidad de agregar proyecto en desarrollo.\nPróximamente podrás crear proyectos desde la interfaz.');
    // TODO: Implementar modal para crear nuevo proyecto
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
        />

        <GanttChart
          tasks={ganttTasks}
          viewMode={viewMode}
          onTaskChange={handleTaskChange}
        />
      </main>

      <footer className="app-footer">
        <p>Desarrollado por Paco | Versión 1.0.0 MVP</p>
      </footer>
    </div>
  );
}

export default App;
