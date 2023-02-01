export const truncateText = (str: string, charactersNum: number) => {
    return str.substring(0, charactersNum) + '...';
};
