import LoginPage from "../pages/loginPage";

describe("Login Test Cases POM", () => {

  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it("TC-LOGIN-00 Halaman login berhasil dimuat", () => {
    cy.url().should("include", "/login");
    loginPage.usernameInput().should("be.visible");
    loginPage.passwordInput().should("be.visible");
  });

  it("TC-LOGIN-01 Login valid", () => {
    cy.fixture("loginData").then(data => {
      loginPage.login(data.validUser.username, data.validUser.password);
      cy.url().should("include", "/dashboard");
    });
  });

  it("TC-LOGIN-02 Password salah", () => {
    cy.fixture("loginData").then(data => {
      loginPage.login(data.wrongPassword.username, data.wrongPassword.password);
      loginPage.errorMessage().should("be.visible");
    });
  });

  it("TC-LOGIN-03 Username salah", () => {
    cy.fixture("loginData").then(data => {
      loginPage.login(data.invalidUser.username, data.validUser.password);
      loginPage.errorMessage().should("be.visible");
    });
  });

  it("TC-LOGIN-04 Username & Password salah", () => {
    cy.fixture("loginData").then(data => {
      loginPage.login(data.invalidUser.username, data.invalidUser.password);
      loginPage.errorMessage().should("be.visible");
    });
  });

  it("TC-LOGIN-05 Username kosong", () => {
    loginPage.login(null, "admin123");
    loginPage.requiredMessage().should("be.visible");
  });

  it("TC-LOGIN-06 Password kosong", () => {
    loginPage.login("Admin", null);
    loginPage.requiredMessage().should("be.visible");
  });

  it("TC-LOGIN-07 Username & Password kosong", () => {
    loginPage.login(null, null);
    loginPage.requiredMessage().should("be.visible");
  });

  it("TC-LOGIN-08 Forgot password link tersedia", () => {
    loginPage.forgotPasswordLink().should("be.visible");
  });

});