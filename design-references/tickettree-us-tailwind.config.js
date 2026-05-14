/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(161, 94%, 97%)',
            '100': 'hsl(161, 94%, 94%)',
            '200': 'hsl(161, 94%, 86%)',
            '300': 'hsl(161, 94%, 76%)',
            '400': 'hsl(161, 94%, 64%)',
            '500': 'hsl(161, 94%, 50%)',
            '600': 'hsl(161, 94%, 40%)',
            '700': 'hsl(161, 94%, 32%)',
            '800': 'hsl(161, 94%, 24%)',
            '900': 'hsl(161, 94%, 16%)',
            '950': 'hsl(161, 94%, 10%)',
            DEFAULT: '#059669'
        },
        'neutral-50': '#262626',
        'neutral-100': '#f2f2f2',
        'neutral-200': '#ffffff',
        'neutral-300': '#000000',
        'neutral-400': '#d1d5db',
        'neutral-500': '#1a1a1a',
        background: '#1a1a1a',
        foreground: '#000000'
    },
    fontFamily: {
        body: [
            'Times',
            'sans-serif'
        ]
    },
    fontSize: {
        '12': [
            '12px',
            {
                lineHeight: '16px',
                letterSpacing: '1.2px'
            }
        ],
        '14': [
            '14px',
            {
                lineHeight: '20px'
            }
        ],
        '16': [
            '16px',
            {
                lineHeight: '24px'
            }
        ],
        '18': [
            '18px',
            {
                lineHeight: '28px'
            }
        ],
        '20': [
            '20px',
            {
                lineHeight: '25px'
            }
        ],
        '48': [
            '48px',
            {
                lineHeight: '48px'
            }
        ]
    },
    spacing: {
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '1px': '1px'
    },
    borderRadius: {
        md: '7px',
        lg: '16px',
        full: '9999px'
    },
    boxShadow: {
        sm: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.25) 0px 25px 50px -12px',
        xs: 'rgba(255, 255, 255, 0.12) 0px 1px 0px 0px inset, rgba(16, 185, 129, 0.08) 0px 0px 10px 0px'
    },
    screens: {
        xs: '380px',
        '400px': '400px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
    },
    transitionDuration: {
        '100': '0.1s',
        '150': '0.15s',
        '200': '0.2s',
        '300': '0.3s',
        '500': '0.5s',
        '700': '0.7s',
        '1000': '1s'
    },
    transitionTimingFunction: {
        custom: 'cubic-bezier(0, 0, 0.2, 1)',
        default: 'ease'
    },
    container: {
        center: true,
        padding: '0px'
    },
    maxWidth: {
        container: '1280px'
    }
},
  },
};
