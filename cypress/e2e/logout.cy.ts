import localforage from 'localforage';

describe('Logout', () => {
  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.visit('/');
    void localforage.clear();
    cy.reload();
    cy.login('test@user@@mail.com', 'testpassword');
  });
  it('redirects user to login page', () => {
    cy.dataCy('logout-btn').click();
    cy.url().should('equal', 'http://localhost:5173/');
  });
});
