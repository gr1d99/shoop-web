describe('Login Page', () => {
  it('navigates to the page', () => {
    console.log({ c: Cypress.config() });
    cy.visit('/login');
    cy.get('[data-cy="header"]').should('have.text', 'Sign in to your account');
  });

  it('populates login form correctly', () => {
    cy.visit('/login');
    cy.get('[data-cy="login-form"]').within(() => {
      cy.get('[data-cy="email"]').type('gideon@test.com').should('have.value', 'gideon@test.com');
      cy.get('[data-cy="password"]').type('password').should('have.value', 'password');
    });
  });

  it('shows validation errors', () => {
    cy.visit('/login');
    cy.get('[data-cy="login-form"]').as('loginForm');
    cy.get('@loginForm').within(() => {
      cy.get('@loginForm').submit();
      cy.get('[data-cy="email-error"]').should('contain.text', 'Email is required');
      cy.get('[data-cy="password-error"]').should('contain.text', 'Password is required');
    });
  });

  it('submits form', () => {
    cy.visit('/login');
    cy.get('[data-cy="login-form"]').as('loginForm');
    cy.get('@loginForm').within(() => {
      cy.get('[data-cy="email"]').type('gideon@test.com').should('have.value', 'gideon@test.com');
      cy.get('[data-cy="password"]').type('password').should('have.value', 'password');
      cy.get('@loginForm').submit();
    });

    cy.url().should('equal', 'http://localhost:5173/');
  });
});
