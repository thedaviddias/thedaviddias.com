import ArticlesPage, { tp } from '../pages/articlesPage'

describe('Articles', () => {
  before(() => {
    ArticlesPage.visitArticlesPage()
  })

  it('has no detectable a11y violations on load', () => {
    cy.checkA11y(undefined, {}, undefined, true)
  })

  it('should render the articles with a H1', () => {
    cy.findByRole('main').within(() => {
      cy.findByRole('heading', {
        name: `${tp.h1}`,
        level: 1,
      }).should('be.visible')
    })
  })
})
