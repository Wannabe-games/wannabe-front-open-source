export interface ISwitch {
    checked?: boolean;
    disabled?: boolean;
    label?: string;
    readOnly?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
