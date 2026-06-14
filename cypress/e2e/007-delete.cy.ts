describe('delete group of specs', () => {
  it('deletes when reflow is on (default) spec', () => {
      cy.visit('/');

      cy.get('app-menu').should('exist');      // get a reference to the menu icon and click on it

      // open menu
      cy.get('app-menu').click();

      // check for the checked icon (default)
      cy.get('[data-cy="checked"]')
      .should('exist');

      // click the add-button for three visualizations
      cy.get('[data-cy="add-button"]')
      .should('be.visible')
      .click().click().click();

      // close menu
      cy.get('app-menu').click();

      // sets route the tabular
      cy.get('[data-cy="toggle-layout-button"]')
      .should('be.visible')
      .click()

      // get list of delete buttons and click the second one
      const expectedDeleteVizCount = 3;

      cy.get('[data-cy="delete-viz-button"]')
      .should('have.length', expectedDeleteVizCount)
      .eq(1)
      .click();

      // sets route to custom
      cy.get('[data-cy="toggle-layout-button"]')
      .should('be.visible')
      .click()

      // open menu
      cy.get('app-menu').click();

      // check for the checked icon (default)
      cy.get('[data-cy="checked"]')
      .should('exist');

      // click the add-button for one new visualizations
      cy.get('[data-cy="add-button"]')
      .should('be.visible')
      .click();

      // select all three visualizations

      const expectedVizCount = 3;
      cy.get('[data-cy="visualization"]')
      .should('have.length', expectedVizCount)

    //   cy.get('app-viz').eq(0).should('have.css', 'left', '0px');
    //   cy.get('app-viz').eq(1).should('have.css', 'left', '200px');
    //   cy.get('app-viz').eq(2).should('have.css', 'left', '400px');

      cy.get('app-viz').then($els => {
            const lefts = [...$els]
        .map(el => parseInt(getComputedStyle(el).left, 10))
        .sort((a, b) => a - b);

        expect(lefts).to.deep.equal([0, 200, 400]);
        });

  })

  it('deletes when reflow is off spec', () => {
      cy.visit('/');
      cy.get('app-menu').should('exist').click();

      // check for the checked icon (default)
      cy.get('[data-cy="checked"]')
      .should('exist');

      // click the reflow-button
      cy.get('[data-cy="reflow-button"]')
      .should('be.visible')
      .click();

      cy.get('[data-cy="unchecked"]')
      .should('exist');

      // click the add-button for three visualizations
      cy.get('[data-cy="add-button"]')
      .should('be.visible')
      .click().click().click();

      // get a reference to the menu icon and click on it
      cy.get('app-menu').click();

      // changes route to tabular
      cy.get('[data-cy="toggle-layout-button"]')
      .should('be.visible')
      .click()

      // get list of delete buttons and click the second one
      const expectedDeleteVizCount = 3;

      cy.get('[data-cy="delete-viz-button"]')
      .should('have.length', expectedDeleteVizCount)
      .eq(1)
      .click();

      // change route to custom
      cy.get('[data-cy="toggle-layout-button"]')
      .should('be.visible')
      .click()

      cy.get('app-menu').click();

      // check for the unchecked icon (default)
      cy.get('[data-cy="unchecked"]')
      .should('exist');

      // click the add-button for one new visualizations
      cy.get('[data-cy="add-button"]')
      .should('be.visible')
      .click();

          // select all three visualizations

      const expectedVizCount = 3;
      cy.get('[data-cy="visualization"]')
      .should('have.length', expectedVizCount)

    //   cy.get('app-viz').eq(0).should('have.css', 'left', '0px');
    //   cy.get('app-viz').eq(1).should('have.css', 'left', '400px');
    //   cy.get('app-viz').eq(2).should('have.css', 'left', '600px');

      cy.get('app-viz').then($els => {
            const lefts = [...$els]
        .map(el => parseInt(getComputedStyle(el).left, 10))
        .sort((a, b) => a - b);

        expect(lefts).to.deep.equal([0, 400, 600]);
        });

  })

  it('deletes the camera ST Entitiy when the visualization is deleted', () => {
      cy.visit('/data/entities');
      cy.get('app-menu').should('exist').click();

      cy.get('[data-cy="add-button"]')
      .should('be.visible')
      .click();

      cy.get('[data-cy="toggle-layout-button"]').click();

      cy.go('back');

      // check to see that the camera is there
      // expected camera id = 2

      const expectedId = 2;

      cy.get(`[data-cy-entitity-table-st-id="${expectedId}"]`)
      .should('exist')
      .and('be.visible');

      cy.get('[data-cy="toggle-layout-button"]').click();

      cy.get('[data-cy="delete-viz-button"]')
      .should('be.visible')
      .click();

      cy.go('back');

      // check to see that the camera is not there

      cy.get(`[data-cy-entitity-table-st-id="${expectedId}"]`)
      .should('not.exist');
  })

  it('deletes the scene ST Entitiy when the visualization is deleted', () => {
      cy.visit('/data/entities');
      cy.get('app-menu').should('exist').click();

      cy.get('[data-cy="add-button"]')
      .should('be.visible')
      .click();

      cy.get('[data-cy="toggle-layout-button"]').click();

      cy.go('back');

      // check to see that the scene is there
      // expected scene id = 3

      const expectedStSceneId = 3;

      cy.get(`[data-cy-entitity-table-st-id="${expectedStSceneId}"]`)
      .should('exist')
      .and('be.visible');

      cy.get('[data-cy="toggle-layout-button"]').click();

      cy.get('[data-cy="delete-viz-button"]')
      .should('be.visible')
      .click();

      cy.go('back');

      // check to see that the scene is not there

      cy.get(`[data-cy-entitity-table-st-id="${expectedStSceneId}"]`)
      .should('not.exist');
  })

  it('deleted all st entities', () => {
    cy.visit('/data/entities');
    cy.get('app-menu').should('exist').click();

    cy.get('[data-cy="add-button"]')
    .should('be.visible')
    .click();

    cy.get('.entity-id').its('length').should('be.gt', 1);

    cy.get('[data-cy="toggle-layout-button"]').click();

    
    cy.get('[data-cy="delete-viz-button"]')
    .should('be.visible')
    .click();
    
    cy.go('back');

    cy.get('.entity-id')
    .should('have.length', 0);
  });

  it('deleted all three entities', () => {
    cy.visit('/data/three');
    cy.get('app-menu').should('exist').click();

    cy.get('[data-cy-three-table-three-type-count]')
    .should('have.attr', 'data-cy-three-table-three-type-count', '0');

    cy.get('[data-cy="add-button"]')
    .should('be.visible')
    .click();

    cy.get('[data-cy-three-table-three-type-count]')
    .should('have.attr', 'data-cy-three-table-three-type-count', '1');

    cy.get('[data-cy="toggle-layout-button"]').click();

    
    cy.get('[data-cy="delete-viz-button"]')
    .should('be.visible')
    .click();
    
    cy.go('back');

    cy.get('[data-cy-three-table-three-type-count]')
    .should('have.attr', 'data-cy-three-table-three-type-count', '0');


  });


})