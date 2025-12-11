import { useState, useEffect } from 'react';
import { StageTask, Stage } from '../types';
import './TaskForm.css';

interface TaskFormProps {
  task?: StageTask;
  stages: Stage[];
  currentStage?: Stage;
  onSave: (stageId: string, task: Omit<StageTask, 'id'>) => void;
  onCancel: () => void;
}

const TaskForm = ({ task, stages, currentStage, onSave, onCancel }: TaskFormProps) => {
  const [formData, setFormData] = useState({
    name: task?.name || '',
    startDate: task?.startDate || '',
    endDate: task?.endDate || '',
    progress: task?.progress || 0,
    status: task?.status || 'pending' as 'pending' | 'in-progress' | 'completed',
    responsable: task?.responsable || '',
    notes: task?.notes || '',
    stageId: currentStage?.id || stages[0]?.id || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name,
        startDate: task.startDate,
        endDate: task.endDate,
        progress: task.progress,
        status: task.status,
        responsable: task.responsable || '',
        notes: task.notes || '',
        stageId: currentStage?.id || stages[0]?.id || '',
      });
    }
  }, [task, currentStage, stages]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'La fecha de inicio es obligatoria';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'La fecha de fin es obligatoria';
    }

    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'La fecha de fin debe ser posterior a la de inicio';
    }

    if (!formData.stageId) {
      newErrors.stageId = 'Debes seleccionar una etapa';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { stageId, ...taskData } = formData;
    onSave(stageId, taskData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    let finalValue: any = value;
    
    if (name === 'progress') {
      finalValue = parseInt(value) || 0;
      // Auto-actualizar estado según progreso
      if (finalValue === 0) {
        setFormData(prev => ({ ...prev, progress: finalValue, status: 'pending' }));
        return;
      } else if (finalValue === 100) {
        setFormData(prev => ({ ...prev, progress: finalValue, status: 'completed' }));
        return;
      } else {
        setFormData(prev => ({ ...prev, progress: finalValue, status: 'in-progress' }));
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: finalValue }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="stageId">
          Etapa <span className="required">*</span>
        </label>
        <select
          id="stageId"
          name="stageId"
          value={formData.stageId}
          onChange={handleChange}
          className={errors.stageId ? 'error' : ''}
        >
          <option value="">Seleccionar etapa...</option>
          {stages.map((stage) => (
            <option key={stage.id} value={stage.id}>
              {stage.name}
            </option>
          ))}
        </select>
        {errors.stageId && <span className="error-message">{errors.stageId}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="name">
          Nombre de la Tarea <span className="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          placeholder="Ej: Reunión kickoff"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="startDate">
            Fecha de Inicio <span className="required">*</span>
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={errors.startDate ? 'error' : ''}
          />
          {errors.startDate && <span className="error-message">{errors.startDate}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="endDate">
            Fecha de Fin <span className="required">*</span>
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={errors.endDate ? 'error' : ''}
          />
          {errors.endDate && <span className="error-message">{errors.endDate}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="progress">
            Progreso (%)
          </label>
          <input
            type="range"
            id="progress"
            name="progress"
            min="0"
            max="100"
            step="5"
            value={formData.progress}
            onChange={handleChange}
          />
          <div className="progress-value">{formData.progress}%</div>
        </div>

        <div className="form-group">
          <label htmlFor="status">Estado</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">⏸️ Pendiente</option>
            <option value="in-progress">🔄 En Progreso</option>
            <option value="completed">✅ Completado</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="responsable">Responsable</label>
        <input
          type="text"
          id="responsable"
          name="responsable"
          value={formData.responsable}
          onChange={handleChange}
          placeholder="Nombre del responsable"
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notas</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Notas adicionales sobre la tarea"
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn-save">
          {task ? 'Guardar Cambios' : 'Crear Tarea'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
