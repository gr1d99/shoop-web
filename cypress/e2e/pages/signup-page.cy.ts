describe('User Signup', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('shows user signup page', () => {
    cy.dataCy('header').should('have.text', 'Create account');
  });

  it('shows validation errors', () => {
    cy.dataCy('signup-form').as('form');

    cy.get('@form').dataCy('submit').click();

    cy.get('@form').dataCy('first-name-error').should('have.text', 'First name is required');
    cy.get('@form').dataCy('last-name-error').should('have.text', 'Last name is required');
    cy.get('@form').dataCy('email-error').should('have.text', 'Email is required');
    cy.get('@form').dataCy('phone-error').should('have.text', 'Phone is required');
    cy.get('@form').dataCy('password-error').should('have.text', 'Password is required');
    cy.get('@form').dataCy('password').type('12345');
    cy.get('@form').dataCy('confirm-password').type('1234');
    cy.get('@form')
      .dataCy('submit')
      .click()
      .dataCy('confirm-password-error')
      .should('have.text', 'Passwords must match');
  });

  it('creates user', () => {
    cy.dataCy('signup-form').as('form');

    cy.get('@form').dataCy('first-name').type('first').should('have.value', 'first');
    cy.dataCy('last-name').type('last').should('have.value', 'last');
    cy.dataCy('email').type('user@email.com').should('have.value', 'user@email.com');
    cy.dataCy('phone').type('0712345678').should('have.value', '0712345678');
    cy.dataCy('password').type('userpassword').should('have.value', 'userpassword');
    cy.dataCy('confirm-password').type('userpassword').should('have.value', 'userpassword');
    cy.dataCy('submit').click();

    cy.dataCy('toast').should('be.visible');
    cy.dataCy('toast-success-message').should('have.text', 'Account successfully created!');
    cy.url().should('include', '/login');
  });
});
