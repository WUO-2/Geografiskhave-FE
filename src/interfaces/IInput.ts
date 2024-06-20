export interface IInput {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    isWrong?: Boolean;
    iconShow?: string;
    iconHide?: string;
}