describe('Reflow spec', () => {
  const waitTime = 1000;

  it('checks reflow toggle for the UI ', () => {
      cy.visit('/');

      // get a reference to the menu icon and click on it
      cy.get('app-menu').click();

      // check for the checked icon
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
  })

  it('checks reflow on visualizations for reflow checked ', () => {
      cy.visit('/');

      // get a reference to the menu icon and click on it
      cy.get('app-menu').click();

      // check for the checked icon
     cy.get('[data-cy="checked"]')
     .should('exist');

      // click the add-button for 1st viz
      cy.get('[data-cy="add-button"]')
      .should('be.visible')
      .click();

      // click the add-button for 2nd viz
      cy.get('[data-cy="add-button"]')
      .should('be.visible')
      .click();

      // click the add-button for 3rd viz
      cy.get('[data-cy="add-button"]')
      .should('be.visible')
      .click();

      // click the add-button for 4th viz
      cy.get('[data-cy="add-button"]')
      .should('be.visible')
      .click();


      cy.viewport(512, 800);
      cy.wait(waitTime);

      cy.get('app-viz').should('have.length', 4);

      cy.get('app-viz').eq(3).should('have.css', 'top', '200px');

      cy.viewport(1000, 660);
    cy.wait(waitTime);

  })

  it('checks reflow on visualizations for reflow unchecked ', () => {
      cy.visit('/');

      // get a reference to the menu icon and click on it
      cy.get('app-menu').click();

      // check for the checked icon
     cy.get('[data-cy="checked"]')
     .should('exist');

      // click the reflow-button
      cy.get('[data-cy="reflow-button"]')
      .should('be.visible')
      .click();

      // click the add-button for 1st viz
      cy.get('[data-cy="add-button"]')
      .should('be.visible')
      .click();

      // click the add-button for 2nd viz
      cy.get('[data-cy="add-button"]')
      .should('be.visible')
      .click();

      // click the add-button for 3rd viz
      cy.get('[data-cy="add-button"]')
      .should('be.visible')
      .click();

      // click the add-button for 4th viz
      cy.get('[data-cy="add-button"]')
      .should('be.visible')
      .click();


      cy.viewport(512, 800);
      cy.wait(waitTime);

      cy.get('app-viz').should('have.length', 4);

      cy.get('app-viz').eq(3).should('not.have.css', 'top', '200px');

      cy.viewport(1000, 660);
      cy.wait(waitTime);

  })
})