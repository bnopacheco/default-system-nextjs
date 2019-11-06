import Role from './role';
import { roleTypes } from './roles.types';

export default class User {
    public name: string;
    public password: string;
    public email: string;
    public token: string;
    public roles: Role[];
    public image: string;

    constructor() {
        this.roles = [];
    }

    public containsRole(roleCompare: keyof typeof roleTypes) {
        return this.roles.filter((role: Role) => role.equals(roleCompare)).length > 0;
    }
}
