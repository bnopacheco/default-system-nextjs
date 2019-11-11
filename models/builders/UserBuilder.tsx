import Company from '../company';
import Role from '../role';
import { roleTypes } from '../roles.types';
import User from '../user.model';
import RoleBuilder from './RoleBuilder';

export default class UserBuilder {

    public static builder() {
        this.user = new User();
        return this;
    }

    public static setId(id: number) {
        this.user.id = id;
        return this;
    }

    public static setName(name: string) {
        this.user.name = name;
        return this;
    }

    public static setPassword(password: string) {
        this.user.password = password;
        return this;
    }

    public static setEmail(email: string) {
        this.user.email = email;
        return this;
    }

    public static setRole(role: keyof typeof roleTypes) {

        if (!this.user.roles) {
            this.user.roles = [];
        }

        this.user.roles.push(RoleBuilder.builder().setName(role).build());
        return this;
    }

    public static setRoles(roles: Role[]) {
        this.user.roles = roles;
        return this;
    }

    public static setToken(token: string) {
        this.user.token = token;
        return this;
    }

    public static setImage(image: string) {
        this.user.image = image;
        return this;
    }

    public static setCompany(company: Company) {
        this.user.company = company;
        return this;
    }

    public static build() {
        return this.user;
    }

    private static user: User;
}
