class LoginPage {

  visit() {
    cy.visit("/web/index.php/auth/login");
  }

  usernameInput() {
    return cy.get("input[name='username']");
  }

  passwordInput() {
    return cy.get("input[name='password']");
  }

  loginButton() {
    return cy.get("button[type='submit']");
  }

  errorMessage() {
    return cy.contains("Invalid credentials");
  }

  requiredMessage() {
    return cy.contains("Required");
  }

  forgotPasswordLink() {
    return cy.contains("Forgot your password?");
  }

  login(username, password) {
    if (username) this.usernameInput().type(username);
    if (password) this.passwordInput().type(password);
    this.loginButton().click();
  }
}

export default LoginPage;