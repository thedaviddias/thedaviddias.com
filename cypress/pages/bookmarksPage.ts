import enTranslation from '../../locales/en/common.json'

export const tp = enTranslation.bookmarks

export default new (class BookmarksPage {
  visitBookmarksPage() {
    cy.visit(tp.path)
    return cy.injectAxe()
  }
})()
