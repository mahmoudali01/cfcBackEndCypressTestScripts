// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("login", (baseUrl) => {
   
    cy.visit('/auth/login?LOGIN=LOGIN')
    cy.get(':nth-child(1) > .d-flex > .form-control').clear();
    cy.get(':nth-child(1) > .d-flex > .form-control').type(Cypress.env('credentials').email)
    cy.get(':nth-child(2) > .d-flex > .form-control').clear();
    cy.get(':nth-child(2) > .d-flex > .form-control').type(Cypress.env('credentials').password)
    cy.get(':nth-child(2) > .row > .text-center > .btn').click()
        
})
Cypress.Commands.add("openManageProject", () => {
    cy.get('.sidebar-toggle').click()
    cy.get('a.ng-tns-c111-0 > .menu-title').click()
    cy.get('.menu-item.ng-tns-c111-2').click()
    cy.get('.sidebar-toggle').click()
})
Cypress.Commands.add("openManageBuildings", () => {
    cy.get('.sidebar-toggle').click()
    cy.get('a.ng-tns-c111-0 > .menu-title').click()
    cy.get('.menu-item.ng-tns-c111-3').click()
    cy.get('.sidebar-toggle').click()
})
Cypress.Commands.add("openManageUnits", () => {
    cy.get('.sidebar-toggle').click()
    cy.get('a.ng-tns-c111-0 > .menu-title').click()
    cy.get('.menu-item.ng-tns-c111-4').click()
    cy.get('.sidebar-toggle').click()
})
Cypress.Commands.add("openManageDepartments", () => {
    cy.get('.sidebar-toggle').click()
    cy.get('a.ng-tns-c111-0 > .menu-title').click()
    cy.get('.menu-item.ng-tns-c111-6').click()
    cy.get('.sidebar-toggle').click()
})
Cypress.Commands.add("Search", () => {
    cy.get('.btn-secondary').click()
})
Cypress.Commands.add("Clear", () => {
    cy.get('.btn-light').click()
})

Cypress.Commands.add("Add", () => {
    cy.get('.btn-dark').click()
    cy.wait(500)
})
Cypress.Commands.add("Edit", () => {
    cy.get('.btn-info').click()
    cy.wait(500)
})

Cypress.Commands.add("Delete", () => {
    cy.get('.btn-danger').click()
    cy.wait(500)
})
Cypress.Commands.add("SubmitDialog", () => {
    cy.get('button[type=submit]').click()
})
Cypress.Commands.add("Abort", () => {
    cy.get('button[class="btn btn-light"]').click()
})
Cypress.Commands.add("Toast", () => {
    cy.get('.message')
})
Cypress.Commands.add("Dialog", () => {
    cy.get('mat-dialog-container[role="dialog"]')
})
Cypress.Commands.add("SubmitBTN", () => {
    cy.get('button[type=submit]')
})
Cypress.Commands.add("AbortBTN", () => {
    cy.get('button[class="btn btn-light"]')
})
Cypress.Commands.add("ConfirmDelete", () => {
    cy.get('button[class="btn btn-danger mx-2"]').click()
})