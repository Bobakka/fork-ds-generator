import Keycloak from "keycloak-js";
import { bindKeycloakForPersona } from "./keycloakPersona";

/**
 * Loads `/keycloak.json` (public) and initializes the client.
 * Returns null if fetch fails or JSON is invalid.
 */
export async function initKeycloak(clientPath: string): Promise<Keycloak.KeycloakInstance | null> {
  try {
    const res = await fetch(clientPath, { cache: "no-store" });
    if (!res.ok) return null;
    const config = await res.json();
    if (!config || typeof config.url !== "string" || typeof config.realm !== "string" || typeof config.clientId !== "string") {
      return null;
    }
    const keycloak = Keycloak(config);
    const authenticated = await keycloak.init({
      onLoad: "check-sso",
      pkceMethod: "S256",
      checkLoginIframe: false,
    });
    void authenticated;
    bindKeycloakForPersona(keycloak);
    return keycloak;
  } catch {
    return null;
  }
}
