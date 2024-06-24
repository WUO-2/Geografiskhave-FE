export interface IInput {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void; //added
    isWrong?: Boolean; //added
    iconShow?: string; //added
    iconHide?: string; //added
}