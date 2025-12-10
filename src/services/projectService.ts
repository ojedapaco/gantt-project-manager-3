import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Project } from './types';

const PROJECTS_COLLECTION = 'projects';

export const projectService = {
  // Obtener todos los proyectos
  async getAllProjects(): Promise<Project[]> {
    try {
      const q = query(collection(db, PROJECTS_COLLECTION), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Project[];
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
      return [];
    }
  },

  // Crear nuevo proyecto
  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
        ...project,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error al crear proyecto:', error);
      throw error;
    }
  },

  // Actualizar proyecto
  async updateProject(projectId: string, updates: Partial<Project>): Promise<void> {
    try {
      const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
      await updateDoc(projectRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error al actualizar proyecto:', error);
      throw error;
    }
  },

  // Eliminar proyecto
  async deleteProject(projectId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, PROJECTS_COLLECTION, projectId));
    } catch (error) {
      console.error('Error al eliminar proyecto:', error);
      throw error;
    }
  },
};
