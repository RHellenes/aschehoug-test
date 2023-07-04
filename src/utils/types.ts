export const units = ['bytes', 'KB', 'MB', 'GB'] as const;
export type UnitTypes = typeof units[number];