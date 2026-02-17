describe("Login Test Cases", () => {
  beforeEach(() => {
    cy.visit("/web/index.php/auth/login");
  });

  it("TC-LOGIN-00 Halaman login berhasil dimuat", () => {
    cy.url().should("include", "/login");
    cy.get("input[name='username']").should("be.visible");
    cy.get("input[name='password']").should("be.visible");
  });

  it("TC-LOGIN-01 Login dengan username dan password valid", () => {
    cy.get("input[name='username']").type("Admin");
    cy.get("input[name='password']").type("admin123");
    cy.get("button[type='submit']").click();
    cy.url().should("include", "/dashboard");
  });

  it("TC-LOGIN-02 Username valid & password salah", () => {
    cy.get("input[name='username']").type("Admin");
    cy.get("input[name='password']").type("wrongpass");
    cy.get("button[type='submit']").click();
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC-LOGIN-03 Username salah & password valid", () => {
    cy.get("input[name='username']").type("WrongUser");
    cy.get("input[name='password']").type("admin123");
    cy.get("button[type='submit']").click();
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC-LOGIN-04 Username & password salah", () => {
    cy.get("input[name='username']").type("wrong");
    cy.get("input[name='password']").type("wrong");
    cy.get("button[type='submit']").click();
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC-LOGIN-05 Username kosong & password diisi", () => {
    cy.get("input[name='password']").type("admin123");
    cy.get("button[type='submit']").click();
    cy.contains("Required").should("be.visible");
  });

  it("TC-LOGIN-06 Username diisi & password kosong", () => {
    cy.get("input[name='username']").type("Admin");
    cy.get("button[type='submit']").click();
    cy.contains("Required").should("be.visible");
  });

  it("TC-LOGIN-07 Username & password kosong", () => {
    cy.get("button[type='submit']").click();
    cy.contains("Required").should("be.visible");
  });

  it("TC-LOGIN-08 Link forgot password tersedia", () => {
    cy.contains("Forgot your password?").should("be.visible");
  });
});
