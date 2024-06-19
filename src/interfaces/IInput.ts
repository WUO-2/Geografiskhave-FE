export interface IInput {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    isWrong?: Boolean;
    iconShow?: string;
    iconHide?: string;
}