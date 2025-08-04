describe('delete spec', () => {
  it('deletes when reflow is on (default)', () => {
      cy.visit('/');

      cy.get('app-menu').should('exist');      // get a reference to the menu icon and click on it

      cy.get('app-menu').click();

      // check for the checked icon (default)
      cy.get('[data-cy="checked"]')
      .should('exist');

      // click the add-button for three visualizations
      cy.get('[data-cy="add-button"]')
      .should('be.visible')
      .click().click().click();

      // close menu
      cy.get('body').click();

      // open layout menu
      cy.get('[data-cy="toggle-layout-button"]')
      .should('be.visible')
      .click()

      // get list of delete buttons and click the second one
      const expectedDeleteVizCount = 3;

      cy.get('[data-cy="delete-viz-button"]')
      .should('have.length', expectedDeleteVizCount)
      .eq(1)
      .click();

      // open layout menu
      cy.get('[data-cy="toggle-layout-button"]')
      .should('be.visible')
      .click()

      cy.get('app-menu').click();

      // check for the checked icon (default)
      cy.get('[data-cy="checked"]')
      .should('exist');

      // click the add-button for one new visualizations
      cy.get('[data-cy="add-button"]')
      .should('be.visible')
      .click();

      // select all three visualizations

      const expectedVizCount = 3;
      cy.get('[data-cy="visualization"]')
      .should('have.length', expectedVizCount)

      cy.get('app-viz').eq(0).should('have.css', 'left', '0px');
      cy.get('app-viz').eq(1).should('have.css', 'left', '200px');
      cy.get('app-viz').eq(2).should('have.css', 'left', '400px');

  })

  it('deletes when reflow is off', () => {
      cy.visit('/');
      cy.get('app-menu').should('exist').click();;

            // check for the checked icon (default)
      cy.get('[data-cy="checked"]')
      .should('exist');

            // click the reflow-button
      cy.get('[data-cy="reflow-button"]')
      .should('be.visible')
      .click();

      // get a reference to the menu icon and click on it
      cy.get('app-menu').click();

      cy.get('[data-cy="unchecked"]')
      .should('exist');

      // click the add-button for three visualizations
      cy.get('[data-cy="add-button"]')
      .should('be.visible')
      .click().click().click();

            // close menu
      cy.get('body').click();

      // open layout menu
      cy.get('[data-cy="toggle-layout-button"]')
      .should('be.visible')
      .click()

      // get list of delete buttons and click the second one
      const expectedDeleteVizCount = 3;

      cy.get('[data-cy="delete-viz-button"]')
      .should('have.length', expectedDeleteVizCount)
      .eq(1)
      .click();

            // open layout menu
      cy.get('[data-cy="toggle-layout-button"]')
      .should('be.visible')
      .click()

      cy.get('app-menu').click();

      // check for the unchecked icon (default)
      cy.get('[data-cy="unchecked"]')
      .should('exist');

      // click the add-button for one new visualizations
      cy.get('[data-cy="add-button"]')
      .should('be.visible')
      .click();

          // select all three visualizations

      const expectedVizCount = 3;
      cy.get('[data-cy="visualization"]')
      .should('have.length', expectedVizCount)

      cy.get('app-viz').eq(0).should('have.css', 'left', '0px');
      cy.get('app-viz').eq(1).should('have.css', 'left', '400px');
      cy.get('app-viz').eq(2).should('have.css', 'left', '600px');

  })
})