/**
 * Call once after Keycloak.init() so persona resolution can read realm roles.
 * Example:
 *   const kc = new Keycloak("/keycloak.json");
 *   await kc.init({ onLoad: "login-required" });
 *   bindKeycloakForPersona(kc);
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function bindKeycloakForPersona(keycloak: { tokenParsed?: any }): void {
  if (typeof window !== "undefined") {
    (window as unknown as { __KEYCLOAK__: typeof keycloak }).__KEYCLOAK__ = keycloak;
  }
}
