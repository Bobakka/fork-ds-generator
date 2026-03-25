import type { AuthProvider } from "@refinedev/core";
import Keycloak from "keycloak-js";
import type { RefineAuthConfig } from "./authConfig";

const MOCK_STORAGE_KEY = "refine.auth.mock";

function createMockAuthProvider(loginPath: string): AuthProvider {
  return {
    login: async ({ username, password }: { username: string; password: string }) => {
      if (username && password) {
        localStorage.setItem(MOCK_STORAGE_KEY, "1");
        return { success: true, redirectTo: "/" };
      }
      return { success: false, error: new Error("Enter username and password") };
    },
    logout: async () => {
      localStorage.removeItem(MOCK_STORAGE_KEY);
      return { success: true, redirectTo: loginPath };
    },
    check: async () => {
      const ok = localStorage.getItem(MOCK_STORAGE_KEY) === "1";
      return {
        authenticated: ok,
        redirectTo: ok ? undefined : loginPath,
      };
    },
    getIdentity: async () => ({
      id: "mock-user",
      name: "Demo user",
    }),
    onError: async () => ({}),
  };
}

function createKeycloakAuthProvider(keycloak: Keycloak.KeycloakInstance, loginPath: string): AuthProvider {
  return {
    login: async () => {
      await keycloak.login();
      return { success: true };
    },
    logout: async () => {
      await keycloak.logout();
      return { success: true, redirectTo: loginPath };
    },
    check: async () => {
      const ok = !!keycloak.authenticated;
      return {
        authenticated: ok,
        redirectTo: ok ? undefined : loginPath,
      };
    },
    getIdentity: async () => {
      const parsed = keycloak.tokenParsed as Record<string, unknown> | undefined;
      const name =
        (parsed?.preferred_username as string) ||
        (parsed?.name as string) ||
        (parsed?.sub as string) ||
        "user";
      return {
        id: (parsed?.sub as string) ?? "unknown",
        name,
      };
    },
    onError: async () => ({}),
  };
}

export function createRefineAuthProvider(
  cfg: RefineAuthConfig,
  keycloak: Keycloak.KeycloakInstance | null
): AuthProvider | undefined {
  if (!cfg.enabled || cfg.provider === "none") {
    return undefined;
  }
  if (cfg.provider === "mock") {
    return createMockAuthProvider(cfg.loginPath);
  }
  if (cfg.provider === "keycloak") {
    if (!keycloak) {
      throw new Error("Keycloak instance is required for provider=keycloak");
    }
    return createKeycloakAuthProvider(keycloak, cfg.loginPath);
  }
  return undefined;
}
