export function parseHexString(str: string) {
    const result = [];
    let i = 0;
    while (i < str.length) {
        result.push(parseInt(str.substring(i, i + 2), 16));
        i += 2;
    }

    return result;
}
