export interface Meta {
  description?: string;
  logo?: string;
  ogImage?: string;
  ogUrl?: string;
  title?: string;
  pageTitle?: string;
  layouts?: [];
  pages?: [];
  site?: string;
  stylesheet?: ThemeColors;
}

export interface ThemeColors {
  colors: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
    quaternary?: string;
    quinary?: string;
    senary?: string;
    septenary?: string;
  };
}
