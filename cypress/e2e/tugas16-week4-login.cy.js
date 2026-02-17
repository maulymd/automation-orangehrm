describe("Login Test Cases with Intercept", () => {
  beforeEach(() => {
    cy.visit("/web/index.php/auth/login");
  });

  it("TC-LOGIN-01 Halaman login berhasil dimuat", () => {
    cy.intercept("GET", "**/auth/login").as("getLoginPage");

    cy.visit("/web/index.php/auth/login");
    cy.wait("@getLoginPage").its("response.statusCode").should("eq", 200);

    cy.get("input[name='username']").should("be.visible");
    cy.get("input[name='password']").should("be.visible");
  });


  it("TC-LOGIN-02 Login valid", () => {
    cy.intercept("POST", "**/auth/validate").as("loginRequest");

    cy.get("input[name='username']").type("Admin");
    cy.get("input[name='password']").type("admin123");
    cy.get("button[type='submit']").click();

    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.statusCode).to.eq(302);
    });

    cy.url().should("include", "/dashboard");
  });


  it("TC-LOGIN-03 Password salah", () => {
    cy.intercept("POST", "**/auth/validate").as("loginFail");

    cy.get("input[name='username']").type("Admin");
    cy.get("input[name='password']").type("wrongpass");
    cy.get("button[type='submit']").click();

    cy.wait("@loginFail").its("response.statusCode").should("eq", 302);

    cy.contains("Invalid credentials").should("be.visible");
  });


  it("TC-LOGIN-04 Username kosong", () => {
    cy.intercept("POST", "**/auth/validate").as("loginEmptyUser");

    cy.get("input[name='password']").type("admin123");
    cy.get("button[type='submit']").click();

    cy.get(".oxd-input-field-error-message")
      .should("contain", "Required");
  });


  it("TC-LOGIN-05 Password kosong", () => {
    cy.intercept("POST", "**/auth/validate").as("loginEmptyPass");

    cy.get("input[name='username']").type("Admin");
    cy.get("button[type='submit']").click();

    cy.get(".oxd-input-field-error-message")
      .should("contain", "Required");
  });


  it("TC-LOGIN-06 Invalid credentials keduanya salah", () => {
    cy.intercept("POST", "**/auth/validate").as("invalidBoth");

    cy.get("input[name='username']").type("wrong");
    cy.get("input[name='password']").type("wrong");
    cy.get("button[type='submit']").click();

    cy.wait("@invalidBoth").its("response.body").should("exist");

    cy.contains("Invalid credentials").should("be.visible");
  });


  it("TC-LOGIN-07 Link forgot password tersedia", () => {
    cy.intercept("GET", "**/auth/requestPasswordResetCode").as("forgotPage");

    cy.contains("Forgot your password?").click();

    cy.wait("@forgotPage").its("response.statusCode").should("eq", 200);

    cy.url().should("include", "requestPasswordResetCode");
  });

});