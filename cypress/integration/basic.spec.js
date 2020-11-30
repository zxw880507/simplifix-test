context("Basic", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Navigates to gig", () => {
    cy.get("[alt=Plumbing]").first().click();

    cy.wait(100);

    cy.get("[alt='Fridge repair']").click();

    cy.get(".MuiButton-label").contains("Book").click();
  });

  it("Searches for Plumber", () => {
    cy.get("input")
      .should("have.attr", "placeholder", "Search…")
      .first()
      .click()
      .type("Plumber");

    cy.get("button").first().click();

    cy.get("[alt='Plumber named Mario']").click();

    cy.get(".MuiButton-label").contains("Book").click();

    cy.get("[data-testid=date-picker]").click().type("12/25/2020");

    // cy.get(".MuiButton-label").contains("Confirm").click();
  });

  it("Signs up for account", () => {
    cy.get("button").contains("Join").click();

    // cy.contains("First Name").click();
  });
});
