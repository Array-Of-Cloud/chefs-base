export type ThemeKey =
  | "malabar-night"
  | "spice-garden"
  | "chilli-ivory"
  | "colonial-blue";

export interface Theme {
  "--color-primary": string;
  "--color-primary-hover": string;
  "--color-accent": string;
  "--color-accent-hover": string;
  "--color-surface": string;
  "--color-surface-alt": string;
  "--color-on-dark": string;
  "--color-on-light": string;
  "--color-muted": string;
  "--color-border": string;
}

export const themes: Record<ThemeKey, Theme> = {
  "malabar-night": {
    "--color-primary": "#1C1C1A",
    "--color-primary-hover": "#2E2E2A",
    "--color-accent": "#C99A3E",
    "--color-accent-hover": "#A87D2A",
    "--color-surface": "#F7EDD8",
    "--color-surface-alt": "#EDE3CC",
    "--color-on-dark": "#F7EDD8",
    "--color-on-light": "#1C1C1A",
    "--color-muted": "#6B6560",
    "--color-border": "#D8CEB8",
  },
  "spice-garden": {
    "--color-primary": "#162E0A",
    "--color-primary-hover": "#1E3E10",
    "--color-accent": "#C99A3E",
    "--color-accent-hover": "#A87D2A",
    "--color-surface": "#F4FAF0",
    "--color-surface-alt": "#E6F2E0",
    "--color-on-dark": "#F4FAF0",
    "--color-on-light": "#162E0A",
    "--color-muted": "#4A6040",
    "--color-border": "#C8DCC0",
  },
  "chilli-ivory": {
    "--color-primary": "#5C1208",
    "--color-primary-hover": "#721610",
    "--color-accent": "#C99A3E",
    "--color-accent-hover": "#A87D2A",
    "--color-surface": "#FFF6F0",
    "--color-surface-alt": "#FAEAE0",
    "--color-on-dark": "#FFF6F0",
    "--color-on-light": "#5C1208",
    "--color-muted": "#8A5040",
    "--color-border": "#E8D0C8",
  },
  "colonial-blue": {
    "--color-primary": "#0F1F3D",
    "--color-primary-hover": "#172B52",
    "--color-accent": "#C99A3E",
    "--color-accent-hover": "#A87D2A",
    "--color-surface": "#F5F2EC",
    "--color-surface-alt": "#EAE6DC",
    "--color-on-dark": "#F5F2EC",
    "--color-on-light": "#0F1F3D",
    "--color-muted": "#5A5648",
    "--color-border": "#D4CFC4",
  },
};

export function getTheme(key: ThemeKey | string | undefined): Theme {
  return themes[key as ThemeKey] ?? themes["malabar-night"];
}
