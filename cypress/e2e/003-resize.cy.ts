describe('template spec', () => {
  it('passes', () => {
    const waitTime = 2000;
    const vizCount = 16;
    cy.visit('/');


    // get a reference to the menu icon and click on it
    cy.get('app-menu').click();

    // Step 2: Wait for the mat-menu-item to appear in the overlay and click it
    // vizCount times.

    for (let i = 0; i < vizCount; i++) {
      cy.get('button[mat-menu-item]')
      .should('be.visible')
      .click();
    }

    // get a reference to the body and click on it to close the menu.
    cy.get('body').click();
    // get a reference to the body and click on it to deslect the menu.
    cy.get('body').click();

    cy.viewport(1024, 800);
    cy.get('canvas').should('exist');
    cy.get('app-viz').should('have.length', vizCount);
    cy.wait(waitTime);
    cy.viewport(512, 800);
    cy.wait(waitTime);
    cy.viewport(718, 800);
    cy.wait(waitTime);
    cy.viewport(830, 800);
    cy.get('app-viz').eq(4).should('have.css', 'top', '200px');
  })
})