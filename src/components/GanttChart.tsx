import { useMemo } from 'react';
import { Task, ViewMode } from '../types';
import './GanttChart.css';

interface GanttChartProps {
  tasks: Task[];
  viewMode: ViewMode;
  onTaskChange?: (task: Task) => void;
}

const GanttChart = ({ tasks, viewMode }: GanttChartProps) => {
  
  const { startDate, endDate, totalDays } = useMemo(() => {
    if (tasks.length === 0) return { startDate: new Date(), endDate: new Date(), totalDays: 0 };
    
    const dates = tasks.flatMap(t => [new Date(t.start), new Date(t.end)]);
    const start = new Date(Math.min(...dates.map(d => d.getTime())));
    const end = new Date(Math.max(...dates.map(d => d.getTime())));
    
    // Agregar margen
    start.setDate(start.getDate() - 2);
    end.setDate(end.getDate() + 2);
    
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    return { startDate: start, endDate: end, totalDays: days };
  }, [tasks]);

  const getColumnWidth = () => {
    switch (viewMode) {
      case 'Day': return 60;
      case 'Week': return 40;
      case 'Month': return 30;
      case 'Quarter': return 20;
      case 'Semester': return 15;
      default: return 40;
    }
  };

  const getTaskPosition = (taskStart: string, taskEnd: string) => {
    const start = new Date(taskStart);
    const end = new Date(taskEnd);
    
    const startOffset = Math.floor((start.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    const columnWidth = getColumnWidth();
    const left = startOffset * columnWidth;
    const width = duration * columnWidth;
    
    return { left, width };
  };

  const getBarClass = (customClass?: string) => {
    if (customClass?.includes('project-bar')) return 'gantt-bar-project';
    if (customClass?.includes('stage-bar')) return 'gantt-bar-stage';
    if (customClass?.includes('completed')) return 'gantt-bar-completed';
    if (customClass?.includes('in-progress')) return 'gantt-bar-in-progress';
    return 'gantt-bar-pending';
  };

  const generateTimelineHeaders = () => {
    const headers = [];
    const columnWidth = getColumnWidth();
    
    if (viewMode === 'Semester') {
      let currentDate = new Date(startDate);
      let semesterIndex = 0;
      
      while (currentDate <= endDate) {
        const semester = currentDate.getMonth() < 6 ? 1 : 2;
        const semesterStart = new Date(currentDate.getFullYear(), semester === 1 ? 0 : 6, 1);
        const semesterEnd = new Date(currentDate.getFullYear(), semester === 1 ? 6 : 12, 0);
        const displayEnd = semesterEnd > endDate ? endDate : semesterEnd;
        
        const daysInRange = Math.ceil((displayEnd.getTime() - semesterStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const width = daysInRange * columnWidth;
        
        headers.push(
          <div key={semesterIndex} className="timeline-header-cell" style={{ width: `${width}px` }}>
            S{semester} {currentDate.getFullYear()}
          </div>
        );
        
        currentDate = new Date(currentDate.getFullYear(), semester === 1 ? 6 : 12, 1);
        if (semester === 2) {
          currentDate.setFullYear(currentDate.getFullYear() + 1);
          currentDate.setMonth(0);
        }
        semesterIndex++;
      }
    } else if (viewMode === 'Quarter') {
      let currentDate = new Date(startDate);
      let quarterIndex = 0;
      
      while (currentDate <= endDate) {
        const quarter = Math.floor(currentDate.getMonth() / 3) + 1;
        const quarterStart = new Date(currentDate.getFullYear(), (quarter - 1) * 3, 1);
        const quarterEnd = new Date(currentDate.getFullYear(), quarter * 3, 0);
        const displayEnd = quarterEnd > endDate ? endDate : quarterEnd;
        
        const daysInRange = Math.ceil((displayEnd.getTime() - quarterStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const width = daysInRange * columnWidth;
        
        headers.push(
          <div key={quarterIndex} className="timeline-header-cell" style={{ width: `${width}px` }}>
            Q{quarter} {currentDate.getFullYear()}
          </div>
        );
        
        currentDate = new Date(currentDate.getFullYear(), quarter * 3, 1);
        quarterIndex++;
      }
    } else if (viewMode === 'Month') {
      let currentDate = new Date(startDate);
      let monthIndex = 0;
      
      while (currentDate <= endDate) {
        const monthStart = new Date(currentDate);
        const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const displayEnd = monthEnd > endDate ? endDate : monthEnd;
        
        const daysInRange = Math.ceil((displayEnd.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const width = daysInRange * columnWidth;
        
        headers.push(
          <div key={monthIndex} className="timeline-header-cell" style={{ width: `${width}px` }}>
            {monthStart.toLocaleDateString('es-PY', { month: 'short', year: 'numeric' })}
          </div>
        );
        
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        monthIndex++;
      }
    } else if (viewMode === 'Week') {
      let weekIndex = 0;
      for (let i = 0; i < totalDays; i += 7) {
        const weekStart = new Date(startDate);
        weekStart.setDate(weekStart.getDate() + i);
        const width = Math.min(7, totalDays - i) * columnWidth;
        
        headers.push(
          <div key={weekIndex} className="timeline-header-cell" style={{ width: `${width}px` }}>
            Semana {weekIndex + 1}
          </div>
        );
        weekIndex++;
      }
    } else {
      for (let i = 0; i < totalDays; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + i);
        
        headers.push(
          <div key={i} className="timeline-header-cell" style={{ width: `${columnWidth}px` }}>
            {currentDate.getDate()}/{currentDate.getMonth() + 1}
          </div>
        );
      }
    }
    
    return headers;
  };

  if (tasks.length === 0) {
    return (
      <div className="gantt-empty">
        <p>No hay proyectos para mostrar. Agrega un proyecto para comenzar.</p>
      </div>
    );
  }

  const columnWidth = getColumnWidth();
  const chartWidth = totalDays * columnWidth;

  return (
    <div className="gantt-wrapper">
      <div className="gantt-container">
        {/* Columna de nombres */}
        <div className="gantt-task-names">
          <div className="gantt-header-spacer">Tareas</div>
          {tasks.map((task) => (
            <div key={task.id} className="gantt-task-name">
              <span className="gantt-task-name-text" title={task.name}>
                {task.name}
              </span>
            </div>
          ))}
        </div>

        {/* Área del timeline */}
        <div className="gantt-timeline-area">
          {/* Headers del timeline */}
          <div className="gantt-timeline-header" style={{ width: `${chartWidth}px` }}>
            {generateTimelineHeaders()}
          </div>

          {/* Grid y barras */}
          <div className="gantt-chart-area" style={{ width: `${chartWidth}px` }}>
            {/* Grid de fondo */}
            <div className="gantt-grid">
              {Array.from({ length: totalDays }).map((_, i) => (
                <div
                  key={i}
                  className="gantt-grid-column"
                  style={{ left: `${i * columnWidth}px`, width: `${columnWidth}px` }}
                />
              ))}
            </div>

            {/* Barras de tareas */}
            {tasks.map((task, index) => {
              const { left, width } = getTaskPosition(task.start, task.end);
              const barClass = getBarClass(task.custom_class);
              const showDates = width > 150; // Solo mostrar fechas si la barra es suficientemente ancha
              
              return (
                <div
                  key={task.id}
                  className="gantt-task-row"
                  style={{ top: `${index * 40}px` }}
                >
                  <div
                    className={`gantt-bar ${barClass}`}
                    style={{ left: `${left}px`, width: `${width}px` }}
                    title={`${task.name}\n${task.start} → ${task.end}\nProgreso: ${task.progress}%`}
                  >
                    <div className="gantt-bar-progress" style={{ width: `${task.progress}%` }} />
                    <div className="gantt-bar-content">
                      {showDates && (
                        <span className="gantt-bar-dates">
                          {new Date(task.start).toLocaleDateString('es-PY', { day: '2-digit', month: '2-digit' })}
                          {' → '}
                          {new Date(task.end).toLocaleDateString('es-PY', { day: '2-digit', month: '2-digit' })}
                        </span>
                      )}
                      <span className="gantt-bar-label">{task.progress}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
