import * as localforage from 'localforage';

describe('Login Page', () => {
  beforeEach(async () => {
    await localforage.clear();

    cy.visit('/login');
  });

  it('navigates to the page', () => {
    cy.get('[data-cy="header"]').should('have.text', 'Sign in to your account');
  });

  it('populates login form correctly', () => {
    cy.get('[data-cy="email"]').type('test@user.com').should('have.value', 'test@user.com');
    cy.get('[data-cy="password"]').type('testpassword').should('have.value', 'testpassword');
  });

  it('shows validation errors', () => {
    cy.get('[data-cy="login-form"]').submit();
    cy.get('[data-cy="email-error"]').should('contain.text', 'Email is required');
    cy.get('[data-cy="password-error"]').should('contain.text', 'Password is required');
  });

  it('submits form', () => {
    cy.get('[data-cy="login-form"]')
      .as('loginForm')
      .within(() => {
        cy.get('[data-cy="email"]').type('test@user.com').should('have.value', 'test@user.com');
        cy.get('[data-cy="password"]').type('testpassword').should('have.value', 'testpassword');
        cy.get('@loginForm').submit();
      });
    cy.url().should('equal', 'http://localhost:5173/');
  });
});
