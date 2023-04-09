import localforage from 'localforage';

describe('Logout', () => {
  beforeEach(() => {
    cy.visit('/');
    void localforage.clear();
  });

  context('Desktop', () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
    });

    it('redirects user to login page', () => {
      cy.login('test@user.com', 'testpassword');
      cy.dataCy('user-profile-dropdown-desktop').click().dataCy('logout-btn').click();
      cy.url().should('equal', 'http://localhost:5173/login');
    });
  });

  context('Mobile', () => {
    beforeEach(() => {
      cy.viewport(480, 800);
    });

    it('redirects user to login page', () => {
      cy.login('test@user.com', 'testpassword');
      cy.dataCy('navigation-menu')
        .click()
        .dataCy('user-profile-dropdown-mobile')
        .click()
        .dataCy('logout-btn')
        .click();
      cy.url().should('equal', 'http://localhost:5173/login');
    });
  });
});
