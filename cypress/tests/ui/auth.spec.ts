import * as Chance from "chance";
const chance = new Chance();

describe("User Sign-up and Login", () => {
  it("redirects unauthenticated user to login page", () => {
    cy.visit("/");
    cy.location("pathname").should("equal", "/login");
  });

  it("allows user to register, logout and login", () => {
    cy.visit("/register");

    // Register user
    const firstName = chance.first();
    const lastName = chance.last();
    const email = chance.email();
    const password = "password123";

    cy.get("[data-cy=first-name]").type(firstName);
    cy.get("[data-cy=last-name]").type(lastName);
    cy.get("[data-cy=email]").type(email);
    cy.get("[data-cy=password]").type(password);

    cy.get("[data-cy=register-submit]").click();

    // Logout
    cy.location("pathname").should("equal", "/");
    cy.get("[data-cy=logout-button]").click();

    // Login
    cy.location("pathname").should("equal", "/login");
    cy.get("[data-cy=email]").type(email);
    cy.get("[data-cy=password]").type(password);

    cy.get("[data-cy=login-submit]").click();

    // Logout at end of test
    cy.get("[data-cy=logout-button]").click();
  });

  it("displays login errors", () => {
    cy.visit("/login");

    // No email nor password
    cy.get("[data-cy=login-submit]").should("be.disabled");

    // Invalid email
    cy.get("[data-cy=email]").type("invalid email");
    cy.get("[data-cy=login-submit]").should("be.disabled"); // Button should still be disabled since no password has been entered

    cy.get("[data-cy=password]").type("password123");
    cy.get("[data-cy=login-submit]").click();

    cy.get("[data-cy=form-error-txt]")
      .should("be.visible")
      .contains("Invalid email or password");

    // Invalid password
    cy.get("[data-cy=email]").type("timapple@gmail.com");
    cy.get("[data-cy=password]").type("password123456");

    cy.get("[data-cy=login-submit]").click();

    cy.get("[data-cy=form-error-txt]")
      .should("be.visible")
      .contains("Invalid email or password");
  });
});
