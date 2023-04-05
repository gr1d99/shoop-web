/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = Element> {
    login(email: string, password: string): Chainable<Subject>;
    dataCy(name: string): Chainable<Subject>;
  }
}
