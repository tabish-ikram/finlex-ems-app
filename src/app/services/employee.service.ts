import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Employee } from '../../app/models/employee';

const baseUrl = `${environment.apiBaseUrl}/users`;

@Injectable({ providedIn: 'root' })
export class EmployeeService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Employee[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<Employee>(`${baseUrl}/${id}`);
    }

    create(params) {
        return this.http.post(baseUrl, params);
    }

    update(id: string, params) {
        return this.http.put(`${baseUrl}/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}