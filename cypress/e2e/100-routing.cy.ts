describe('check for the menu app on the route route', () => {
    it('should load the home page and have app menu icon', () => {
      cy.visit('/');
      cy.get('[data-cy=apps-icon]').should('exist');
    });

    it('should go to tabular route', () => {
      cy.visit('/');
      cy.get('[data-cy=apps-icon]').click();
      cy.location('pathname').should('eq', '/tabular');
    });

    it('should have custom icon on tabular route', () => {
      cy.visit('/tabular');
      cy.get('[data-cy=table_rows-icon]').should('exist');
    });

    it('should go to custom route', () => {
      cy.visit('/tabular');
      cy.get('[data-cy=table_rows-icon]').click();
      cy.location('pathname').should('eq', '/custom');
    });

    it('should go to update route', () => {
      cy.visit('/update/1');
      cy.get('[data-cy=table_update-icon]').click();
      cy.location('pathname').should('eq', '/custom');
    });

    it('should go to data/entities route and ST should be checked', () => {
      cy.visit('/data/entities');
      cy.get('[data-cy="toggle-layout-button-st"]').should('have.class', 'mat-button-toggle-checked');
      cy.get('[data-cy="toggle-layout-button-three"]').click();
      cy.location('pathname').should('eq', '/data/three');
    });

    it('should go to data/three route and Three should be checked', () => {
      cy.visit('/data/three');
      cy.get('[data-cy="toggle-layout-button-three"]').should('have.class', 'mat-button-toggle-checked');
      cy.get('[data-cy="toggle-layout-button-st"]').click();
      cy.location('pathname').should('eq', '/data/entities');
    });
})