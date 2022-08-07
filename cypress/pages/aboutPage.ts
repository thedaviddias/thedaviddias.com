import enTranslation from '../../locales/en/common.json'

export const tp = enTranslation.about

export default new (class AboutPage {
  visitAboutPage() {
    cy.visit(tp.path)
    return cy.injectAxe()
  }
})()
