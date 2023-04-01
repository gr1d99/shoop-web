describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('navigates to the page', () => {
    cy.get('[data-cy="header"]').should('have.text', 'Sign in to your account');
  });

  it('populates login form correctly', () => {
    cy.get('[data-cy="login-form"]').within(() => {
      cy.get('[data-cy="email"]').type('gideon@test.com').should('have.value', 'gideon@test.com');
      cy.get('[data-cy="password"]').type('password').should('have.value', 'password');
    });
  });

  it('submits form', () => {
    cy.get('[data-cy="login-form"]').as('loginForm');
    cy.get('@loginForm').within(() => {
      cy.get('[data-cy="email"]').type('gideon@test.com').should('have.value', 'gideon@test.com');
      cy.get('[data-cy="password"]').type('password').should('have.value', 'password');
      cy.get('@loginForm').submit();
    });

    cy.url().should('equal', 'http://localhost:5174/');
  });
});
