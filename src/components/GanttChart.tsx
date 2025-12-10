import { useEffect, useRef } from 'react';
import { Task, ViewMode } from '../types';
import './GanttChart.css';

interface GanttChartProps {
  tasks: Task[];
  viewMode: ViewMode;
  onTaskChange?: (task: Task) => void;
}

const GanttChart = ({ tasks, viewMode, onTaskChange }: GanttChartProps) => {
  const ganttContainer = useRef<HTMLDivElement>(null);
  const ganttInstance = useRef<any>(null);

  useEffect(() => {
    if (ganttContainer.current && tasks.length > 0) {
      // Limpiar instancia anterior si existe
      if (ganttInstance.current) {
        ganttContainer.current.innerHTML = '';
      }

      // Crear nueva instancia de Gantt
      try {
        ganttInstance.current = new Gantt(ganttContainer.current, tasks, {
          view_mode: viewMode,
          language: 'es',
          bar_height: 30,
          bar_corner_radius: 3,
          arrow_curve: 5,
          padding: 18,
          date_format: 'YYYY-MM-DD',
          custom_popup_html: (task: any) => {
            return `
              <div class="gantt-popup">
                <h3>${task.name}</h3>
                <p><strong>Inicio:</strong> ${new Date(task._start).toLocaleDateString('es-PY')}</p>
                <p><strong>Fin:</strong> ${new Date(task._end).toLocaleDateString('es-PY')}</p>
                <p><strong>Progreso:</strong> ${task.progress}%</p>
              </div>
            `;
          },
          on_click: (task: any) => {
            console.log('Tarea clickeada:', task);
          },
          on_date_change: (task: any, start: Date, end: Date) => {
            if (onTaskChange) {
              const updatedTask: Task = {
                ...task,
                start: start.toISOString().split('T')[0],
                end: end.toISOString().split('T')[0],
              };
              onTaskChange(updatedTask);
            }
          },
          on_progress_change: (task: any, progress: number) => {
            if (onTaskChange) {
              const updatedTask: Task = {
                ...task,
                progress: progress,
              };
              onTaskChange(updatedTask);
            }
          },
        });
      } catch (error) {
        console.error('Error al crear el diagrama Gantt:', error);
      }
    }

    return () => {
      if (ganttContainer.current) {
        ganttContainer.current.innerHTML = '';
      }
    };
  }, [tasks, viewMode, onTaskChange]);

  if (tasks.length === 0) {
    return (
      <div className="gantt-empty">
        <p>No hay proyectos para mostrar. Agrega un proyecto para comenzar.</p>
      </div>
    );
  }

  return <div ref={ganttContainer} className="gantt-container"></div>;
};

export default GanttChart;
