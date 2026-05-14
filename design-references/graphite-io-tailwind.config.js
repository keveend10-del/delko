/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
    colors: {
        primary: {
            '50': 'hsl(147, 56%, 97%)',
            '100': 'hsl(147, 56%, 94%)',
            '200': 'hsl(147, 56%, 86%)',
            '300': 'hsl(147, 56%, 76%)',
            '400': 'hsl(147, 56%, 64%)',
            '500': 'hsl(147, 56%, 50%)',
            '600': 'hsl(147, 56%, 40%)',
            '700': 'hsl(147, 56%, 32%)',
            '800': 'hsl(147, 56%, 24%)',
            '900': 'hsl(147, 56%, 16%)',
            '950': 'hsl(147, 56%, 10%)',
            DEFAULT: '#42ca80'
        },
        secondary: {
            '50': 'hsl(240, 100%, 97%)',
            '100': 'hsl(240, 100%, 94%)',
            '200': 'hsl(240, 100%, 86%)',
            '300': 'hsl(240, 100%, 76%)',
            '400': 'hsl(240, 100%, 64%)',
            '500': 'hsl(240, 100%, 50%)',
            '600': 'hsl(240, 100%, 40%)',
            '700': 'hsl(240, 100%, 32%)',
            '800': 'hsl(240, 100%, 24%)',
            '900': 'hsl(240, 100%, 16%)',
            '950': 'hsl(240, 100%, 10%)',
            DEFAULT: '#0000ee'
        },
        'neutral-50': '#c4bcaa',
        'neutral-100': '#fff9eb',
        'neutral-200': '#000000',
        'neutral-300': '#161616',
        'neutral-400': '#7c776a',
        'neutral-500': '#ffffff',
        'neutral-600': '#333333',
        'neutral-700': '#9b9b9b',
        background: '#000000',
        foreground: '#000000'
    },
    fontFamily: {
        sans: [
            'Gesta',
            'sans-serif'
        ],
        body: [
            'JetBrains Mono',
            'sans-serif'
        ],
        font2: [
            'Alliance No 2',
            'sans-serif'
        ]
    },
    fontSize: {
        '132.616': [
            '132.616px',
            {
                lineHeight: '119.354px'
            }
        ],
        '88.353': [
            '88.353px',
            {
                lineHeight: '94.5378px'
            }
        ],
        '51.367': [
            '51.367px',
            {
                lineHeight: '66.7772px'
            }
        ],
        '46.5016': [
            '46.5016px',
            {
                lineHeight: '46.5016px'
            }
        ],
        '22.1313': [
            '22.1313px',
            {
                lineHeight: '22.1313px'
            }
        ],
        '15.5005': [
            '15.5005px',
            {
                lineHeight: 'normal'
            }
        ],
        '13.9505': [
            '13.9505px',
            {
                lineHeight: '17.4381px'
            }
        ],
        '12.5554': [
            '12.5554px',
            {
                lineHeight: '15.0665px'
            }
        ],
        '9.30031': [
            '9.30031px',
            {
                lineHeight: '9.30031px'
            }
        ]
    },
    spacing: {
        '4': '8px',
        '29': '58px',
        '97': '194px',
        '93px': '93px',
        '115px': '115px'
    },
    borderRadius: {
        sm: '4px'
    },
    boxShadow: {
        sm: 'rgba(0, 0, 0, 0.2) 0px 2px 5px 0px',
        md: 'rgba(0, 0, 0, 0.2) 8px 8px 0px 0px',
        lg: 'rgb(124, 119, 106) 15px 15px 0px -7px'
    },
    screens: {
        md: '768px'
    },
    transitionDuration: {
        '200': '0.2s',
        '300': '0.3s'
    },
    container: {
        center: true,
        padding: '0px'
    },
    maxWidth: {
        container: '1317.54px'
    }
},
  },
};
