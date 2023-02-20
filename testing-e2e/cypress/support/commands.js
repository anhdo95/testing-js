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
import {buildUser} from '../support/generate'

Cypress.Commands.add('createUser', overrides => {
  const user = buildUser(overrides)
  cy.request('POST', 'http://localhost:3000/register', user).then(res => {
    return {...res.body.user, ...user}
  })
})

Cypress.Commands.add('login', user => {
  cy.request('POST', 'http://localhost:3000/login', user).then(res => {
    window.localStorage.setItem('token', res.body.user.token)
    return {...res.body.user, ...user}
  })
})

Cypress.Commands.add('loginAsNewUser', () => {
  cy.createUser().then(user => cy.login(user))
})

Cypress.Commands.add('assertHome', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/`)
})

Cypress.Commands.add('assertLoggedInAs', user => {
  cy.window()
    .its('localStorage.token')
    .should('have.a', 'string')
  cy.findByTestId('username-display').should('have.text', user.username)
})
