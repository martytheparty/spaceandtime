describe('Aspect Ratio Specs', () => {
  it('checks the aspect ration of a single visualization', () => {
      cy.visit('/');

      cy.get('app-menu').click();

      cy.get('[data-cy="add-button"]')
      .should('be.visible')
      .click();

      cy.focused().type('{esc}');

      // open layout menu
      cy.get('[data-cy="toggle-layout-button"]')
      .should('be.visible')
      .click()

      // click the update button
      cy.get('[data-cy="update-viz-button"]')
      .should('be.visible')
      .click()

      

      cy.get('app-viz')

      cy.get('app-viz').then($el => {
        const rect = $el[0].getBoundingClientRect();

        cy.get('[data-cy="three-aspect-ratio"]')
        .contains(rect.width/rect.height)

      });


  })
})