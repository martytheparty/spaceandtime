describe('viz component', () => {
  it('passes', () => {

    // where we go
    cy.visit('/');

    // variables 
    const viz = cy.get('app-viz');
    const canvas = viz.get('canvas');

    // assertions
    viz.should('exist');
    canvas.should('exist');
  })
})