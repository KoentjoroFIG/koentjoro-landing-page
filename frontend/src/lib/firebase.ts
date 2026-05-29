import { getEnv } from "./config";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  type User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: getEnv.VITE_FIREBASE_API_KEY,
  authDomain: getEnv.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: getEnv.VITE_FIREBASE_PROJECT_ID,
  storageBucket: getEnv.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: getEnv.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: getEnv.VITE_FIREBASE_APP_ID,
  measurementId: getEnv.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

async function verifyTokenWithBackend(user: User) {
  const idToken = await user.getIdToken();
  const response = await fetch(`${getEnv.VITE_API_BASE_URL}/auth/verify-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_token: idToken }),
  });
  if (!response.ok) {
    throw new Error("Backend token verification failed");
  }
  return response.json();
}

export const signUpWithEmailPassword = async (
  email: string,
  password: string
) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const actionCodeSettings = {
    url: `${getEnv.VITE_FRONT_BASE_URL}/home`,
    handleCodeInApp: true,
  };
  await sendEmailVerification(result.user, actionCodeSettings);
  const backendAuth = await verifyTokenWithBackend(result.user);
  return { user: result.user, ...backendAuth };
};

export const signInWithEmail = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const backendAuth = await verifyTokenWithBackend(result.user);
  return { user: result.user, ...backendAuth };
};

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const backendAuth = await verifyTokenWithBackend(result.user);
  return { user: result.user, ...backendAuth };
};

export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

export const logout = async () => {
  await signOut(auth);
};

export { auth };
