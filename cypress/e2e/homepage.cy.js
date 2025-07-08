describe('Homepage', () => {
  it('should load the homepage and show title', () => {
    cy.visit('/');

    // Check page title
    cy.title().should('include', 'Hearty Confessions');

    // Check heading or any visible element
    cy.contains('Explore Stories').should('be.visible');

    cy.contains('Explore Stories').click(); // clicks link or button with "Explore" text

    // Wait for navigation to complete
    cy.url().should('include', '/explore');

    // Then assert something on that page
    cy.contains('Scroll down to explore some interesting stories!').should('be.visible');
  });
});
