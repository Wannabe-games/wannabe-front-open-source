export const truncateWithSeparator = (
    fullStr: string,
    strLen: number,
    separator?: string,
    frontCharsNum?: number,
) => {
    if (fullStr.length <= strLen) return fullStr;

    separator = separator || '...';

    const sepLen = separator.length,
        charsToShow = strLen - sepLen;

    let frontChars;
    let backChars;

    if (frontCharsNum) {
        frontChars = frontCharsNum;
        backChars = charsToShow - frontChars;
    } else {
        frontChars = Math.ceil(charsToShow / 2);
        backChars = Math.floor(charsToShow / 2);
    }

    return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
};
