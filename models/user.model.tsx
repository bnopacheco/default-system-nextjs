import Company from './company';
import Module from './module';
import { moduleTypes } from './modules.type';
import Role from './role';
import { roleTypes } from './roles.types';

export default class User {
    public id: number;
    public name: string;
    public password: string;
    public email: string;
    public token: string;
    public roles: Role[];
    public modules: Module[];
    public image: string;
    public company: Company;

    constructor() {
        this.roles = [];
        this.modules = [];
    }

    public containsRole(roleCompare: keyof typeof roleTypes) {
        return this.roles.filter((role: Role) => role.equals(roleCompare)).length > 0;
    }

    public containsModule(moduleCompare: keyof typeof moduleTypes) {
        return this.modules.filter((module: Module) => module.equals(moduleCompare)).length > 0;
    }
}
