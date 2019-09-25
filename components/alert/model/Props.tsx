import { variantIcon } from '../SnackContentProps';

export default class Props {
    public className?: string;
    public message?: string;
    public onClose?: any;
    public variant!: keyof typeof variantIcon;
    public index!: number;
}
