import { Project } from './types';

export const sampleProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Sistema de Planillas v2.0',
    description: 'Mejoras al sistema actual de planillas',
    startDate: '2024-12-01',
    endDate: '2025-03-31',
    createdAt: new Date(),
    updatedAt: new Date(),
    stages: [
      {
        id: 'stage-1-1',
        name: 'Inicio',
        order: 1,
        tasks: [
          {
            id: 'task-1-1-1',
            name: 'Reunión kickoff',
            startDate: '2024-12-01',
            endDate: '2024-12-03',
            progress: 100,
            status: 'completed',
            responsable: 'Paco'
          },
          {
            id: 'task-1-1-2',
            name: 'Definición de alcance',
            startDate: '2024-12-04',
            endDate: '2024-12-08',
            progress: 100,
            status: 'completed'
          }
        ]
      },
      {
        id: 'stage-1-2',
        name: 'Planificación',
        order: 2,
        tasks: [
          {
            id: 'task-1-2-1',
            name: 'Análisis de requerimientos',
            startDate: '2024-12-09',
            endDate: '2024-12-20',
            progress: 80,
            status: 'in-progress',
            responsable: 'Paco'
          },
          {
            id: 'task-1-2-2',
            name: 'Diseño de arquitectura',
            startDate: '2024-12-21',
            endDate: '2025-01-10',
            progress: 30,
            status: 'in-progress'
          }
        ]
      },
      {
        id: 'stage-1-3',
        name: 'Ejecución',
        order: 3,
        tasks: [
          {
            id: 'task-1-3-1',
            name: 'Desarrollo backend',
            startDate: '2025-01-11',
            endDate: '2025-02-15',
            progress: 0,
            status: 'pending'
          },
          {
            id: 'task-1-3-2',
            name: 'Desarrollo frontend',
            startDate: '2025-01-20',
            endDate: '2025-02-28',
            progress: 0,
            status: 'pending'
          }
        ]
      },
      {
        id: 'stage-1-4',
        name: 'Seguimiento',
        order: 4,
        tasks: [
          {
            id: 'task-1-4-1',
            name: 'Testing QA',
            startDate: '2025-03-01',
            endDate: '2025-03-15',
            progress: 0,
            status: 'pending'
          }
        ]
      },
      {
        id: 'stage-1-5',
        name: 'Entrega',
        order: 5,
        tasks: [
          {
            id: 'task-1-5-1',
            name: 'Deploy producción',
            startDate: '2025-03-16',
            endDate: '2025-03-20',
            progress: 0,
            status: 'pending'
          },
          {
            id: 'task-1-5-2',
            name: 'Capacitación usuarios',
            startDate: '2025-03-21',
            endDate: '2025-03-25',
            progress: 0,
            status: 'pending'
          }
        ]
      },
      {
        id: 'stage-1-6',
        name: 'Cierre',
        order: 6,
        tasks: [
          {
            id: 'task-1-6-1',
            name: 'Documentación final',
            startDate: '2025-03-26',
            endDate: '2025-03-28',
            progress: 0,
            status: 'pending'
          },
          {
            id: 'task-1-6-2',
            name: 'Reunión de cierre',
            startDate: '2025-03-29',
            endDate: '2025-03-31',
            progress: 0,
            status: 'pending'
          }
        ]
      }
    ]
  },
  {
    id: 'proj-2',
    name: 'Portal de Clientes Web',
    description: 'Desarrollo de portal para clientes mayoristas',
    startDate: '2024-11-15',
    endDate: '2025-02-28',
    createdAt: new Date(),
    updatedAt: new Date(),
    stages: [
      {
        id: 'stage-2-1',
        name: 'Inicio',
        order: 1,
        tasks: [
          {
            id: 'task-2-1-1',
            name: 'Aprobación presupuesto',
            startDate: '2024-11-15',
            endDate: '2024-11-20',
            progress: 100,
            status: 'completed'
          }
        ]
      },
      {
        id: 'stage-2-2',
        name: 'Planificación',
        order: 2,
        tasks: [
          {
            id: 'task-2-2-1',
            name: 'Wireframes y diseño',
            startDate: '2024-11-21',
            endDate: '2024-12-10',
            progress: 100,
            status: 'completed'
          }
        ]
      },
      {
        id: 'stage-2-3',
        name: 'Ejecución',
        order: 3,
        tasks: [
          {
            id: 'task-2-3-1',
            name: 'Implementación UI',
            startDate: '2024-12-11',
            endDate: '2025-01-20',
            progress: 60,
            status: 'in-progress'
          },
          {
            id: 'task-2-3-2',
            name: 'Integración APIs',
            startDate: '2025-01-05',
            endDate: '2025-01-31',
            progress: 40,
            status: 'in-progress'
          }
        ]
      },
      {
        id: 'stage-2-4',
        name: 'Seguimiento',
        order: 4,
        tasks: [
          {
            id: 'task-2-4-1',
            name: 'Pruebas beta',
            startDate: '2025-02-01',
            endDate: '2025-02-15',
            progress: 0,
            status: 'pending'
          }
        ]
      },
      {
        id: 'stage-2-5',
        name: 'Entrega',
        order: 5,
        tasks: [
          {
            id: 'task-2-5-1',
            name: 'Lanzamiento',
            startDate: '2025-02-16',
            endDate: '2025-02-20',
            progress: 0,
            status: 'pending'
          }
        ]
      },
      {
        id: 'stage-2-6',
        name: 'Cierre',
        order: 6,
        tasks: [
          {
            id: 'task-2-6-1',
            name: 'Evaluación proyecto',
            startDate: '2025-02-21',
            endDate: '2025-02-28',
            progress: 0,
            status: 'pending'
          }
        ]
      }
    ]
  },
  {
    id: 'proj-3',
    name: 'Automatización Inventarios',
    description: 'Sistema automatizado de gestión de inventarios',
    startDate: '2025-01-01',
    endDate: '2025-04-30',
    createdAt: new Date(),
    updatedAt: new Date(),
    stages: [
      {
        id: 'stage-3-1',
        name: 'Inicio',
        order: 1,
        tasks: [
          {
            id: 'task-3-1-1',
            name: 'Estudios de viabilidad',
            startDate: '2025-01-01',
            endDate: '2025-01-15',
            progress: 0,
            status: 'pending'
          }
        ]
      },
      {
        id: 'stage-3-2',
        name: 'Planificación',
        order: 2,
        tasks: [
          {
            id: 'task-3-2-1',
            name: 'Levantamiento procesos',
            startDate: '2025-01-16',
            endDate: '2025-02-05',
            progress: 0,
            status: 'pending'
          }
        ]
      },
      {
        id: 'stage-3-3',
        name: 'Ejecución',
        order: 3,
        tasks: [
          {
            id: 'task-3-3-1',
            name: 'Desarrollo módulos',
            startDate: '2025-02-06',
            endDate: '2025-03-25',
            progress: 0,
            status: 'pending'
          }
        ]
      },
      {
        id: 'stage-3-4',
        name: 'Seguimiento',
        order: 4,
        tasks: [
          {
            id: 'task-3-4-1',
            name: 'Validación procesos',
            startDate: '2025-03-26',
            endDate: '2025-04-10',
            progress: 0,
            status: 'pending'
          }
        ]
      },
      {
        id: 'stage-3-5',
        name: 'Entrega',
        order: 5,
        tasks: [
          {
            id: 'task-3-5-1',
            name: 'Migración datos',
            startDate: '2025-04-11',
            endDate: '2025-04-20',
            progress: 0,
            status: 'pending'
          }
        ]
      },
      {
        id: 'stage-3-6',
        name: 'Cierre',
        order: 6,
        tasks: [
          {
            id: 'task-3-6-1',
            name: 'Entrega documentación',
            startDate: '2025-04-21',
            endDate: '2025-04-30',
            progress: 0,
            status: 'pending'
          }
        ]
      }
    ]
  }
];
