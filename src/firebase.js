// ─── Firebase Configuration ───────────────────────────────────────────────────
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyANaSsjXtLYKpTRD641i0E73RJmb9ooTbI",
    authDomain: "neurax-2026.firebaseapp.com",
    projectId: "neurax-2026",
    storageBucket: "neurax-2026.firebasestorage.app",
    messagingSenderId: "137951546285",
    appId: "1:137951546285:web:0a4fdde4d1ba5b415aef24",
    measurementId: "G-747L6S3YD0",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
