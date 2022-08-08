import enTranslation from '../../locales/en/common.json'

export const tp = enTranslation.home

export default new (class HomePage {
  visitHomePage() {
    cy.visit(tp.path)
    return cy.injectAxe()
  }
})()
