# 📊 Gestor de Proyectos con Gantt

Sistema de visualización y gestión de proyectos con diagrama de Gantt interactivo.

## 🚀 Características - MVP v1.0

### ✅ Funcionalidades Actuales
- ✨ Visualización paralela de múltiples proyectos en diagrama Gantt
- 📋 Vista de tarjetas con resumen de proyectos
- 🎯 Estructura de 6 etapas: Inicio, Planificación, Ejecución, Seguimiento, Entrega, Cierre
- 📅 Tres modos de visualización: Día, Semana, Mes
- 📊 Cálculo automático de progreso por proyecto y etapa
- 🎨 Código de colores por estado: Completado (verde), En progreso (naranja), Pendiente (gris)
- 📱 Diseño responsivo

### 🔄 En Desarrollo (Fase 2)
- Edición de fechas por drag-and-drop
- Agregar/editar/eliminar proyectos desde la interfaz
- Integración completa con Firebase
- Filtros y búsqueda de proyectos

## 🛠️ Stack Tecnológico

- **React 18** - Framework principal
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **Frappe Gantt** - Librería para diagrama Gantt
- **Firebase** - Base de datos (preparado, por configurar)
- **Vercel** - Deploy (recomendado)

## 📦 Instalación

### Opción 1: CodeSandbox (Recomendado para inicio rápido)

1. Ve a [CodeSandbox](https://codesandbox.io)
2. Importa este proyecto desde GitHub
3. ¡Listo para trabajar!

### Opción 2: Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

## 🔧 Configuración de Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
2. Habilita Firestore Database
3. Copia tu configuración de Firebase
4. Reemplaza los valores en `src/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};
```

5. Configura las reglas de Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{projectId} {
      allow read, write: if true; // Cambiar según tus necesidades de seguridad
    }
  }
}
```

## 📁 Estructura del Proyecto

```
gantt-project-manager/
├── src/
│   ├── components/
│   │   ├── GanttChart.tsx       # Componente del diagrama Gantt
│   │   ├── GanttChart.css
│   │   ├── Controls.tsx          # Barra de controles
│   │   ├── Controls.css
│   │   ├── ProjectList.tsx       # Lista de proyectos
│   │   └── ProjectList.css
│   ├── services/
│   │   └── projectService.ts     # Servicios de Firebase
│   ├── types.ts                  # Tipos TypeScript
│   ├── utils.ts                  # Utilidades
│   ├── sampleData.ts             # Datos de ejemplo
│   ├── firebase.ts               # Configuración Firebase
│   ├── App.tsx                   # Componente principal
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 Uso

### Datos de Ejemplo

El proyecto incluye 3 proyectos de ejemplo:
1. Sistema de Planillas v2.0
2. Portal de Clientes Web
3. Automatización Inventarios

Cada uno con sus 6 etapas y tareas correspondientes.

### Modificar Proyectos

Para trabajar con tus propios proyectos:

1. Edita `src/sampleData.ts` con tus proyectos
2. O configura Firebase y usa la interfaz (próximamente)

### Estructura de un Proyecto

```typescript
{
  id: 'proj-1',
  name: 'Nombre del Proyecto',
  description: 'Descripción breve',
  startDate: '2024-12-01',
  endDate: '2025-03-31',
  stages: [
    {
      id: 'stage-1',
      name: 'Inicio', // Inicio | Planificación | Ejecución | Seguimiento | Entrega | Cierre
      order: 1,
      tasks: [
        {
          id: 'task-1',
          name: 'Nombre de la tarea',
          startDate: '2024-12-01',
          endDate: '2024-12-03',
          progress: 50,
          status: 'in-progress', // pending | in-progress | completed
          responsable: 'Nombre'
        }
      ]
    }
  ]
}
```

## 🚢 Deploy en Vercel

1. Sube tu código a GitHub
2. Ve a [Vercel](https://vercel.com)
3. Importa tu repositorio
4. Configura las variables de entorno (Firebase config)
5. Deploy automático

## 📝 Próximas Mejoras (Roadmap)

### Fase 2 - Interactividad
- [ ] Drag-and-drop para cambiar fechas
- [ ] Modal para crear/editar proyectos
- [ ] Agregar/eliminar tareas
- [ ] Filtros por proyecto

### Fase 3 - Profesional
- [ ] Dependencias entre tareas
- [ ] Asignación de responsables
- [ ] Notificaciones de retrasos
- [ ] Exportar a PDF
- [ ] Dashboard con métricas
- [ ] Historial de cambios

## 👨‍💻 Desarrollador

Desarrollado por Paco
- Empresa: Mayorista
- Ubicación: Asunción, Paraguay
- Stack favorito: React + TypeScript + Firebase

## 📄 Licencia

Proyecto personal - Uso interno

---

**Versión:** 1.0.0 MVP  
**Última actualización:** Diciembre 2024
