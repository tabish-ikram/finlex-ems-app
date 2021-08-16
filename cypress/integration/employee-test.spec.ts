/// <reference types="cypress" />

import { customers } from "./mock-data";

describe("Testing CRM application", () => {
  it("Visits the initial project page", () => {
    cy.visit("/");
  });

  it("Should open new customer modal", () => {
    cy.get("#create-employee-btn").first().click();
    cy.wait(500);
    cy.contains("Employee Details");
    cy.contains("First Name");
  });

  xit("Should close new customer modal", () => {
    cy.get(".btn-close").click();
    cy.wait(500);
    cy.get(".modal", { timeout: 500 }).should("not.exist");
  });

  it('should create a new employee', () => {
    const customer = customers[0]

      cy.get('#first_name').type(customer.first_name)
      cy.get('#last_name').type(customer.last_name)
      cy.get('#email').type(customer.email)
  
      cy.get('.btn-save').click()
  });

});
