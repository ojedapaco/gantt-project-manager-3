import { useState, useEffect } from 'react';
import { Project, Stage } from '../types';
import './ProjectForm.css';

interface ProjectFormProps {
  project?: Project;
  onSave: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const ProjectForm = ({ project, onSave, onCancel }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    name: project?.name || '',
    description: project?.description || '',
    startDate: project?.startDate || '',
    endDate: project?.endDate || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
      });
    }
  }, [project]);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Crear etapas predeterminadas si es un proyecto nuevo
    const stages: Stage[] = project?.stages || [
      {
        id: `stage-inicio-${Date.now()}`,
        name: 'Inicio',
        order: 1,
        tasks: [],
      },
      {
        id: `stage-planificacion-${Date.now()}`,
        name: 'Planificación',
        order: 2,
        tasks: [],
      },
      {
        id: `stage-ejecucion-${Date.now()}`,
        name: 'Ejecución',
        order: 3,
        tasks: [],
      },
      {
        id: `stage-seguimiento-${Date.now()}`,
        name: 'Seguimiento',
        order: 4,
        tasks: [],
      },
      {
        id: `stage-entrega-${Date.now()}`,
        name: 'Entrega',
        order: 5,
        tasks: [],
      },
      {
        id: `stage-cierre-${Date.now()}`,
        name: 'Cierre',
        order: 6,
        tasks: [],
      },
    ];

    onSave({
      ...formData,
      stages,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">
          Nombre del Proyecto <span className="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          placeholder="Ej: Sistema de Planillas v2.0"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Breve descripción del proyecto"
        />
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

      <div className="form-info">
        ℹ️ El proyecto se creará con las 6 etapas estándar: Inicio, Planificación, Ejecución, Seguimiento, Entrega y Cierre. Puedes usar fechas pasadas para proyectos ya iniciados o finalizados.
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn-save">
          {project ? 'Guardar Cambios' : 'Crear Proyecto'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
