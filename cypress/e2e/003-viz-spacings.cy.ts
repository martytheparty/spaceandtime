describe('viz spacing spec', () => {
  it('passes', () => {
    const waitTime = 100;

    // where we go
    cy.visit('/');

    // get a reference to the menu icon and click on it
    cy.get('app-menu').click();

    // Step 2: Wait for the mat-menu-item to appear in the overlay and click it
    cy.get('[data-cy="add-button"]')
    .should('be.visible')
    .click();

    cy.wait(waitTime);

    cy.get('[data-cy="add-button"]')
    .should('be.visible')
    .click();

    // variables 
    const viz = cy.get('app-viz');
    const canvas = viz.get('canvas');

    // assertions
    viz.should('exist');
    canvas.should('exist');

    cy.get('app-viz').eq(1).should('have.css', 'left', '200px');

  })
})