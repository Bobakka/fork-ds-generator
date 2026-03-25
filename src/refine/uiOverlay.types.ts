/**
 * Declarative UI overlay on top of generated refineMeta / resourceConfig.
 * Maintained manually or by an AI step after codegen.
 */
export interface PersonaShell {
  /** Shown in the header next to the brand */
  appTitle: string;
  /** Added to <Layout> for theme-specific CSS */
  layoutClassName?: string;
}

export interface PersonaConfig {
  /** Higher wins when multiple role patterns match (default 0) */
  priority?: number;
  /**
   * If any Keycloak realm role matches (substring, case-sensitive), this persona is chosen.
   * Ignored when Keycloak is not initialized.
   */
  matchRoles?: string[];
  /**
   * Whitelist of resource names from refineMeta. Omit or null = all resources (full admin).
   */
  resources?: string[] | null;
  /**
   * Per-resource field names to hide on list + forms (dotted paths as in refineMeta).
   */
  hiddenFields?: Record<string, string[]>;
  shell?: PersonaShell;
}

export interface RefineUiOverlay {
  version: number;
  /** Used when no role / URL / storage hint matches */
  defaultPersona: string;
  personas: Record<string, PersonaConfig>;
}
