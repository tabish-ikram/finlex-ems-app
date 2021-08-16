import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../app/models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeMock {

  getAll(): Observable<Employee[]> {
    const employees = [
        {
            first_name: 'John',
            lasst_name: 'Smith',
            email: 'johnsmith@amail.com'
        },
        {
            first_name: 'Harshel',
            last_name: 'Gibbs',
            email: 'gibbs@amail.com'
        }
    ]
    return of(employees)
  }
}