import Role from '../role';
import { roleTypes } from '../roles.types';

export default class RoleBuilder {

    public static builder() {
        this.role = new Role();
        return this;
    }

    public static setName(name: keyof typeof roleTypes) {
        this.role.setName(name);
        return this;
    }

    public static build() {
        return this.role;
    }

    private static role: Role;

}
