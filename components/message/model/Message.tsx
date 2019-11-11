import { variantIcon } from '../SnackContentProps';

export class Message {
    public message!: string;
    public variant!: keyof typeof variantIcon;
    public secondsTimeout: number = 3;
}
