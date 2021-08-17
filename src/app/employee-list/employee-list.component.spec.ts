import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EmployeeListComponent } from './employee-list.component';
import { By } from '@angular/platform-browser';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { expect } from '@jest/globals';
import { EmployeeMock } from '../../mocks/employee.mock';
import { EmployeeService } from 'src/app/services/employee.service';


describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeListComponent],
      imports: [HttpClientTestingModule, MdbModalModule],
      providers: [
        { provide: EmployeeService, useClass: EmployeeMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have two employees`, (() => {
    expect(component.employees.length).toEqual(2);
  }));

  it(`should have button for adding new employee`, (() => {
    const buttonText = 'New employee'
    const button = fixture.debugElement.query(By.css('#create-employee-btn'));
    expect(button.nativeElement.textContent.trim()).toEqual(buttonText)
  }));

  it(`should open employee details in modal`, (() => {
    const buttonText = 'View'
    const button = fixture.debugElement.query(By.css('.btn-view-employee'));
    expect(button.nativeElement.textContent.trim()).toEqual(buttonText)
    button.triggerEventHandler('click', null)
    fixture.detectChanges()
    expect(component.modalRef).not.toBe(undefined)
    component.modalRef.close();
  }));

});