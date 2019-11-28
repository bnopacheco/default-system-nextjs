import { moduleTypes } from './modules.type';

export default class Module {
    private name: string;

    public setName(module: keyof typeof moduleTypes) {
        this.name = module;
    }

    public equals(module: keyof typeof moduleTypes) {
        return this.name === module;
    }
}
