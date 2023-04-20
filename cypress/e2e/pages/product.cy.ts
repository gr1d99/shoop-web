import localforage from 'localforage';

describe('Product Page', () => {
  beforeEach(() => {
    cy.viewport(1280, 800);
  });

  context('When unauthenticated', () => {
    it('redirects to login page', () => {
      void localforage.clear();
      cy.visit('/');
      cy.reload();

      cy.dataCy('category-nav').click().dataCy('nav-items').children().first().click();
      cy.dataCy('product-item-0').dataCy('add-to-cart-btn-0-desktop').click();

      cy.url().should('contain', 'login');
    });
  });

  context('Desktop', () => {
    context('Add to Cart', () => {
      it('cart items number', () => {
        void localforage.clear();
        cy.visit('/');
        cy.reload();

        cy.login('test@user.com', 'testpassword');

        cy.dataCy('navigation-menu').dataCy('cart-items-count').should('have.text', 0);
      });

      it('increments item quantity value', () => {
        cy.login('test@user.com', 'testpassword');

        cy.dataCy('category-nav').click().dataCy('nav-items').children().first().click();

        cy.dataCy('product-item-0').dataCy('add-to-cart-btn-0-desktop').click();

        cy.dataCy('navigation-menu').dataCy('cart-items-count').should('have.text', 1);
      });

      it('shows increment quantity button', () => {
        // cy.dataCy('navigation-menu').dataCy('cart-items-count').should('have.text', 1);
      });
      it('shows decrement quantity button', () => {});
      it('decrements item quantity value', () => {});
    });
  });

  context('Mobile', () => {
    beforeEach(() => {
      cy.viewport(480, 1000);
    });

    it('increments cart items number', () => {
      cy.dataCy('cart-items-count').should('have.text', 0);
    });
  });
});
