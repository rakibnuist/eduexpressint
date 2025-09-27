// Program level options for universities
export const PROGRAM_LEVELS = [
  'Diploma',
  "Bachelor's",
  "Master's",
  'PhD',
  'Language',
  'Foundation',
  'Non-Degree'
] as const;

export type ProgramLevel = typeof PROGRAM_LEVELS[number];
