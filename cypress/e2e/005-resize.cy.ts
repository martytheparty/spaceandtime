describe('resize UI', () => {
  it('tests resize for custom view', () => {
    const waitTime = 2000;
    const vizCount = 16;
    cy.visit('/');


    // get a reference to the menu icon and click on it
    cy.get('app-menu').click();

    // Step 2: Wait for the mat-menu-item to appear in the overlay and click it
    // vizCount times.

    for (let i = 0; i < vizCount; i++) {
      cy.get('[data-cy="add-button"]')
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
    cy.get('[data-cy=apps-icon]').click();
    cy.wait(waitTime);
    cy.get('[data-cy=table_rows-icon]').click();
    cy.get('app-viz').eq(4).should('have.css', 'top', '200px');
  })

  it('tests resize for update view', () => {
    const waitTime = 1000;
    const vizCount = 1;
    cy.visit('/');


    // get a reference to the menu icon and click on it
    cy.get('app-menu').click();

    // Step 2: Wait for the mat-menu-item to appear in the overlay and click it
    // vizCount times.

    for (let i = 0; i < vizCount; i++) {
      cy.get('[data-cy="add-button"]')
      .should('be.visible')
      .click();
    }

    // get a reference to the body and click on it to close the menu.
    cy.get('app-menu').click();
    // get a reference to the body and click on it to deslect the menu.
    cy.get('body').click();

    cy.get('[data-cy=apps-icon]').click();
    cy.wait(waitTime);

    const expectedUpdateVizCount = 1;

    cy.get('[data-cy="update-viz-button"]')
    .should('have.length', expectedUpdateVizCount)
    .eq(0)
    .click();

    cy.location('pathname').should('contain', '/update');

    cy.viewport(1024, 800);
    cy.viewport(512, 800);  
    cy.wait(waitTime);  
    
    cy.get('canvas').should('exist');
    cy.get('[data-cy="visualization"]')
    .should('have.css', 'width', '512px');

    // this is known bug... it's not really perseptable 
    // to the user but it needs to be fixed.
    // Also when it is fixed we need to add a test to
    // 200-ar.cy.ts to ensure that the AR is correct.

  })
})