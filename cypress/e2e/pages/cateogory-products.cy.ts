describe('Category Products Page', () => {
  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.visit('/');
    cy.dataCy('category-nav').click().dataCy('nav-items').children().first().as('category').click();
  });
  it('renders products', () => {
    cy.url().should('contain', 'category');
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
