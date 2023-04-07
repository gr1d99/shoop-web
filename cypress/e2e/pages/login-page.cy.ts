import * as localforage from 'localforage';

describe('Login Page', () => {
  beforeEach(async () => {
    await localforage.clear();
  });

  it('navigates to the page', () => {
    cy.visit('/login');

    cy.get('[data-cy="header"]').should('have.text', 'Sign in to your account');
  });

  it('populates login form correctly', () => {
    cy.visit('/login');

    cy.get('[data-cy="email"]').type('test@user.com').should('have.value', 'test@user.com');
    cy.get('[data-cy="password"]').type('testpassword').should('have.value', 'testpassword');
  });

  it('shows validation errors', () => {
    cy.visit('/login');

    cy.get('[data-cy="login-form"]').submit();
    cy.get('[data-cy="email-error"]').should('contain.text', 'Email is required');
    cy.get('[data-cy="password-error"]').should('contain.text', 'Password is required');
  });

  it('submits form and authenticate user', () => {
    cy.login('test@user.com', 'testpassword');
    cy.url().should('equal', 'http://localhost:5173/');
    cy.get('[data-cy="toast"]').as('toast');
    cy.get('@toast')
      .should('be.visible')
      .get('[data-cy="toast-success-message"]')
      .should('have.text', 'Successfully authenticated!');
  });

  it('submits form and render error message from server', () => {
    cy.login('test@user.com', 'testpasswords');
    cy.url().should('equal', 'http://localhost:5173/login');
    cy.get('[data-cy="toast-error-0"]').should('have.text', 'Incorrect email or password');
    cy.get('[data-cy="toast-error-0"]').should('have.text', 'Incorrect email or password');
  });
});
