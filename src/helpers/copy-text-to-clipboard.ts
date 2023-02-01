import { toast } from 'react-toastify';

export async function copyTextToClipboard(text: string) {
    toast.info('Copied to clipboard', { toastId: '1' });

    if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
    } else {
        return document.execCommand('copy', true, text);
    }
}
