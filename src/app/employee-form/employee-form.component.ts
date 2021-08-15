import { Component, OnInit } from '@angular/core';
import { Employee } from '../../app/models/employee';
import { EmployeeService } from '../../app/services/employee.service';
import { first } from 'rxjs/operators';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee;
  customerForm: FormGroup;
  action: string;

  constructor(
    private modalRef: MdbModalRef<EmployeeFormComponent>,
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.customerForm = this.createFormGroup();

    if (this.action === 'view' || this.action === 'edit') {
      this.setFormValues();
    }
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      first_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      last_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  setFormValues() {
    this.customerForm.patchValue({
      first_name: this.employee.first_name,
      last_name: this.employee.last_name,
      email: this.employee.email,
    });

    if (this.action === 'view') {
      this.form.first_name.disable();
      this.form.last_name.disable();
      this.form.email.disable();
    }
  }

  // Getters to access from template

  get form() {
    return this.customerForm.controls;
  }

  createEmployee() {
    console.log(this.customerForm.value);

    this.employeeService
      .create(this.customerForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // this.alertService.success('User added', { keepAfterRouteChange: true });
          this.closeModal();
        },
        error: (error) => {
          // this.alertService.error(error);
          // this.loading = false;
          this.closeModal();
        },
      });
  }

  submitForm() {
    if (this.action === 'new') {
      this.createEmployee();
    } else if (this.action === 'edit') {
      this.updateEmployee(this.employee.id);
    }
  }
  private updateEmployee(id: string) {
    this.employeeService
      .update(id, this.customerForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // this.alertService.success("User updated", {
          //   keepAfterRouteChange: true,
          // });
          // this.router.navigate(["../../"], { relativeTo: this.route });
          this.closeModal();
        },
        error: (error) => {
          // this.alertService.error(error);
          // this.loading = false;
          this.closeModal();
        },
      });
  }

  closeModal() {
    this.modalRef.close();
  }
}
