import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQnMeQiZY5M_zAgo_MtX784aq-N9hc7NU",
  authDomain: "gantt-project-manager.firebaseapp.com",
  projectId: "gantt-project-manager",
  storageBucket: "gantt-project-manager.firebasestorage.app",
  messagingSenderId: "644678576312",
  appId: "1:644678576312:web:e0c498809765a403306c4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;
