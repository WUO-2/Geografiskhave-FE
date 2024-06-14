export interface IInput {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    iconShow?: string;
    iconHide?: string;
}