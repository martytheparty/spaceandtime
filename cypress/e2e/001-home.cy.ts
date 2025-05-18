describe('Home Page', () => {
    it('should load the home page', () => {
      cy.visit('/');
      cy.get('app-menu').should('exist');
    });
  });