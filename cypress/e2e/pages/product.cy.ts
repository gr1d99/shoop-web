describe('Product Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  context('Desktop', () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.dataCy('category-nav').click().dataCy('nav-items').children().first().click();
    });

    context('Add to Cart', () => {
      it('increments cart items number', () => {
        cy.dataCy('navigation-menu').dataCy('cart-items-count').should('have.text', 0);
      });
    });
  });
});
