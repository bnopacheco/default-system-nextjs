import Module from '../module';
import { moduleTypes } from '../modules.type';

export default class ModuleBuilder {

    public static builder() {
        this.module = new Module();
        return this;
    }

    public static setName(name: keyof typeof moduleTypes) {
        this.module.setName(name);
        return this;
    }

    public static build() {
        return this.module;
    }

    private static module: Module;

}
