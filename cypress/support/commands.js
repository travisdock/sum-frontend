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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        url: 'https://sumfinance-staging.herokuapp.com/api/v1/login',
        body: JSON.stringify({
            username: "test1",
            password: "test1"
        })
    })
    .its('body')
    .then((resp) => {
        window.localStorage.setItem('jwt', resp['jwt'])
    })
})

Cypress.Commands.add('visit_with_stub', (url, stub) => {
    cy.visit(url, {
        onBeforeLoad(win) {
            cy.stub(win, 'alert', (x) => stub(x))
        }
    })
})
