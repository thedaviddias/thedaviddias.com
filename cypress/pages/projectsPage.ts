import enTranslation from '../../locales/en/common.json'

export const tp = enTranslation.projects

export default new (class ProjectsPage {
  visitProjectsPage() {
    cy.visit(tp.path)
    return cy.injectAxe()
  }
})()
