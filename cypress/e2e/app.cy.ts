describe('Navbar navigation', () => {
  it('should navigate to the about page', () => {
    cy.visit('http://localhost:3000/')

    cy.get('[data-testid="desktop-menu"] [href="/about"]').click()

    cy.url().should('include', Cypress.config().baseUrl + '/about')

    cy.get('h1').contains('About me')
  })

  it('should navigate to the note page', () => {
    cy.get('[data-testid="desktop-menu"] > [href="/notes"]').click()

    cy.url().should('include', Cypress.config().baseUrl + '/notes')

    cy.get('h1').contains('All my Notes')
  })

  it('should navigate to the articles page', () => {
    cy.get('[data-testid="desktop-menu"] [href="/articles"]').click()

    cy.url().should('include', Cypress.config().baseUrl + '/articles')

    cy.get('h1').contains('All my Articles')
  })

  it('should navigate to the bookmarks page', () => {
    cy.get('[data-testid="desktop-menu"] [href="/bookmarks"]').click()

    cy.url().should('include', '/bookmarks')

    cy.get('h1').contains('Bookmarks')
  })

  // it('should navigate to the home page', () => {
  //   cy.getBySel('thedaviddias-logo').click()

  //   cy.url().should('include', '/')

  //   cy.get('h1').contains("I'm David Dias")
  // })
})
