import enTranslation from '../../locales/en/common.json'

export const tp = enTranslation.articles

export default new (class ArticlesPage {
  visitArticlesPage() {
    cy.visit(tp.path)
    return cy.injectAxe()
  }
})()
