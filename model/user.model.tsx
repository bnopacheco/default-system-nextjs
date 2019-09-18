export default class User {

    public static builder() {
        return new User();
    }

    public name: string;
    public password: string;
    public email: string;

    public setName(name: string) {
        this.name = name;
        return this;
    }

    public setPassword(password: string) {
        this.password = password;
        return this;
    }

    public setEmail(email: string) {
        this.email = email;
        return this;
    }
}
