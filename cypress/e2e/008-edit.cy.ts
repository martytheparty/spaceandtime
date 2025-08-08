describe('template spec', () => {
  it('passes', () => {
    cy.visit('/');

    cy.get('app-menu').should('exist');      // get a reference to the menu icon and click on it

    cy.get('app-menu').click();

          // click the add-button for three visualizations
    cy.get('[data-cy="add-button"]')
    .should('be.visible')
    .click();

    // close menu
    cy.get('body').click();

    // open layout menu
    cy.get('[data-cy="toggle-layout-button"]')
    .should('be.visible')
    .click()

    // get list of delete buttons and click the second one
    const expectedUpdateVizCount = 1;

    cy.get('[data-cy="update-viz-button"]')
    .should('have.length', expectedUpdateVizCount)
    .eq(0)
    .click();

    cy.location('pathname').should('contain', '/update');


  })
})