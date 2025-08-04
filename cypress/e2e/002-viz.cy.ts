describe('viz component', () => {
  it('passes', () => {

    // where we go
    cy.visit('/');

    // get a reference to the menu icon and click on it
    cy.get('app-menu').click();

    // Step 2: Wait for the mat-menu-item to appear in the overlay and click it
    cy.get('[data-cy="add-button"]')
    .should('be.visible')
    .click();

    // variables 
    const viz = cy.get('app-viz');
    const canvas = viz.get('canvas');

    // assertions
    viz.should('exist');
    canvas.should('exist');
  })
})