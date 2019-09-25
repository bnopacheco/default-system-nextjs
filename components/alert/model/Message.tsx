import { variantIcon } from '../SnackContentProps';

export class Message {
    public message!: string;
    public variant!: keyof typeof variantIcon;
}
