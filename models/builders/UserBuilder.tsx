import User from '../user.model';

export default class UserBuilder {

    public static builder() {
        this.user = new User();
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

    public static build() {
        return this.user;
    }

    private static user: User;
}
