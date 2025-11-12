export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export const APP_TITLE = "Diagnóstico Master | Escola do Psicólogo";

export const APP_LOGO = "/images/logo-horizontal.png";

// Paleta de cores da Escola do Psicólogo Master
export const COLORS = {
  primary: {
    coral: "#E07856", // Laranja coral principal
    gold: "#F4A261", // Dourado/amarelo
  },
  secondary: {
    navy: "#1a1a2e", // Azul escuro/navy
    darkGray: "#2d2d44",
  },
  neutral: {
    cream: "#f8f6f1", // Bege/creme claro
    lightGreen: "#e8f5e0", // Verde claro
    white: "#ffffff",
    black: "#000000",
  },
};

// Links da Escola do Psicólogo Master
export const ESCOLA_LINKS = {
  main: "https://escoladopsicologo.com.br",
  dtc: "https://dtc.escoladopsicologo.com.br",
  instagram: "https://instagram.com/escoladopsicologo",
  email: "contato@escoladopsicologo.com.br",
};

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};

