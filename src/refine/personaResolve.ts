import type { RefineUiOverlay } from "./uiOverlay.types";

const STORAGE_KEY = "refine.devPersona";
const QUERY_KEY = "persona";

declare global {
  interface Window {
    /** Optional: set by your Keycloak bootstrap before React mounts */
    __KEYCLOAK__?: {
      tokenParsed?: {
        realm_access?: { roles?: string[] };
        resource_access?: Record<string, { roles?: string[] }>;
      };
    };
  }
}

function readQueryPersona(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const q = new URLSearchParams(window.location.search).get(QUERY_KEY);
  return q?.trim() || undefined;
}

function readStoragePersona(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    return localStorage.getItem(STORAGE_KEY)?.trim() || undefined;
  } catch {
    return undefined;
  }
}

function getKeycloakRealmRoles(): string[] {
  const kc = typeof window !== "undefined" ? window.__KEYCLOAK__ : undefined;
  const roles = kc?.tokenParsed?.realm_access?.roles;
  return Array.isArray(roles) ? roles : [];
}

/**
 * Picks persona id from Keycloak realm roles (highest priority wins), then ?persona=, then localStorage, then default.
 */
export function resolvePersonaId(overlay: RefineUiOverlay): string {
  const realmRoles = getKeycloakRealmRoles();
  if (realmRoles.length > 0) {
    const entries = Object.keys(overlay.personas)
      .map((id: string) => {
        const cfg = overlay.personas[id];
        return {
          id,
          priority: cfg.priority ?? 0,
          patterns: cfg.matchRoles ?? [],
        };
      })
      .sort((a: { priority: number }, b: { priority: number }) => b.priority - a.priority);

    for (let i = 0; i < entries.length; i++) {
      const { id, patterns } = entries[i];
      if (patterns.length === 0) continue;
      const hit = patterns.some((p: string) =>
        realmRoles.some((r: string) => r === p || r.indexOf(p) >= 0)
      );
      if (hit) return id;
    }
  }

  const fromQuery = readQueryPersona();
  if (fromQuery && overlay.personas[fromQuery]) return fromQuery;

  const fromStorage = readStoragePersona();
  if (fromStorage && overlay.personas[fromStorage]) return fromStorage;

  return overlay.defaultPersona;
}
