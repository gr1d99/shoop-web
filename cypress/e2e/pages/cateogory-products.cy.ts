describe('Category Products Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('Desktop', () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.dataCy('category-nav')
        .click()
        .dataCy('nav-items')
        .children()
        .first()
        .as('category')
        .click();
    });

    it('renders products', () => {
      cy.url().should('contain', 'category');
      cy.dataCy('product-item').children().should('have.length.gt', 1);
    });

    it('redirects to product page on image click', () => {
      cy.dataCy('product-item')
        .first()
        .within(() => {
          cy.dataCy('product-image').first().click();
        });
      cy.url().should('contain', 'product');
    });

    it('redirects to product page on name click', () => {
      cy.dataCy('product-item')
        .first()
        .within(() => {
          cy.dataCy('product-name').first().click();
        });
      cy.url().should('contain', 'product');
    });
  });

  context('Mobile', () => {
    beforeEach(() => {
      cy.viewport(480, 960);
      cy.dataCy('navigation-menu')
        .click()
        .dataCy('mobile-nav')
        .as('mobile-nav')
        .within(() => {
          cy.get('@mobile-nav')
            .dataCy('category-nav')
            .click()
            .dataCy('nav-items')
            .children()
            .first()
            .click();
        });
    });

    it('renders products', () => {
      cy.url().should('contain', 'category');
      cy.dataCy('product-item').children().should('have.length.gt', 1);
    });
  });
});
