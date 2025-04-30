describe('template spec', () => {
  it('passes', () => {
    const waitTime = 3000;
    cy.visit('/');
    cy.viewport(1024, 800);
    cy.get('canvas').should('exist');
    cy.get('app-viz').should('have.length', 16);
    cy.wait(waitTime);
    cy.viewport(512, 800);
    cy.wait(waitTime);
    cy.viewport(718, 800);
    cy.wait(waitTime);
    cy.viewport(830, 800);
    cy.get('app-viz').eq(4).should('have.css', 'top', '200px');
  })
})