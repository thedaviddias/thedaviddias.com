import BookmarksPage, { tp } from '../pages/bookmarksPage'

describe('Projects', () => {
  before(() => {
    BookmarksPage.visitBookmarksPage()
  })

  it('has no detectable a11y violations on load', () => {
    cy.checkA11y(undefined, {}, undefined, true)
  })

  it('should render the bookmarks with a H1', () => {
    cy.findByRole('main').within(() => {
      cy.findByRole('heading', {
        name: `${tp.seo.title}`,
        level: 1,
      }).should('be.visible')
    })
  })
})
