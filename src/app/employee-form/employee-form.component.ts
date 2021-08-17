import { Component, OnInit } from '@angular/core';
import { Employee } from '../../app/models/employee';
import { EmployeeService } from '../../app/services/employee.service';

import {
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
  employeeForm: FormGroup;
  action: string;
  subscription: Subscription;

  constructor(
    private modalRef: MdbModalRef<EmployeeFormComponent>,
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.createFormGroup();

    // if the action is viee or update the employee details then set the form values
    if (this.action === 'view' || this.action === 'edit') {
      this.setFormValues();
    }
  }

  // Getters to access from template

  get form() {
    return this.employeeForm.controls;
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      first_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      last_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  setFormValues(): void {
    this.employeeForm.patchValue({
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

  createEmployee(): void {
    // To create new employee
    this.employeeService
      .create(this.employeeForm.value)
      .subscribe({
        next: () => {
          // We can implement toast & loader here
          // this.alertService.success('User added');
          this.closeModal();
        },
        error: (error) => {
          // We can implement toast & loader here
          // this.alertService.error(error);
          // this.loading = false;
          this.closeModal();
        },
      });
  }

  submitForm(): void {
    // Submit form based on the action create/update
    if (this.action === 'new') {
      this.createEmployee();
    } else if (this.action === 'edit') {
      this.updateEmployee(this.employee.id);
    }
  }

  updateEmployee(id: string): void {
    // To update the employee record
    this.employeeService
      .update(id, this.employeeForm.value)
      .subscribe({
        next: () => {
          this.closeModal();
          // We can implement toast & loader here
          // this.alertService.success('User Updartes');
          // this.loading = false;
        },
        error: (error) => {
          // We can implement toast & loader here
          // this.alertService.error(error);
          // this.loading = false;
          this.closeModal();
        },
      });
  }

  closeModal(): void {
    this.modalRef.close();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
