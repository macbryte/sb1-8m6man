import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyD1z_JICHD_-Vou_qu0ucK-klXk4lgDA2w",
  authDomain: "finance-app-v1.firebaseapp.com",
  projectId: "finance-app-v1",
  storageBucket: "finance-app-v1.firebasestorage.app",
  messagingSenderId: "312214468208",
  appId: "1:312214468208:web:69b06675aeca989393a6b5",
  measurementId: "G-X3D53P7XVE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics with check for browser support
export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);