import { ViewMode } from '../types';
import './Controls.css';

interface ControlsProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onAddProject: () => void;
  projectCount: number;
}

const Controls = ({
  viewMode,
  onViewModeChange,
  onAddProject,
  projectCount,
}: ControlsProps) => {
  const viewModes: ViewMode[] = ['Day', 'Week', 'Month', 'Quarter'];

  return (
    <div className="controls">
      <div className="controls-left">
        <h2 className="controls-title">
          📊 Gestor de Proyectos
        </h2>
        <span className="project-count">
          {projectCount} {projectCount === 1 ? 'proyecto' : 'proyectos'}
        </span>
      </div>

      <div className="controls-right">
        <div className="view-mode-selector">
          <label>Vista:</label>
          {viewModes.map((mode) => (
            <button
              key={mode}
              className={`view-mode-btn ${viewMode === mode ? 'active' : ''}`}
              onClick={() => onViewModeChange(mode)}
            >
              {mode === 'Day' ? 'Día' : 
               mode === 'Week' ? 'Semana' : 
               mode === 'Month' ? 'Mes' :
               'Trimestre'}
            </button>
          ))}
        </div>

        <button className="add-project-btn" onClick={onAddProject}>
          ➕ Nuevo Proyecto
        </button>
      </div>
    </div>
  );
};

export default Controls;
