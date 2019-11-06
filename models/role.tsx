import { roleTypes } from './roles.types';

export default class Role {
    private name: string;

    public setName(role: keyof typeof roleTypes) {
        this.name = role;
    }

    public equals(role: keyof typeof roleTypes) {
        return this.name === role;
    }
}
