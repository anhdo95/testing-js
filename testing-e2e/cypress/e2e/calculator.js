/// <reference types="Cypress" />

describe('Anonymous calculator', () => {
  it('can make calculations', () => {
    cy.visit('/')
    cy.findByText('1').click()
    cy.findByText('+').click()
    cy.findByText('2').click()
    cy.findByText('=').click()
    cy.findByTestId('total').should('have.text', '3')
  })
})

describe('Authenticated calculator', () => {
  it('displays the username', () => {
    cy.loginAsNewUser().then(user => {
      cy.visit('/')
      cy.findByTestId('username-display').should('have.text', user.username)
      cy.findByText(/logout/i).click()
      cy.findByTestId('username-display').should('not.exist')
    })
  })
})
