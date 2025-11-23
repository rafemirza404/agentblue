/**
 * Environment Configuration
 * Centralized access to environment variables with type safety
 */

const getEnvVar = (key: string, fallback?: string): string => {
  const value = import.meta.env[key];
  if (!value && !fallback) {
    console.error(`Missing required environment variable: ${key}`);
    return '';
  }
  return value || fallback || '';
};

export const ENV = {
  vapi: {
    apiKey: getEnvVar('VITE_VAPI_API_KEY'),
    assistantId: getEnvVar('VITE_VAPI_ASSISTANT_ID'),
  },
  webhooks: {
    checkEligibility: getEnvVar('VITE_N8N_CHECK_ELIGIBILITY'),
    saveProfile: getEnvVar('VITE_N8N_SAVE_PROFILE'),
    lookupUser: getEnvVar('VITE_N8N_LOOKUP_USER'),
    saveCallRecord: getEnvVar('VITE_N8N_SAVE_CALL_RECORD'),
    chatbot: getEnvVar('VITE_N8N_CHATBOT'),
    contactForm: getEnvVar('VITE_N8N_CONTACT_FORM'),
  },
  app: {
    name: getEnvVar('VITE_APP_NAME', 'AgentBlue'),
    contactEmail: getEnvVar('VITE_CONTACT_EMAIL', 'sophia@supportagentblue.in'),
  },
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;
