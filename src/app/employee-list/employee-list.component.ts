import { Component, OnInit, TemplateRef } from '@angular/core';
import { EmployeeService } from '../../app/services/employee.service';
import { first } from 'rxjs/operators';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Employee } from '../../app/models/employee';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ComponentType } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  modalRef: MdbModalRef<EmployeeFormComponent>;
  employees: Employee[] = [];
  selectedId = '';
  subscription: Subscription;
  headElements = ['First Name', 'Last Name', 'Email'];

  constructor(
    private employeeService: EmployeeService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    // call function to get the data of employees
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    // To get the data of all employees
    this.employeeService.getAll().subscribe({
      next: (employees) => {
        this.employees = employees.data
      },
      error: (error) => {
        // Dissplay toast or alert to show error message.
        console.log(error);
      },
    });
  }

  deleteEmployee(): void {
    // To delete the employee record
    this.employeeService.delete(this.selectedId).subscribe({
      next: () => {
        this.employees = this.employees.filter((x) => x.id !== this.selectedId);
        this.closeModal();
      },
      error: (error) => {
        // Dissplay toast or alert to show error message.
        console.log(error);
      },
    });
  }

  viewDetails(employeeData: Employee): void {
    // Open form modal to view the employee details
    this.modalRef = this.modalService.open(EmployeeFormComponent, {
      data: { employee: employeeData, action: 'view' },
    });
  }

  updateEmployee(employeeData: Employee): void {
    // Open form modal to update the employee record
    this.modalRef = this.modalService.open(EmployeeFormComponent, {
      data: { employee: employeeData, action: 'edit' },
    });
  }

  createEmployee(): void {
    // Open form modal to create the new employee
    this.modalRef = this.modalService.open(EmployeeFormComponent, {
      data: { employee: null, action: 'new' },
    });
  }

  openDeleteModal(
    component: ComponentType<EmployeeFormComponent> | TemplateRef<EmployeeFormComponent>,
    employeeData: Employee
  ): void {
    // Open confirmation modal for deleting the employee record
    this.selectedId = employeeData && employeeData.id ? employeeData.id : '';
    this.modalRef = this.modalService.open(component, {
      data: { employee: employeeData },
    });
  }

  closeModal(): void {
    this.modalRef?.close();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
