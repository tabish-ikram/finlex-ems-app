/// <reference types="cypress" />

import { employee } from './mock-data';

describe('Testing EMS application', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
  });

  it('Should open new employee modal', () => {
    cy.get('#create-employee-btn').first().click();
    cy.wait(500);
    cy.contains('Employee Details');
    cy.contains('First Name');
  });

  xit('Should close new employee modal', () => {
    cy.get('.btn-close').click();
    cy.wait(500);
    cy.get('.modal', { timeout: 500 }).should('not.exist');
  });

  it('should create a new employee', () => {
    const employeeData = employee;

      cy.get('#first_name').type(employeeData.first_name)
      cy.get('#last_name').type(employeeData.last_name)
      cy.get('#email').type(employeeData.email)
      cy.get('.btn-save').click()
  });

});
