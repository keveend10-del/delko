// React Theme — extracted from https://tickettree.us
// Compatible with: Chakra UI, Stitches, Vanilla Extract, or any CSS-in-JS

/**
 * TypeScript type definition for this theme:
 *
 * interface Theme {
 *   colors: {
    primary: string;
    background: string;
    foreground: string;
    neutral50: string;
    neutral100: string;
    neutral200: string;
    neutral300: string;
    neutral400: string;
    neutral500: string;
 *   };
 *   fonts: {
    body: string;
 *   };
 *   fontSizes: {
    '12': string;
    '14': string;
    '16': string;
    '18': string;
    '20': string;
    '48': string;
 *   };
 *   space: {
    '1': string;
    '32': string;
    '48': string;
    '64': string;
    '80': string;
 *   };
 *   radii: {
    md: string;
    lg: string;
    full: string;
 *   };
 *   shadows: {
    sm: string;
    xs: string;
 *   };
 *   states: {
 *     hover: { opacity: number };
 *     focus: { opacity: number };
 *     active: { opacity: number };
 *     disabled: { opacity: number };
 *   };
 * }
 */

export const theme = {
  "colors": {
    "primary": "#059669",
    "background": "#1a1a1a",
    "foreground": "#000000",
    "neutral50": "#262626",
    "neutral100": "#f2f2f2",
    "neutral200": "#ffffff",
    "neutral300": "#000000",
    "neutral400": "#d1d5db",
    "neutral500": "#1a1a1a"
  },
  "fonts": {
    "body": "'Times', sans-serif"
  },
  "fontSizes": {
    "12": "12px",
    "14": "14px",
    "16": "16px",
    "18": "18px",
    "20": "20px",
    "48": "48px"
  },
  "space": {
    "1": "1px",
    "32": "32px",
    "48": "48px",
    "64": "64px",
    "80": "80px"
  },
  "radii": {
    "md": "7px",
    "lg": "16px",
    "full": "9999px"
  },
  "shadows": {
    "sm": "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
    "xs": "rgba(255, 255, 255, 0.12) 0px 1px 0px 0px inset, rgba(16, 185, 129, 0.08) 0px 0px 10px 0px"
  },
  "states": {
    "hover": {
      "opacity": 0.08
    },
    "focus": {
      "opacity": 0.12
    },
    "active": {
      "opacity": 0.16
    },
    "disabled": {
      "opacity": 0.38
    }
  }
};

// MUI v5 theme
export const muiTheme = {
  "palette": {
    "primary": {
      "main": "#059669",
      "light": "hsl(161, 94%, 45%)",
      "dark": "hsl(161, 94%, 15%)"
    },
    "background": {
      "default": "#1a1a1a",
      "paper": "#000000"
    },
    "text": {
      "primary": "#000000",
      "secondary": "#f2f2f2"
    }
  },
  "typography": {
    "fontFamily": "'Times', sans-serif",
    "h1": {
      "fontSize": "48px",
      "fontWeight": "600",
      "lineHeight": "48px"
    },
    "h3": {
      "fontSize": "20px",
      "fontWeight": "600",
      "lineHeight": "25px"
    },
    "body1": {
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "24px"
    },
    "body2": {
      "fontSize": "12px",
      "fontWeight": "300",
      "lineHeight": "16px"
    }
  },
  "shape": {
    "borderRadius": 7
  },
  "shadows": [
    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px",
    "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
    "rgba(255, 255, 255, 0.12) 0px 1px 0px 0px inset, rgba(16, 185, 129, 0.08) 0px 0px 10px 0px"
  ]
};

export default theme;
