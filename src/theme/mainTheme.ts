export const theme = {
    color: {
        // [Figma]: based on the color names
        black: '#000',
        blackAlpha: {
            a10: 'rgba(11, 27, 40, 0.1)',
            a85: 'rgba(11, 27, 40, 0.85)',
            a90: 'rgba(11, 27, 40, 0.9)',
        },
        blackLike: '#0B1B28',
        gradient: {
            linear: {
                multicolor: {
                    first: 'linear-gradient(95.3deg, #6720F8 0%, #F6C944 50%, #1EF6DF 100%)',
                    purple: 'linear-gradient(1deg, #FF45FF 11.52%, #6720F8 79.61%)',
                },
                nftBadge:
                    'linear-gradient(50.3deg, #6720F8 22.68%, #F6C944 43.98%, #1EF6DF 61.69%, #6720F8 77.32%)',
            },
        },
        neon: {
            aqua: '#1EF6DF',
            pink: '#FF45FF',
            purple: '#48266F',
            violet: '#6720F8',
            yellow: '#FFEA03',
        },
        status: {
            error: '#F03030',
            success: '#16D13F',
        },
        stone: '#263A49',
        stoneAlpha: {
            a20: 'rgba(38, 58, 73, 0.2)',
        },

        white: '#fff',
        whiteAlpha: {
            a05: 'rgba(255, 255, 255, 0.05)',
            a20: 'rgba(255, 255, 255, 0.2)',
            a40: 'rgba(255, 255, 255, 0.4)',
            a60: 'rgba(255, 255, 255, 0.6)',
        },
        yellow: '#F6C944',
    },
    font: {
        family: {
            primary: 'Roboto, sans-serif',
        },
        size: {
            h1: '5.8rem',
            h2: '3.2rem',
            h3: '2.6rem',
            h4: '2.2rem',
            h5: '1.8rem',
            h6: '1.6rem',
            body1: '1.4rem',
            body2: '1.2rem',
            body3: '0.9rem',
        },
        weight: {
            light: 300,
            regular: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            black: 900,
        },
    },
    transition: {
        duration: {
            default: '0.15s',
        },
    },
};

export type Theme = typeof theme;
