# 🚀 Guía de Inicio Rápido - Gestor de Proyectos Gantt

## Opción 1: CodeSandbox (MÁS RÁPIDO) ⚡

### Paso 1: Subir a GitHub
1. Crea un nuevo repositorio en GitHub
2. Sube todos los archivos del proyecto
3. Nombre sugerido: `gantt-project-manager`

### Paso 2: Importar en CodeSandbox
1. Ve a https://codesandbox.io
2. Click en "Import from GitHub"
3. Pega la URL de tu repositorio
4. ¡Espera unos segundos y ya está funcionando!

### Paso 3: Ver tu aplicación
- CodeSandbox instalará automáticamente las dependencias
- Verás la preview en el lado derecho
- Puedes editar el código en tiempo real

---

## Opción 2: Local (Desarrollo en tu PC) 💻

### Requisitos Previos
- Node.js 18+ instalado
- npm o yarn
- Editor de código (VS Code recomendado)

### Instalación

```bash
# 1. Navegar a la carpeta del proyecto
cd gantt-project-manager

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

### Verás algo como:
```
VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 4. Abrir en navegador
Abre http://localhost:5173/ en tu navegador

---

## ¿Qué Verás? 👀

### Pantalla Principal
- **Header azul**: Título del gestor
- **Panel de control**: Botones para cambiar vista (Día/Semana/Mes)
- **Tarjetas de proyectos**: 3 proyectos de ejemplo con su progreso
- **Diagrama Gantt**: Visualización paralela de todos los proyectos

### Proyectos de Ejemplo Incluidos:
1. **Sistema de Planillas v2.0** - En ejecución (30% completo)
2. **Portal de Clientes Web** - En ejecución (60% completo)
3. **Automatización Inventarios** - Pendiente (0% completo)

---

## Primeros Pasos 🎯

### 1. Explorar la Vista
- Cambia entre "Día", "Semana" y "Mes" en el panel superior
- Haz click en las tarjetas de proyectos
- Pasa el mouse sobre las barras del Gantt para ver detalles

### 2. Personalizar con Tus Proyectos

Edita el archivo `src/sampleData.ts`:

```typescript
export const sampleProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'TU PROYECTO AQUÍ',
    description: 'Descripción de tu proyecto',
    startDate: '2024-12-01',
    endDate: '2025-03-31',
    // ... resto de la configuración
  }
];
```

---

## Conectar con Firebase (Opcional) 🔥

### Paso 1: Crear Proyecto Firebase
1. Ve a https://console.firebase.google.com
2. Click en "Agregar proyecto"
3. Sigue el asistente

### Paso 2: Habilitar Firestore
1. En tu proyecto Firebase, ve a "Firestore Database"
2. Click en "Crear base de datos"
3. Selecciona modo de prueba (por ahora)

### Paso 3: Obtener Configuración
1. Ve a "Configuración del proyecto" (ícono de engranaje)
2. Scroll hasta "Tus aplicaciones"
3. Click en el ícono web (</>)
4. Copia la configuración

### Paso 4: Configurar en el Proyecto
Edita `src/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "PEGA_TU_API_KEY",
  authDomain: "PEGA_TU_AUTH_DOMAIN",
  projectId: "PEGA_TU_PROJECT_ID",
  storageBucket: "PEGA_TU_STORAGE_BUCKET",
  messagingSenderId: "PEGA_TU_SENDER_ID",
  appId: "PEGA_TU_APP_ID"
};
```

---

## Deploy en Vercel 🚢

### Desde GitHub (Automático)

1. **Sube tu código a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/TU_USUARIO/gantt-project-manager.git
   git push -u origin main
   ```

2. **Conecta con Vercel**
   - Ve a https://vercel.com
   - Click en "New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es Vite
   - Click en "Deploy"

3. **¡Listo!**
   - Tu app estará en: `tu-proyecto.vercel.app`
   - Cada push a GitHub se desplegará automáticamente

---

## Solución de Problemas 🔧

### "No se encuentran las dependencias"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Puerto 5173 en uso"
```bash
# Matar el proceso
npx kill-port 5173

# O usar otro puerto
npm run dev -- --port 3000
```

### "Error de TypeScript"
```bash
# Regenerar tipos
npm run build
```

---

## Próximos Pasos 📚

1. ✅ **Familiarízate** con la interfaz
2. ✅ **Edita** los proyectos de ejemplo con tus datos
3. ✅ **Prueba** las diferentes vistas (Día/Semana/Mes)
4. 🔄 **Configura** Firebase cuando estés listo
5. 🚀 **Despliega** en Vercel para acceso desde cualquier lugar

---

## ¿Necesitas Ayuda? 💬

Si tienes algún problema:
1. Revisa el archivo `README.md` completo
2. Verifica la consola del navegador (F12) para errores
3. Asegúrate de tener Node.js 18+ instalado

---

**¡Disfruta gestionando tus proyectos con Gantt! 🎉**
