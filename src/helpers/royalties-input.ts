export const handleRoyaltiesInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.value.length > 2) {
        return target.value.slice(0, -1);
    }

    return target.value;
};
