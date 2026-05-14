// React Theme — extracted from https://graphite.io
// Compatible with: Chakra UI, Stitches, Vanilla Extract, or any CSS-in-JS

/**
 * TypeScript type definition for this theme:
 *
 * interface Theme {
 *   colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    neutral50: string;
    neutral100: string;
    neutral200: string;
    neutral300: string;
    neutral400: string;
    neutral500: string;
    neutral600: string;
    neutral700: string;
 *   };
 *   fonts: {
    body: string;
    mono: string;
 *   };
 *   fontSizes: {
    '132.616': string;
    '88.353': string;
    '51.367': string;
    '46.5016': string;
    '22.1313': string;
    '15.5005': string;
    '13.9505': string;
    '12.5554': string;
    '9.30031': string;
 *   };
 *   space: {
    '8': string;
    '58': string;
    '93': string;
    '115': string;
    '194': string;
 *   };
 *   radii: {
    sm: string;
 *   };
 *   shadows: {
    sm: string;
    md: string;
    lg: string;
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
    "primary": "#42ca80",
    "secondary": "#0000ee",
    "background": "#000000",
    "foreground": "#000000",
    "neutral50": "#c4bcaa",
    "neutral100": "#fff9eb",
    "neutral200": "#000000",
    "neutral300": "#161616",
    "neutral400": "#7c776a",
    "neutral500": "#ffffff",
    "neutral600": "#333333",
    "neutral700": "#9b9b9b"
  },
  "fonts": {
    "body": "'Alliance No 2', sans-serif",
    "mono": "'JetBrains Mono', monospace"
  },
  "fontSizes": {
    "132.616": "132.616px",
    "88.353": "88.353px",
    "51.367": "51.367px",
    "46.5016": "46.5016px",
    "22.1313": "22.1313px",
    "15.5005": "15.5005px",
    "13.9505": "13.9505px",
    "12.5554": "12.5554px",
    "9.30031": "9.30031px"
  },
  "space": {
    "8": "8px",
    "58": "58px",
    "93": "93px",
    "115": "115px",
    "194": "194px"
  },
  "radii": {
    "sm": "4px"
  },
  "shadows": {
    "sm": "rgba(0, 0, 0, 0.2) 0px 2px 5px 0px",
    "md": "rgba(0, 0, 0, 0.2) 8px 8px 0px 0px",
    "lg": "rgb(124, 119, 106) 15px 15px 0px -7px"
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
      "main": "#42ca80",
      "light": "hsl(147, 56%, 68%)",
      "dark": "hsl(147, 56%, 38%)"
    },
    "secondary": {
      "main": "#0000ee",
      "light": "hsl(240, 100%, 62%)",
      "dark": "hsl(240, 100%, 32%)"
    },
    "background": {
      "default": "#000000",
      "paper": "#000000"
    },
    "text": {
      "primary": "#000000",
      "secondary": "#c4bcaa"
    }
  },
  "typography": {
    "fontFamily": "'JetBrains Mono', sans-serif",
    "h1": {
      "fontSize": "46.5016px",
      "fontWeight": "500",
      "lineHeight": "46.5016px"
    },
    "h3": {
      "fontSize": "22.1313px",
      "fontWeight": "500",
      "lineHeight": "22.1313px"
    },
    "body2": {
      "fontSize": "15.5005px",
      "fontWeight": "400",
      "lineHeight": "normal"
    }
  },
  "shape": {
    "borderRadius": 4
  },
  "shadows": [
    "rgba(0, 0, 0, 0.2) 0px 2px 5px 0px",
    "rgba(0, 0, 0, 0.2) 8px 8px 0px 0px",
    "rgb(124, 119, 106) 15px 15px 0px -7px"
  ]
};

export default theme;
