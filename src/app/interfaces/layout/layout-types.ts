export const LAYOUT_TYPES = {
  CUSTOM: 'custom',
  TABULAR: 'tabular',
  UPDATE: 'update',
  DATA: 'data',
  NONE: ''
} as const;

export type LayoutType = typeof LAYOUT_TYPES[keyof typeof LAYOUT_TYPES];