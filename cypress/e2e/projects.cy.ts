import ProjectsPage, { tp } from '../pages/projectsPage'

describe('Projects', () => {
  before(() => {
    ProjectsPage.visitProjectsPage()
  })

  it('has no detectable a11y violations on load', () => {
    cy.checkA11y(undefined, {}, undefined, true)
  })

  it('should render the projects with a H1', () => {
    cy.findByRole('main').within(() => {
      cy.findByRole('heading', {
        name: `${tp.seo.title}`,
        level: 1,
      }).should('be.visible')
    })
  })
})
