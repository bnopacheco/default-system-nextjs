import Company from './company';
import Role from './role';
import { roleTypes } from './roles.types';

export default class User {
    public id: number;
    public name: string;
    public password: string;
    public email: string;
    public token: string;
    public roles: Role[];
    public image: string;
    public company: Company;

    constructor() {
        this.roles = [];
    }

    public containsRole(roleCompare: keyof typeof roleTypes) {
        return this.roles.filter((role: Role) => role.equals(roleCompare)).length > 0;
    }
}
