import { z } from "zod";

const envSchema = z.object({
  // App Config
  VITE_API_BASE_URL: z.string().default("http://localhost:1911/api"),
  VITE_FRONT_BASE_URL: z.string().default("http://localhost:5173"),
  VITE_ENABLE_AUTH: z.string().default("false"),

  // Firebase Config
  VITE_FIREBASE_API_KEY: z.string(),
  VITE_FIREBASE_AUTH_DOMAIN: z.string(),
  VITE_FIREBASE_PROJECT_ID: z.string(),
  VITE_FIREBASE_STORAGE_BUCKET: z.string(),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string(),
  VITE_FIREBASE_APP_ID: z.string(),
  VITE_FIREBASE_MEASUREMENT_ID: z.string(),
});

export const getEnv = envSchema.parse(import.meta.env);
