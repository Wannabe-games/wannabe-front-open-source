export const microStxToStx = (microStx: number | string): number => {
    const num: number = typeof microStx === 'string' ? parseInt(microStx) : microStx;

    return num / 1000000;
};
