import HomePage, { tp } from '../pages/homePage'
import enTranslation from '../../locales/en/common.json'

describe('Homepage', () => {
  before(() => {
    HomePage.visitHomePage()
  })

  it('has no detectable a11y violations on load', () => {
    cy.checkA11y(undefined, {}, undefined, true)
  })

  it('should render the homepage with a H1', () => {
    cy.findByRole('main').within(() => {
      cy.findByRole('heading', {
        name: `${tp.hero.greetings1}${tp.hero.greetings2}`,
        level: 1,
      }).should('be.visible')
    })
  })

  it('should render the homepage sections', () => {
    cy.findByRole('main').within(() => {
      cy.findByRole('heading', {
        name: `${enTranslation.notes.sections['latest-notes']}`,
        level: 2,
      }).should('be.visible')

      cy.findByRole('heading', {
        name: `${enTranslation.articles.sections['latest-posts']}`,
        level: 2,
      }).should('be.visible')

      cy.findByRole('heading', {
        name: `${enTranslation.projects.sections['latest-projects']}`,
        level: 2,
      }).should('be.visible')
    })
  })
})
