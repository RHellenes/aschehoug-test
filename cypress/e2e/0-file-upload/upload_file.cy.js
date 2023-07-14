/// <reference types="cypress" />

// Welcome to Cypress!
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('File upload tests', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:5173')
  })
  
  // handle login when you have internet
  it('Log in', () => {
    cy.get('.login').should('have.text', 'Log in')
  })

  it('Upload file with click and reset', () => {
    cy.get('#file__input').selectFile('testFiles/screen-recording-test-of-Netlix.mp4', {force:true})
    cy.get('.file__preview-area').children('video')
    cy.wait(1000)
    cy.get('.file__reset').click()
  })

  it('Upload file with drag-and-drop', () => {
    cy.get('.drag-and-drop').selectFile('testFiles/screen-recording-test-of-Netlix.mp4', {force:true, action: 'drag-drop'})
    cy.get('.file__preview-area').children('video')
    cy.wait(1000)
    cy.get('.file__reset').click()
  })

  // it('Logout', () => {
  //   cy.get('.logout').should('have.text', 'Logout')
  // })


})