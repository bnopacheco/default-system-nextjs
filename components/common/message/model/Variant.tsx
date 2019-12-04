import { variantIcon } from '../SnackContentProps';

export default class Variant {
    public static SUCCESS: keyof typeof variantIcon = 'success';
    public static WARNING: keyof typeof variantIcon = 'warning';
    public static ERROR: keyof typeof variantIcon = 'error';
    public static INFO: keyof typeof variantIcon = 'info';
}
