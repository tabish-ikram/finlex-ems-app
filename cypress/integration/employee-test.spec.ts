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
    const customer = employee;

      cy.get('#first_name').type(customer.first_name)
      cy.get('#last_name').type(customer.last_name)
      cy.get('#email').type(customer.email)
      cy.get('.btn-save').click()
  });

});
