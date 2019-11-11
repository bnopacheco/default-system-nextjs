import Company from '../company';

export default class CompanyBuilder {

    public static builder() {
        this.company = new Company();
        return this;
    }

    public static setId(id: number) {
        this.company.id = id;
        return this;
    }

    public static setName(name: string) {
        this.company.name = name;
        return this;
    }

    public static build() {
        return this.company;
    }

    private static company: Company;
}
