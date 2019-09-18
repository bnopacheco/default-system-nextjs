import User from "../user.model";

export default class UserBuilder {

    public static builder() {
        return new UserBuilder();
    }

    private user: User;

    public name(name: string) {
        this.user.name = name;
        return this;
    }

    public password(password: string) {
        this.user.password = password;
        return this;
    }

    public email(email: string) {
        this.user.email = email;
        return this;
    }

    public build() {
        return this.user;
    }
}
