describe('Navbar navigation', () => {
  it('should navigate to the about page', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-testid="desktop-menu"] [href="/about"]').click()

    cy.url().should('include', Cypress.config().baseUrl + '/about')
  })

  it('should navigate to the note page', () => {
    cy.get('[data-testid="desktop-menu"] > [href="/notes"]').click()

    cy.url().should('include', Cypress.config().baseUrl + '/notes')
  })

  it('should navigate to the articles page', () => {
    cy.get('[data-testid="desktop-menu"] [href="/articles"]').click()

    cy.url().should('include', Cypress.config().baseUrl + '/articles')
  })

  it('should navigate to the bookmarks page', () => {
    cy.get('[data-testid="desktop-menu"] [href="/bookmarks"]').click()

    cy.url().should('include', '/bookmarks')
  })
})
