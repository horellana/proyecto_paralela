export class Student {
    rut: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthdate: string;

    fullName() {
        return `${this.firstName} ${this.lastName}`;
    };
}
