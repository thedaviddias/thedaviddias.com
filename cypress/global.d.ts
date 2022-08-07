/// <reference types="cypress" />

// This is required to indicate this file is a module and for the global declarations to be available
export {}

declare global {
  declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to make taking Percy snapshots with full name formed from the test title + suffix easier
       */
      visualSnapshot(maybeName?): Chainable<any>

      getBySel(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>
      getBySelLike(dataTestPrefixAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>
    }
  }
}
