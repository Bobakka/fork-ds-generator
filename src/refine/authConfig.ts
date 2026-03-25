import refineAuth from "./refineAuth.json";

export type AuthProviderKind = "none" | "mock" | "keycloak";

export interface RefineAuthConfig {
  version: number;
  enabled: boolean;
  loginPath: string;
  provider: AuthProviderKind;
  /** Public URL to keycloak-js adapter JSON (url, realm, clientId) */
  keycloakClientPath: string;
}

const raw = refineAuth as RefineAuthConfig;

export function getAuthConfig(): RefineAuthConfig {
  return raw;
}

export function isAuthEnabled(): boolean {
  return raw.enabled === true && raw.provider !== "none";
}
