import { getEnv } from "./config";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
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

export const signUpWithEmailPassword = async (
  email: string,
  password: string
) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const actionCodeSettings = {
    url: "http://localhost:1911/isVerified",
    handleCodeInApp: true,
  };
  await sendEmailVerification(result.user, actionCodeSettings);
  const id_token = await auth.currentUser?.getIdToken();
  console.log("ID Token:", id_token);
  return result;
};
