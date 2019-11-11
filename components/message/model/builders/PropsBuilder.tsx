import { variantIcon } from '../../SnackContentProps';
import Props from '../Props';

export default class PropsBuilder {

    public static props: Props;

    public static Builder() {
        this.props = new Props();
        return this;
    }

    public static setClassName(className: string) {
        this.props.className = className;
        return this;
    }

    public static setIndex(index: number) {
        this.props.index = index;
        return this;
    }
    public static setOnClose(onClose: any) {
        this.props.onClose = onClose;
        return this;
    }

    public static setMessage(message: string) {
        this.props.message = message;
        return this;
    }
    public static setVariant(variant: keyof typeof variantIcon) {
        this.props.variant = variant;
        return this;
    }

    public static build() {
        return this.props;
    }
}
