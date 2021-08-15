import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../app/services/employee.service';
import { first } from 'rxjs/operators';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Employee } from '../../app/models/employee';
import { EmployeeFormComponent } from '../employee-form/employee-form.component'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {

  modalRef: MdbModalRef<EmployeeFormComponent>;
  employees = null;

  constructor(private employeeService: EmployeeService, private modalService: MdbModalService) {}

  headElements = ['First Name', 'Last Name', 'Email'];

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees () {
    this.employeeService
      .getAll()
      .pipe(first())
      // @ts-ignore
      .subscribe((employees) => (this.employees = employees.data));
  }

  deleteEmployee (id: string) {
    this.employeeService.delete(id)
    .pipe(first())
    .subscribe(() => this.employees = this.employees.filter(x => x.id !== id));
  }

  viewDetails (employeeData: Employee) {
    this.modalRef = this.modalService.open(EmployeeFormComponent, { data: { employee: employeeData, action: 'view' } })
  }

  updateEmployee (employeeData: Employee) {
    this.modalRef = this.modalService.open(EmployeeFormComponent, { data: { employee: employeeData, action: 'edit' } })
  }

  createEmployee () {
    this.modalRef = this.modalService.open(EmployeeFormComponent, { data: { employee: null, action: 'new' } })
  }

}
