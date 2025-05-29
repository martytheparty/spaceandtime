describe('Home Page', () => {
    it('should load the home page and have app menu icon', () => {
      cy.visit('/');
      cy.get('app-menu').should('exist');


    });
  
    it('should load the home page and have app menu layout icon - apps', () => {
      cy.visit('/');
      cy.get('app-layout-menu').should('exist');
      cy.get('app-layout-menu').get('mat-icon').contains('apps').should('exist');
    });

    it('should load the home page, app menu layout icon, click, & table_rows  ', () => {
      cy.visit('/');
      cy.get('app-layout-menu').should('exist');
      cy.get('app-layout-menu').click();
      cy.get('app-layout-menu').get('mat-icon').contains('table_rows').should('exist');
    });

  });