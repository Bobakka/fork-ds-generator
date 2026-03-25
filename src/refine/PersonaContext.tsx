import React, { createContext, useContext, useMemo } from "react";
import uiOverlay from "./refineUiOverlay.json";
import { resolvePersonaId } from "./personaResolve";
import { isResourceAllowed, visibleFieldsForResource } from "./personaFields";
import type { RefineUiOverlay, PersonaConfig } from "./uiOverlay.types";
import { resourceConfigMap, resources as allResources } from "./resourceConfig";
import type { ResourceField } from "./resourceConfig";

const overlay = uiOverlay as RefineUiOverlay;

export interface PersonaContextValue {
  personaId: string;
  persona: PersonaConfig;
  /** Refine `resources` prop subset */
  resources: typeof allResources;
  shell: NonNullable<PersonaConfig["shell"]>;
  getVisibleFields: (resourceName: string) => ResourceField[];
  isResourceAllowed: (resourceName: string) => boolean;
}

const PersonaContext = createContext<PersonaContextValue | null>(null);

export const PersonaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useMemo<PersonaContextValue>(() => {
    const personaId = resolvePersonaId(overlay);
    const persona = overlay.personas[personaId] ?? overlay.personas[overlay.defaultPersona] ?? {};
    const allNames = Object.keys(resourceConfigMap);
    const allowedNames = allNames.filter((name) => isResourceAllowed(persona, name));
    const allowedSet = new Set(allowedNames);

    const resources = allResources.filter((r) => allowedSet.has(r.name));

    const getVisibleFields = (resourceName: string): ResourceField[] => {
      const cfg = resourceConfigMap[resourceName];
      if (!cfg) return [];
      return visibleFieldsForResource(persona, resourceName, cfg.fields);
    };

    const shell = persona.shell ?? { appTitle: "DS Admin" };

    return {
      personaId,
      persona,
      resources,
      shell: { appTitle: shell.appTitle, layoutClassName: shell.layoutClassName },
      getVisibleFields,
      isResourceAllowed: (resourceName: string) => allowedSet.has(resourceName),
    };
  }, []);

  return <PersonaContext.Provider value={value}>{children}</PersonaContext.Provider>;
};

export function usePersona(): PersonaContextValue {
  const ctx = useContext(PersonaContext);
  if (!ctx) throw new Error("usePersona must be used under PersonaProvider");
  return ctx;
}

export { overlay as uiOverlayStatic };
