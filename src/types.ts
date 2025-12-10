export interface Task {
  id: string;
  name: string;
  start: string;
  end: string;
  progress: number;
  dependencies?: string;
  custom_class?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  stages: Stage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Stage {
  id: string;
  name: 'Inicio' | 'Planificación' | 'Ejecución' | 'Seguimiento' | 'Entrega' | 'Cierre';
  tasks: StageTask[];
  order: number;
}

export interface StageTask {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: 'pending' | 'in-progress' | 'completed';
  responsable?: string;
  notes?: string;
}

export type ViewMode = 'Quarter Day' | 'Half Day' | 'Day' | 'Week' | 'Month';
