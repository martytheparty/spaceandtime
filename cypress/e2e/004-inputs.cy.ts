describe('template spec', () => {
  it('passes', () => {
      const waitTime = 500;
    
      cy.visit('/');

      // test that clicks work
      // get a reference to the menu icon and click on it
      cy.get('app-menu').click();

      // Step 2: Wait for the mat-menu-item to appear in the overlay and click it
      cy.get('button[mat-menu-item]')
      .should('be.visible')
      .click();
      cy.focused().click();

      // make sure that the canvas was rendered after the click
      let viz = cy.get('app-viz');
      let canvas = viz.get('canvas');

      // assertions - expect a viz to have been create via mouseclicks
      viz.should('exist');
      canvas.should('exist');

      cy.wait(waitTime);
      // reload to test tab and enter keyboard

      cy.reload();

      // Wait for the page to be fully loaded
      cy.get('body').should('be.visible');

      // Press Tab (focus must start somewhere)
      cy.get('body').tab(); // requires cypress-plugin-tab
      //cy.focused().should('have.attr', 'mat-menu-trigger');

      // first enter opens the menu
      cy.focused().type('{enter}'); // sends keydown, keypress, and keyup

      // second enter clicks the menu item
      cy.focused().type('{enter}'); // sends keydown, keypress, and keyup

      viz = cy.get('app-viz');
      canvas = viz.get('canvas');

      // assertions - expect a viz to have been create via <tab> -> <enter> -> <enter>
      viz.should('exist');
      canvas.should('exist');

      cy.wait(waitTime);
      cy.reload();

      // Wait for the page to be fully loaded
      cy.get('body').should('be.visible');

      // Press Tab (focus must start somewhere)
      cy.get('body').tab(); // requires cypress-plugin-tab
      //cy.focused().should('have.attr', 'mat-menu-trigger');

      // first enter opens the menu
      cy.focused().type(' '); // sends keydown, keypress, and keyup

      // second enter clicks the menu item
      cy.focused().type(' '); // sends keydown, keypress, and keyup

      cy.focused().type('{enter}'); // sends keydown, keypress, and keyup
      cy.focused().click();

      viz = cy.get('app-viz');
      canvas = viz.get('canvas');

      // assertions - expect a viz to have been create via <tab> -> <enter> -> <enter>
      viz.should('exist');
      canvas.should('exist');

  })
})