import { variantIcon } from '../../SnackContentProps';
import { Message } from '../Message';

export default class MessageBuilder {

    public static message: Message;

    public static builder() {
        this.message = new Message();
        return this;
    }

    public static setMessage(message: string) {
        this.message.message = message;
        return this;
    }

    public static setVariant(variant: keyof typeof variantIcon) {
        this.message.variant = variant;
        return this;
    }

    public static setSecondsTimeout(seconds: number) {
        this.message.secondsTimeout = seconds;
        return this;
    }

    public static build() {
        return this.message;
    }
}
