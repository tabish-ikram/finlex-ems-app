export class Employee {
    id?: string;
    title?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
}

export class Employees {
    page?: number;
    per_page?: number;
    total?: number;
    total_pages?: number;
    data?: Employee[];
    support?:any;

}
