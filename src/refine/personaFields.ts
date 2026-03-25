import type { PersonaConfig } from "./uiOverlay.types";
import type { ResourceField } from "./resourceConfig";

export function visibleFieldsForResource(persona: PersonaConfig | undefined, resourceName: string, fields: ResourceField[]): ResourceField[] {
  if (!persona?.hiddenFields) return fields;
  const hidden = new Set(persona.hiddenFields[resourceName] ?? []);
  if (hidden.size === 0) return fields;
  return fields.filter((f) => !hidden.has(f.name));
}

export function isResourceAllowed(persona: PersonaConfig | undefined, resourceName: string): boolean {
  const list = persona?.resources;
  if (list == null || list === undefined) return true;
  if (Array.isArray(list) && list.length === 0) return false;
  return list.indexOf(resourceName) >= 0;
}
